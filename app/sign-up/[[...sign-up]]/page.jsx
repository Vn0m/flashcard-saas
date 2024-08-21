import { SignUp } from "@clerk/nextjs"
import { Container, Box, Typography } from "@mui/material"

const SignUpPage = () => {
  return (
    <Container maxWidth="sm">
        <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center" sx={{mt: 5}}>
            <SignUp />
        </Box>
    </Container>
  )
}

export default SignUpPage