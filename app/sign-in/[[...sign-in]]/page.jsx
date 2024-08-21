import { SignIn } from "@clerk/nextjs"
import { Container, Box, Typography } from "@mui/material"

const SignInPage = () => {
  return (
    <Container maxWidth="sm">
        <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center" sx={{mt: 5}}> 
            <SignIn />
        </Box>
    </Container>
  )
}

export default SignInPage