import { Box, Container, Stack, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material"
import { Outlet, useNavigate, useNavigation } from "react-router-dom"
import AuthenticatedNavbar from "./AuthenticatedNavbar"
import LinkedSideBar from "./LinkedSidebar"
import { useEffect, useState } from "react"
import { useNotification } from "../../hooks/useNotification"
import { useAttendances } from "../../hooks/useAttendances"
import { useUsers } from "../../hooks/useUsers"
import { UserRole } from "../../data/IUser"
import { defaultSideBar, kioskSideBar } from "../../data/drawerWidth"
import KioskNavBar from "./KioskNavBar"
import KioskSideBar from "./KioskSideBar"
import { useMapboxNavigation } from "../../hooks/useMapboxNavigation"
import KioskSearchArea from "./KioskSearchArea"
import KioskFloorTabs from "./KioskFloorTabs"
import KioskClock from "./KioskClock"
import KioskAccountBar from "./KioskNavBar"
import KioskRoomInfo from "./KioskRoomInfo"

const Layout = () => {
    const { accessToken } = useMapboxNavigation()
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

    const role = (getCurrentUser()?.ROLE_ID as UserRole)

    return (
        <Box>
            { role.kiosk ?
            undefined :
            <LinkedSideBar
            isDrawerOpen={sidebarOpen}
            onCloseDrawer={closeSidebar}/> }

            { role.kiosk ?
            <Box
            height={'100vh'}
            width={'100%'}>
                <KioskSearchArea />
                <KioskFloorTabs />
                <KioskClock />
                <KioskRoomInfo />
                <Outlet />
            </Box> :
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
            </Box> }
        </Box>
    )
}

export default Layout