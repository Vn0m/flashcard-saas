"use client";

import { AppBar, Toolbar, Typography, Button, IconButton, Box, Popover, MenuItem } from "@mui/material";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import MenuIcon from '@mui/icons-material/Menu';
import Image from "next/image";
import { useState } from "react";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "white", color: "black" }}>
      <Toolbar>
        <Image src="/mindspark.png" width="30" height="30" alt="MindSpark logo" style={{ marginRight: 8 }} />
        <Typography variant="h6" sx={{ flexGrow: 1 }}><a style={{textDecoration: "none", color: "#000000"}} href="/">MindSpark</a></Typography>
        
        {/* Desktop menu */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SignedOut>
            <Button variant="contained" sx={{
              backgroundColor: "#000000", mr: 1,
              '&:hover': { backgroundColor: "#373737" }
            }} href="/sign-in">
              Log in
            </Button>
            <Button variant="contained" sx={{
              backgroundColor: "#ffffff",
              color: "#000000",
              '&:hover': { backgroundColor: "#d9d9d9" }
            }} href="/sign-up">
              Sign up
            </Button>
          </SignedOut>
          <SignedIn>
            <Button sx={{color: "#ffc65b"}} href="/create-flashcard">New</Button>
            <Button color="inherit" href="/flashcards" sx={{mr: 2}}>Dashboard</Button>
            <UserButton />
          </SignedIn>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
