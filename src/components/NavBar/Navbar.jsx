import React from "react";
import { 
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box
} from "@mui/material";
import { auth, signOut } from "../../app/firebase/authentication";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../features/auth/authSlice";

const Navbar = () => {
    const loggedIn = useSelector(state => state.authentication.user)
    const logoutDispatch = useDispatch()

    const handleSignOut = (e) => {
        signOut(auth)
            .then(() => {
                alert("Signing Out Success")

                logoutDispatch(logOutUser())

                window.location.href = "/login"
            })
            .catch((error) => {
                alert("Signing Out Failed")
                console.log(error)
            })
    }

    return(
        <AppBar
        position="fixed"
        sx={{ 
            zIndex: (theme) => theme.zIndex.drawer + 1,
            boxShadow: "none",
            backgroundColor: '#45A3FD'
        }}>
            <Toolbar>
                <Box
                display={"flex"}
                gap={2}
                flex={1}>
                    <img width={32} src="/assets/Logo.png"/>
                    <Typography
                    variant="h5"
                    fontWeight={700}
                    noWrap>
                        EncorEd
                    </Typography>
                </Box>
                

                <Box display={"flex"} gap={2}>
                    
                    {/* Notification button */}

                    <Typography
                    variant="h6"
                    fontWeight={400}>
                        {loggedIn ? loggedIn.displayName : "User Full name"}
                        
                    </Typography>

                    <Button variant="contained" size="small" onClick={handleSignOut}>
                        LOGOUT
                    </Button>
                </Box>

                
            </Toolbar>
        </AppBar>
    )
}

export default Navbar