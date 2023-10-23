import React from "react";
import { 
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
    Badge
} from "@mui/material";
import { auth, signOut } from "../../app/firebase/authentication";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { reset } from "../../features/navigation/navigationSlice";
import { logOut } from "../../features/user/userSlice";
import { logOutUser } from "../../features/auth/authSlice";
import { logOutInstitution } from "../../features/institution/institutionSlice";
import { logOutRoles } from "../../features/role/roleSlice";

const Navbar = () => {
    const user = useSelector(state => state.user)
    const logoutDispatch = useDispatch()

    const handleSignOut = (e) => {
        logoutDispatch(logOutUser()).unwrap()
            .then(() => {
                console.log("Signing Out Success")
                window.location.href = "/login"

                logoutDispatch(logOut())
                logoutDispatch(logOutInstitution())
                logoutDispatch(logOutRoles())
            })
            .catch((error) => {
                console.log("Signing Out Failed")
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
                    <IconButton
                    size="small"
                    sx={{backgroundColor: '#FFFFFF', color: '#FDB833'}}>
                        <Badge badgeContent={0} color="primary">
                            <NotificationsNoneOutlinedIcon />
                        </Badge>
                    </IconButton>

                    <Typography
                    variant="h6"
                    fontWeight={400}
                    component={Link}
                    //to={(loggedIn.role && "/dashboard/profile") || (loggedIn.role && "/admin/dashboard/profile")}
                    //to={((loggedIn.role.find(data => data._systemRole._admin) || loggedIn.role.find(data => data._systemRole._employee)) && "/dashboard/profile") || (loggedIn.role.find(data => data._systemRole._superAdmin) && "/admin/dashboard/profile")}
                    to={"/dashboard/profile"}
                    sx={{
                        textDecoration: 'none',
                        color: '#FFFFFF'
                    }}>
                        {user.data ? user.data.displayName : "User Full name"}
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