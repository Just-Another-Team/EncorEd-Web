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
import { useAppDispatch, useAppSelector } from "../../app/encored-store-hooks";
import { Link, useNavigate } from "react-router-dom";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { FixMeLater } from "../../types/FixMeLater";
// import { logOut } from "../../app/features/user/userSlice";

// import { logOutInstitution } from "../../app/features/institution/institutionSlice";
// import { logOutRoles } from "../../app/features/role/roleSlice";
// import { nextPage } from "../../app/features/navigation/navigationSlice";

import { logOut } from "../../app/features/auth/authSlice";
import { logOutRoles } from "../../app/features/role/authRoleSlice";
import { logOutInstitution } from "../../app/features/institution/authInstitutionSlice";
import { resetPage } from "../../app/features/navigation/navigationSlice";
import { resetUsers } from "../../app/features/users/usersSlice";
import { resetRoles } from "../../app/features/role/roleSlice";


const Navbar = () => {
    const user = useAppSelector(state => state.authentication.data)
    //const role = useAppSelector(state => state.roles)

    const logoutDispatch = useAppDispatch()

    let navigate = useNavigate()

    const handleSignOut = (e: FixMeLater) => {

        console.log("IS THIS WORKING!")

        logoutDispatch(logOut())    
        logoutDispatch(logOutInstitution())
        logoutDispatch(logOutRoles())
        logoutDispatch(resetPage())

        logoutDispatch(resetUsers())
        logoutDispatch(resetRoles())
            
        navigate("/login")
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
                    to={"/admin/dashboard/profile"}
                    sx={{
                        textDecoration: 'none',
                        color: '#FFFFFF',
                    }}>
                        {user ? `${user.firstName} ${user.lastName}` : "User Full name"}
                    </Typography>

                    <Button
                    variant="contained"
                    size="small"
                    onClick={handleSignOut}>
                        LOGOUT
                    </Button>
                </Box>

                
            </Toolbar>
        </AppBar>
    )
}

export default Navbar