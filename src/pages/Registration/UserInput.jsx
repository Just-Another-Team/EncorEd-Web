import { 
    Container,
    Typography,
    Grid,
    Button,
} from "@mui/material";
import React from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InstitutionForm from "../../components/Forms/InstitutionForm-Registration";
import RegistrationUserForm from "../../components/Forms/Formhooks/UserForm-Registration-Hooks";

const UserInput = () => {
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
            {/* <UserForm /> */}
            <RegistrationUserForm />
            
            {/* <InstitutionForm /> */}

            {/* Add Role */}
            {/* <Grid
            component="form"
            container
            maxWidth="sm"
            sx={{
                backgroundColor: "#FFFFFF",
                borderRadius: 4,
                padding: 3
            }}>
                <Grid item xs={12} marginBottom={2}>
                    <Typography variant="h5" component="h5" textAlign={"center"}>Add Roles</Typography>
                </Grid>
                <Grid item xs={12} marginBottom={2}>
                    <Button variant="contained">ADD</Button>
                </Grid>
                <Grid item xs={12}>
                    
                </Grid>
            </Grid> */}

            {/* Add Users */}
        </Container>
    )
}

export default UserInput