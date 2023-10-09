import { Typography, Container } from "@mui/material";
import React from "react";
import LoginUserForm from "../../components/Forms/Formhooks/UserForm-Login-Hooks";

const Login = () => {
    return (
        <Container
        maxWidth="xl"
        sx={{
            minHeight: "100vh",
            display: "flex",
            gap: 8,
            flexDirection: "column",
            alignItems: 'center',
            justifyContent: 'center',
            padding: 8,
            background: "linear-gradient(113deg, #45A1FD 0%, rgba(12, 99, 186, 0.85) 100%)"
        }}>
            <img alt="EncorEd Logo" src="/assets/LoginLogo.svg"/>
            <LoginUserForm />
        </Container>
    )
}

export default Login;