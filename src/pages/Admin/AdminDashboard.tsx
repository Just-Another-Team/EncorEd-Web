import React from "react";
import {
    Box,
    Container,
    Toolbar,
    Typography
} from '@mui/material'
import Navbar from "../../components/NavBar/Navbar";
import { Outlet } from "react-router-dom";
import ConnectedSideBar from "../../components/NavBar/hooks/SidebarHook";

const AdminDashboard = () => {

    return(
        <Box sx={{display: 'flex'}}>
            <Navbar />
            <ConnectedSideBar />
            <Container maxWidth="lg" component="main" sx={{ flexGrow: 1, p: 3, }}>
                <Toolbar variant="regular"/>
                <Outlet />
            </Container>
        </Box>
    )
}

export default AdminDashboard