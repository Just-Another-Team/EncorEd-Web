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

import { auth, onAuthStateChanged } from '../../app/firebase/authentication';
import { useEffect } from 'react';


const Dashboard = () => {
    const selected = useSelector((state) => state.pageSelect.page)

    return(
        <Box sx={{display: 'flex'}}>
            <Navbar />
            <Sidebar selected={selected}/>
            <Container maxWidth="lg" component="main" sx={{ flexGrow: 1, p: 3, }}>
                <Toolbar variant="regular"/>
                
                {/* Test for the Data Grid */}

                <Outlet />
            </Container>
        </Box>
    )
}

export default Dashboard