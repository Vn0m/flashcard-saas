"use client"

import Image from "next/image";
import { Card, CardContent, Typography, Button, Box, Grid } from "@mui/material";
import getStripe from "@/utils/get-stripe";

export default function Home() {
  
  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000',
      }
    });
  
    const checkoutSessionJson = await checkoutSession.json();

    if(checkoutSession.status === 500){
      console.error(checkoutSession.message);
      return;
    }

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });

    if(error){
      console.warn(error.message);
    }
  }

  return (
    <div sx={{ backgroundColor: "#F8F5E4", color: "#333333", padding: "0", overflow: "hidden" }}>
      {/* Hero Section */}
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center', 
          justifyContent: 'center',
          padding: { xs: '50px 20px', md: '100px 100px' },
          textAlign: { xs: 'center', md: 'left' } 
        }}
      >
        <Box 
          sx={{ 
            flex: '1', 
            maxWidth: { xs: '100%', md: '50%' }, 
            paddingRight: { md: '20px' }, 
            paddingBottom: { xs: '20px', md: '0' },
            paddingLeft: { xs: '20px', md: '0' },
          }}
        >
          <Typography variant="h2" gutterBottom sx={{ color: "#333333", fontWeight: 'bold', fontSize: { xs: '2rem', md: '3rem' } }}>
            Welcome to MindSpark
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: '40px', color: "#666666", fontSize: { xs: '1rem', md: '1.5rem' } }}>
            The easiest way to create flashcards from your text. Enhance your learning experience effortlessly.
          </Typography>
          <Button 
            href="/sign-up"
            variant="contained" 
            sx={{ 
              borderColor: "transparent",
              backgroundColor: "#ffc65b",
              color: "#ffffff",
              padding: "10px 17px", 
              fontSize: { xs: '14px', md: '15px' },
              '&:hover': {
                backgroundColor: "#facB5b",
                borderColor: "transparent"
              }
            }}
          >
            Get started
          </Button>
        </Box>

        <Box 
          sx={{ 
            flex: '1', 
            maxWidth: { xs: '100%', md: '50%' },
            display: 'flex', 
            justifyContent: 'center' 
          }}
        >
          <Image
            src="/heroImage.svg"
            alt="Illustration of Flashcards"
            width={400}
            height={400}
            sx={{ width: { xs: '300px', md: '500px' }, height: { xs: 'auto', md: '400px' }}}
          />
        </Box>
      </Box>

      {/* Features Section */}
      <Box sx={{ padding: '70px 20px', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom sx={{ color: "#000000", fontWeight: 600 }}>Features</Typography>
        <Grid container spacing={4} sx={{ marginTop: '40px', justifyContent: 'center', paddingX: 10 }}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Image src="/speed.svg" width={200} height={200} alt="Quickly generate flashcards" />
              <Typography variant="h6" sx={{ marginTop: '20px' }}>Speed</Typography>
              <Typography sx={{ marginTop: '10px', color: '#666666' }}>
                Quickly create and review flashcards to maximize your study time.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Image src="/study.svg" width={200} height={200} alt="Study helper" />
              <Typography variant="h6" sx={{ marginTop: '20px' }}>Study Helper</Typography>
              <Typography sx={{ marginTop: '10px', color: '#666666' }}>
                Enhance your learning experience with customizable study aids.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Image src="/ai.svg" width={200} height={200} alt="AI generated flashcards" />
              <Typography variant="h6" sx={{ marginTop: '20px' }}>AI Generated</Typography>
              <Typography sx={{ marginTop: '10px', color: '#666666' }}>
                Generate flashcards with the power of AI to simplify your study process.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Pricing Section */}
      <Box id="pricing" sx={{ paddingX: '20px', paddingTop: '50px', paddingBottom: "80px", textAlign: 'center', backgroundColor: "#FFFFFF" }}>
        <Typography variant="h4" gutterBottom sx={{ color: "#000000", fontWeight: 600 }}>Pricing</Typography>
        <Grid container spacing={4} sx={{ marginTop: '30px', justifyContent: 'center' }}>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ 
              backgroundColor: "#FFFFFF", 
              borderColor: "#0F4C5C", 
              border: '2px solid', 
              borderRadius: 2, 
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)", 
              margin: '0 auto',
              height: '300px', 
              width: '100%', 
              maxWidth: 350,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 2
            }}>
              <CardContent>
                <Typography fontWeight={400} color="#000000" variant="h5" gutterBottom>Free</Typography>
                <Typography variant="h6" gutterBottom>$0 / month</Typography>
                <Typography>Basic flashcard features and limited storage</Typography>
                <Button 
                  href="/sign-up"
                  variant="contained" 
                  sx={{ 
                    marginTop: '30px', 
                    backgroundColor: "#F5A623", 
                    color: "#333333", 
                    padding: "10px 20px",
                    '&:hover': {
                      backgroundColor: "#F4AF2A",
                      color: "#333333",
                    },
                  }}
                >
                Choose Basic
              </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ 
              backgroundColor: "#FFFFFF", 
              borderColor: "#F5A623", 
              border: '2px solid', 
              borderRadius: 2, 
              boxShadow: "0 6px 30px rgba(0,0,0,0.3)", 
              margin: '0 auto',
              height: '300px', 
              width: '100%', 
              maxWidth: 350,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 2,
              position: 'relative'
            }}>
              <CardContent>
                <Typography fontWeight={600} variant="h5" gutterBottom>Pro</Typography>
                <Typography variant="h6" gutterBottom>$10 / month</Typography>
                <Typography>Unlimited flashcards and storage with priority support</Typography>
                <Button onClick={handleSubmit} variant="contained" 
                sx={{ marginTop: '30px', backgroundColor: "#F5A623", color: "#333333", padding: "10px 20px",
                  '&:hover': {
                      backgroundColor: "#F4AF2A",
                      color: "#333333",
                    },
                 }}>
                  Choose Pro
                </Button>
              </CardContent>
              <Box sx={{ 
                position: 'absolute', 
                top: '10px', 
                right: '10px', 
                backgroundColor: '#F5A623', 
                color: '#FFFFFF', 
                padding: '5px 10px', 
                borderRadius: '5px',
                fontWeight: 'bold',
                fontSize: '14px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
              }}>
                Most Popular
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Call to Action Section */}
      <Box 
        sx={{ 
          textAlign: 'center', 
          padding: '60px 20px', 
          background: "linear-gradient(to right, #F1A623, #FFFFFF)", 
          color: "#333333" 
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: "#000000", fontWeight: 600 }}>
          Ready to elevate your learning?
        </Typography>
        <Button 
          href="/sign-up"
          variant="contained" 
          sx={{ 
            backgroundColor: "#F5A623", 
            color: "#333333", 
            padding: "10px 20px", 
            fontSize: "18px",
            '&:hover': {
              backgroundColor: "#F4AF2A",
              color: "#333333",
            },
          }}
        >
          Get started for free
        </Button>
      </Box>
      {/* Footer Section */}
      <Box sx={{ textAlign: 'center', padding: '50px 20px',  }}>
        <Typography sx={{color: "#000000"}} variant="body1">© 2024 MindSpark. All rights reserved.</Typography>
        <Typography variant="body2" sx={{ marginTop: '10px', color: "#000000" }}>
          Privacy Policy | Terms of Service
        </Typography>
      </Box>
    </div>
  );
}
