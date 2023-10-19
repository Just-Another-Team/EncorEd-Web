import { Typography, Container, Box, Modal, CircularProgress } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import LoginUserForm from "../../components/Forms/Formhooks/UserForm-Login-Hooks";
import { useSelector } from "react-redux";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 320,
    bgcolor: 'background.paper',
    border: '2px solid #FFF',
    borderRadius: 2,
    //boxShadow: 24,
    p: 4,
};

const Login = () => {
    const auth = useSelector(state => state.authentication)

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        if (auth.error !== null) setOpen(true)
    }, [auth.error])

    return (
        <>
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
                background: "linear-gradient(113deg, #45A1FD 0%, rgba(12, 99, 186, 0.85) 100%)",
                minWidth: "100%",
            }}>
                <img alt="EncorEd Logo" src="/assets/LoginLogo.svg"/>
                <LoginUserForm />
                
                <h4>Don't have an account? <a style={{color:"indigo"}} href="/register/user">Sign Up</a></h4>
            </Container>

            {/* <Modal
                open={auth.loading}
                //open={true}
                //onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={[style, {display: 'flex', flexDirection: "column", alignItems: 'center', gap: 3}]}>
                    <Typography id="modal-modal-title" textAlign={'center'} variant="h6" component="h2">
                        Logging in to EncorEd. Please wait
                    </Typography>
                    <CircularProgress />
                </Box>
            </Modal> */}

            {/* <Modal
                open={open}
                //open={true}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={[style, {display: 'flex', flexDirection: "column", alignItems: 'center', gap: 3}]}>
                    <Typography id="modal-modal-title" textAlign={'center'} variant="h6" component="h2">
                        An error occured while logging in.
                    </Typography>
                    
                </Box>
            </Modal> */}
        </>
    )
}

export default Login;