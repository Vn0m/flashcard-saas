import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Container, Toolbar, Typography, Button, Box, Grid } from "@mui/material";
import Head from "next/head";

export default function Home() {
  return (
    <Container maxWidth="full">
      <Head>
        <title>Flashcard SaaS</title>
        <meta name="description" content="Create flashcard from your text"></meta>
      </Head>

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{flexGrow: 1}}>Flashcard SaaS</Typography>  
          <SignedOut>
            <Button color="inherit">Log in</Button>
            <Button color="inherit">Sign up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box sx={{textAlign: 'center', my: '4'}}>
        <Typography variant="h2">Welcome to MindSpark</Typography>
        <Typography variant="h5">The fastest way to make flashcards</Typography>
        <Button variant="contained" color="primary" sx={{mt: 2}}>Get started</Button>
      </Box>
      <Box sx={{my: '6'}}>
        <Typography variant="h4">Features</Typography>
        <Grid item xs={12} md={4}>
          <Typography variant="h6">Easy text input</Typography>
          <Typography>Create in seconds</Typography>
          <Typography>Improve your studying experience</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6">Easy text input</Typography>
          <Typography>Create in seconds</Typography>
          <Typography>Improve your studying experience</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6">Easy text input</Typography>
          <Typography>Create in seconds</Typography>
          <Typography>Improve your studying experience</Typography>
        </Grid>
      </Box>
      <Box sx={{my: '6', textAlign: 'center'}}>
        <Typography variant="h4">Pricing</Typography>
      </Box>
    </Container>
  );
}
