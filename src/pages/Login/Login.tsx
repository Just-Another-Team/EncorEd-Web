import { Typography, Container, Box, Modal, CircularProgress } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import LoginUserForm from "../../components/Forms/Formhooks/UserForm-Login-Hooks";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../app/encored-store-hooks";
import { Link } from "react-router-dom";

const Login = () => {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            <Container
            maxWidth="xl"
            sx={{
                minHeight: "100vh",
                display: "flex",
                gap: 6,
                flexDirection: "column",
                alignItems: 'center',
                justifyContent: 'center',
                padding: 2,
                background: "linear-gradient(113deg, #45A1FD 0%, rgba(12, 99, 186, 0.85) 100%)",
                minWidth: "100%",
            }}>
                <img alt="EncorEd Logo" src="/assets/LoginLogo.svg" width={224} height={224}/>
                
                <LoginUserForm />
                
                {/* <Typography variant="h6">Don't have an account? <Link to="/register/user" style={{color:"indigo"}}>Sign Up</Link></Typography> */}
                {/* <h4>Don't have an account? <a style={{color:"indigo"}} href="/register/user">Sign Up</a></h4> */}
            </Container>
        </>
    )
}

export default Login;