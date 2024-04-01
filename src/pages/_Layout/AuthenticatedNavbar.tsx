import { Stack, Box, TextField, IconButton, useTheme, useMediaQuery, InputAdornment } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AccountMenuButton from "../../components/ButtonAccountMenu";
import NotificationButton from "../../components/ButtonNotification";
import Navbar from "../../components/NavBar"
import Menu from "@mui/icons-material/Menu";
import { Search } from "@mui/icons-material";
import { NotificationStatusEnum, Notifications } from "../../data/notificationData";
import { useAuth } from "../../hooks/useAuth";

//-------------------------------------------------
// useNavBar
// It contains the following functions in relation to the Navbar component:
//  - Log in and Log out
//  - Provide the name of the user
//  - Contains notification functions that passes through the Navbar component

type AuthenticatedNavbarProps = {
    onOpenDrawer : () => void
}

const AuthenticatedNavbar = ({
    onOpenDrawer
}: AuthenticatedNavbarProps) => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    const theme = useTheme()
    const belowMid = useMediaQuery(theme.breakpoints.down("md"))

    const notificationOnClick = () => {
        navigate("/dashboard/notifications")
    }

    const handleLogout = async () => {
        await signOut()
            .then(() => {
                navigate('/')
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const newNotifications = Notifications.filter(notification => notification.notfStatus === NotificationStatusEnum.Unread).length;

    return (
        <Navbar
        childrenDirection="space-between">
            <Stack
            direction={"row"}
            gap={2}>
                <IconButton
                onClick={onOpenDrawer}
                sx={{ display: !belowMid ? "none" : "block" }}>
                    <Menu />
                </IconButton>

                {/* Make the search more informative */}
                <TextField
                placeholder="Search"
                size="small"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    )
                }}
                sx={{
                    width: 240,
                }}/>

            </Stack>

            <Box>
                <NotificationButton
                newNotificationLength={newNotifications}
                onClick={notificationOnClick}/>
                <AccountMenuButton
                fullName={user?.USER_FULLNAME}
                onLogout={handleLogout}/>
            </Box>
        </Navbar>
    )
}

export default AuthenticatedNavbar;