"use client"

import { useUser } from "@clerk/nextjs";
import { Box, Container, Paper, TextField, Typography, Button, Grid, Card, CardActionArea, CardContent, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, CircularProgress } from "@mui/material";
import { collection, getDoc, writeBatch, doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import db from "@/firebase";

const MAX_FREE_TRIES = 10;

const CreateFlashcard = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [paywallOpen, setPaywallOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchAttempts = async () => {
      const userDocRef = doc(collection(db, 'users'), user.id);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        setAttempts(userData.attempts || 0);
      }
    };

    if (isSignedIn) {
      fetchAttempts();
    }
  }, [isSignedIn, user]);

  const handleSubmit = async () => {
    if (attempts >= MAX_FREE_TRIES) {
      setPaywallOpen(true);
      return;
    }

    setLoading(true);
    fetch('api/generate', {
      method: 'POST',
      body: text,
    })
    .then((res) => res.json())
    .then((data) => {
      setFlashcards(data);
      setAttempts((prev) => prev + 1);
      updateAttemptsInDb();
    })
    .finally(() => setLoading(false));
  };

  const updateAttemptsInDb = async () => {
    const userDocRef = doc(collection(db, 'users'), user.id);
    await setDoc(userDocRef, { attempts }, { merge: true });
  };

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveFlashcards = async () => {
    if (!name) {
      alert("Please enter a name");
      return;
    }

    const batch = writeBatch(db);
    const userDocRef = doc(collection(db, 'users'), user.id);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const collections = docSnap.data().flashcards || [];
      if (collections.find((f) => f.name === name)) {
        alert("Flashcard with this name already exists");
        return;
      } else {
        collections.push({ name });
        batch.set(userDocRef, { flashcards: collections }, { merge: true });
      }
    } else {
      batch.set(userDocRef, { flashcards: [{ name }] });
    }

    const colRef = collection(userDocRef, name);
    flashcards.forEach((flashcard) => {
      const cardDocRef = doc(colRef);
      batch.set(cardDocRef, flashcard);
    });

    await batch.commit();
    handleClose();
    router.push("/flashcards");
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 6, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography variant="h4" sx={{ mb: 2 }}>Generate Flashcards</Typography>
        <Paper sx={{ p: 4, width: '100%' }}>
          <TextField label="Enter text" fullWidth multiline rows={4} variant="outlined" sx={{ mb: 2 }} value={text} onChange={(e) => setText(e.target.value)} />
          <Button sx={{backgroundColor: "#000000", "&:hover": {backgroundColor: '#222222'}}} variant="contained" color="primary" onClick={handleSubmit} fullWidth disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
          </Button>
        </Paper>
      </Box>

      {flashcards.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>Flashcards Preview</Typography>
          <Grid container spacing={3}>
            {flashcards.map((flashcard, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardActionArea onClick={() => handleCardClick(index)}>
                    <CardContent>
                      <Box sx={{
                        perspective: '1000px',
                        '& > div': {
                          transition: 'transform 0.6s',
                          transformStyle: 'preserve-3d',
                          position: 'relative',
                          width: '100%',
                          height: "200px",
                          boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                          transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                        },
                        '& > div > div': {
                          position: "absolute",
                          width: '100%',
                          height: "100%",
                          backfaceVisibility: "hidden",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          boxSizing: "border-box",
                          padding: 2,
                        },
                        '& > div > div:nth-of-type(2)': {
                          transform: 'rotateY(180deg)',
                        }
                      }}>
                        <div>
                          <div>
                            <Typography variant="h5" component="div">
                              {flashcard.front}
                            </Typography>
                          </div>
                          <div>
                            <Typography variant="h5" component="div">
                              {flashcard.back}
                            </Typography>
                          </div>
                        </div>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            <Button variant="contained" color="secondary" onClick={handleOpen}>
              Save
            </Button>
          </Box>
        </Box>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Save Flashcards</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter a name for your collection</DialogContentText>
          <TextField autoFocus margin="dense" label="Collection Name" type="text" fullWidth value={name} onChange={(e) => setName(e.target.value)} variant="outlined" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveFlashcards}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={paywallOpen} onClose={() => setPaywallOpen(false)}>
        <DialogTitle>Upgrade to Pro</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You have reached the limit of 10 free flashcard generations. Please upgrade to the Pro plan to continue creating flashcards.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => router.push("/#pricing")}>Upgrade Now</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CreateFlashcard;