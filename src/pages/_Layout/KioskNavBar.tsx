import { Box } from "@mui/material"
import Navbar from "../../components/NavBar"
import { useUsers } from "../../hooks/useUsers"
import { useAuth } from "../../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import AccountMenuButton from "../../components/ButtonAccountMenu"

const KioskNavBar = () => {
    const { signOut } = useAuth()
    const { getCurrentUser } = useUsers()
    
    const navigate = useNavigate()

    const handleLogout = async () => {
        await signOut()
            .then(() => {
                navigate('/')
            })
            .catch((error) => {
                console.error(error)
            })
    }

    return (
        <Navbar
        childrenDirection="space-between">
            {/* <Stack
            direction={"row"}
            gap={2}>
                <IconButton
                onClick={onOpenDrawer}
                sx={{ display: !belowMid ? "none" : "block" }}>
                    <Menu />
                </IconButton>
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

            </Stack> */}

            <Box>
                {/* <NotificationButton
                newNotificationLength={newNotifications}
                onClick={notificationOnClick}/> */}
                <AccountMenuButton
                fullName={getCurrentUser()?.USER_USERNAME!}
                onLogout={handleLogout}/>
            </Box>
        </Navbar>
    )
}

export default KioskNavBar