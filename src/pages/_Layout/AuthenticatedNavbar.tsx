import { Stack, Box, TextField, IconButton, useTheme, useMediaQuery, InputAdornment } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AccountMenuButton from "../../components/ButtonAccountMenu";
import NotificationButton from "../../components/ButtonNotification";
import Navbar from "../../components/NavBar"
import Menu from "@mui/icons-material/Menu";
import { Search } from "@mui/icons-material";
import { useAuth } from "../../hooks/useAuth";
import { commonLink } from "../../data/commonLink";
import { UserRole } from "../../data/IUser";
import { useNotification } from "../../hooks/useNotification";
import { useUsers } from "../../hooks/useUsers";

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
    const { signOut } = useAuth();
    const { getCurrentUser } = useUsers()
    const { unReadNotifications, setToRead } = useNotification()
    const navigate = useNavigate();

    const theme = useTheme()
    const belowMid = useMediaQuery(theme.breakpoints.down("md"))

    const notificationOnClick = async () => {
        //set the notifications to read
        navigate(`${getCurrentUser() ? (getCurrentUser()?.ROLE_ID as UserRole).campusDirector ? commonLink.campusDirector : (getCurrentUser()?.ROLE_ID as UserRole).dean ? commonLink.dean : commonLink.admin : commonLink.admin}/notifications`)
        await setToRead()
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

    const newNotifications = unReadNotifications().length;

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
                fullName={getCurrentUser()?.USER_FULLNAME}
                onLogout={handleLogout}/>
            </Box>
        </Navbar>
    )
}

export default AuthenticatedNavbar;