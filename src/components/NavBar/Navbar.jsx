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
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { logOut } from "../../features/user/userSlice";
import { logOutUser } from "../../features/auth/authSlice";
import { logOutInstitution } from "../../features/institution/institutionSlice";
import { logOutRoles } from "../../features/role/roleSlice";

const Navbar = () => {
    const user = useSelector(state => state.user)
    const role = useSelector(state => state.roles)

    const logoutDispatch = useDispatch()

    let navigate = useNavigate()

    const handleSignOut = (e) => {
        logoutDispatch(logOutUser()).unwrap()
            .then(() => {
                console.log("Signing Out Success")

                //window.location.href = "/login"
                navigate("/login")

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
                    to={((role.data.find(data => data._systemRole._admin) || role.data.find(data => data._systemRole._employee)) && "/dashboard/profile") || (role.data.find(data => data._systemRole._superAdmin) && "/admin/dashboard/profile")}
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