import React from "react";
import {
    Box,
    Container,
    Toolbar,
    Typography
} from '@mui/material'
import Navbar from "../../components/NavBar/Navbar";
import Sidebar from "../../components/NavBar/Sidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import ConnectedSideBar from "../../components/NavBar/hooks/SidebarHook";


const Dashboard = () => {

    return(
        <Box sx={{display: 'flex'}}>
            <Navbar />
            <ConnectedSideBar />
            <Container maxWidth="lg" component="main" sx={{ flexGrow: 1, p: 3, }}>
                <Toolbar variant="regular"/>
                
                {/* Test for the Data Grid */}

                <Outlet />
            </Container>
        </Box>
    )
}

export default Dashboard