import { 
    Container,
    Typography,
    Grid,
    Button,
} from "@mui/material";
import React, { useEffect } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InstitutionForm from "../../components/Forms/InstitutionForm";
import RegistrationUserForm from "../../components/Forms/Formhooks/UserForm-Registration-User-Hooks";
import { Outlet } from "react-router-dom";

const UserInput = () => {

    // useEffect(() => {
    //     onAuthStateChanged(auth, (user) => {
    //         if (user === null && window.location.pathname !== "/register/user") window.location.href = "/register/user"
    //     })
    // },[])

    return (
        <Container
        maxWidth="xl"
        sx={{
            minHeight: "100vh",
            minWidth: "100%",
            display: "flex",
            alignItems: 'center',
            justifyContent: 'center',
            padding: 4,
            background: "linear-gradient(113deg, #45A1FD 0%, rgba(12, 99, 186, 0.85) 100%)"
        }}>
            {/* This must be with useForm or move this as a form component*/}
            <Outlet />
            {/* Register */}
            {/* Add Institution */}
            {/* Add Role */}
            {/* Add Users */}
        </Container>
    )
}

export default UserInput