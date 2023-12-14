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
import { FixMeLater } from "../../types/FixMeLater";


const Dashboard = () => {

    const [ openSidebar, setOpenSidebar ] = React.useState<boolean>(false);

    const handleOpenSidebar = (e: FixMeLater) => {
        setOpenSidebar(true)
    }
    const handleCloseSidebar = (e: FixMeLater) => {
        setOpenSidebar(false)
    }

    return(
        <Box sx={{display: 'flex'}}>
            <Navbar openSidebar={openSidebar} onOpenSidebar={handleOpenSidebar} onCloseSidebar={handleCloseSidebar} />
            <ConnectedSideBar open={openSidebar} onClose={handleCloseSidebar}/>
            <Container maxWidth="lg" component="main" sx={{ flexGrow: 1, p: 3, }}>
                <Toolbar variant="regular"/>
                
                {/* Test for the Data Grid */}
                <Outlet />
            </Container>
        </Box>
    )
}

export default Dashboard