import { Box, Container, Stack, Toolbar, Typography } from "@mui/material"
import { Outlet } from "react-router-dom"
import AuthenticatedNavbar from "./AuthenticatedNavbar"
import DialogMessage from "../../components/DialogMessage"
import LinkedSideBar from "./LinkedSidebar"
import { useState } from "react"


const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

    const openSidebar = () => {
        setSidebarOpen(true);
    }

    const closeSidebar = () => {
        setSidebarOpen(false);
    }

    return (
        <Box sx={{ display: 'flex' }}>
            {/* Prop drilled 2 layered components: AuthenticatedNavbar and NavBar */}
            {/* <AuthenticatedNavbar onOpenDrawer={openSidebar}/> */}

            {/* Prop drilled 2 layered components: LinkedSideBar and SideBar */}
            <LinkedSideBar
            isDrawerOpen={sidebarOpen}
            onCloseDrawer={closeSidebar}/>

            <Stack
            flex={1}>
                <AuthenticatedNavbar
                onOpenDrawer={openSidebar}/>
                <Container
                maxWidth="xl"
                sx={{
                    marginY: 1,
                }}>
                    {/* Do the thing that allow roles */}
                    <Outlet />
                </Container>
            </Stack>
        </Box>
    )
}

export default Layout