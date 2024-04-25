import { Box, Container, Stack, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material"
import { Outlet } from "react-router-dom"
import AuthenticatedNavbar from "./AuthenticatedNavbar"
import LinkedSideBar from "./LinkedSidebar"
import { useEffect, useState } from "react"
import { useNotification } from "../../hooks/useNotification"
import { useAttendances } from "../../hooks/useAttendances"
import { useUsers } from "../../hooks/useUsers"
import { UserRole } from "../../data/IUser"
import { defaultSideBar, kioskSideBar } from "../../data/drawerWidth"
import KioskNavBar from "./KioskNavBar"

const Layout = () => {
    const { getCurrentUser } = useUsers()
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

    const theme = useTheme()
    const belowMid = useMediaQuery(theme.breakpoints.down("md"))

    const openSidebar = () => {
        setSidebarOpen(true);
    }

    const closeSidebar = () => {
        setSidebarOpen(false);
    }

    //Fixes:
    // - Use a react-pro-sidebar for the sidebar

    return (
        <Box
        //sx={{ display: 'flex' }}
        >
            {/* Prop drilled 2 layered components: AuthenticatedNavbar and NavBar */}
            {/* <AuthenticatedNavbar onOpenDrawer={openSidebar}/> */}

            {/* Prop drilled 2 layered components: LinkedSideBar and SideBar */}
            {/* Provide a way to separate based on if the logged in user is a kiosk or not */}
            <LinkedSideBar
            isDrawerOpen={sidebarOpen}
            onCloseDrawer={closeSidebar}/>

            {/* { (getCurrentUser()?.ROLE_ID as UserRole).kiosk ? 
            undefined :
            <AuthenticatedNavbar
            onOpenDrawer={openSidebar}/> } */}

            {/* <AuthenticatedNavbar
            onOpenDrawer={openSidebar}/> */}

            {/* <KioskNavBar /> */}

            <Box
            marginLeft={!belowMid ? `${defaultSideBar}px` : 0}>

                <AuthenticatedNavbar
                onOpenDrawer={openSidebar}/>

                <Container
                maxWidth="xl"
                sx={{
                    marginY: 1,
                }}>
                    <Outlet />
                </Container>
            </Box>

            {/* <Box
            height={'100vh'}
            //border={'1px solid black'}
            bgcolor={'green'}
            marginLeft={!belowMid ? `${kioskSideBar}px` : 0}>
                <Outlet />
            </Box> */}
        </Box>
    )
}

export default Layout