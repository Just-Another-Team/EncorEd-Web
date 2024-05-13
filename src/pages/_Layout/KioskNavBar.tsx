import { Box, Button, IconButton, Stack, Typography } from "@mui/material"
import Navbar from "../../components/NavBar"
import { useUsers } from "../../hooks/useUsers"
import { useAuth } from "../../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import AccountMenuButton from "../../components/ButtonAccountMenu"
import { MoreVertOutlined } from "@mui/icons-material"

const KioskAccountBar = () => {
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
        <Box
        border={'1px solid black'}
        position={'fixed'}
        zIndex={2}
        bottom={32}>
            <IconButton>
                <MoreVertOutlined />
            </IconButton>
            <Typography>{ getCurrentUser()?.USER_USERNAME }</Typography>
        </Box>
    )
}

export default KioskAccountBar