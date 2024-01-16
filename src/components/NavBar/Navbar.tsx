import React, { useEffect } from "react";
import { 
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
    Badge,
    useTheme,
    useMediaQuery,
    Stack,
    Popper
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/encored-store-hooks";
import { Link, useNavigate } from "react-router-dom";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { FixMeLater } from "../../types/FixMeLater";
import { logOut } from "../../app/features/auth/authSlice";
import { logOutRoles } from "../../app/features/role/authRoleSlice";
import { logOutInstitution } from "../../app/features/institution/authInstitutionSlice";
import { resetPage } from "../../app/features/navigation/navigationSlice";
import { resetUsers } from "../../app/features/users/usersSlice";
import { resetRoles } from "../../app/features/role/roleSlice";

import MenuIcon from '@mui/icons-material/Menu';
import { resetSubjects } from "../../app/features/subject/subjectSlice";

import { viewAttendance } from "../../app/features/attendance/attendanceSlice";
import LoadingRowsDataGridOverlay from "../Overlay/LoadingRowsOverlay/LoadingRowsOverlay";
import { Console } from "console";
import { NoBackpackSharp } from "@mui/icons-material";


const Navbar = ({
    openSidebar,
    onOpenSidebar,
    onCloseSidebar
}: FixMeLater) => {
    const user = useAppSelector(state => state.authentication.data)
    const institution = useAppSelector(state => state.authentication.data.institution)
    //const role = useAppSelector(state => state.roles)
    const attendance = useAppSelector(state => state.report.data)
    const loadingAttendance = useAppSelector(state => state.report.loading)

    const attendanceDispatch = useAppDispatch()
    const logoutDispatch = useAppDispatch()
    
    const navigate = useNavigate()

    const theme = useTheme()
    const belowMid = useMediaQuery(theme.breakpoints.down("md"))
    const belowSmall = useMediaQuery(theme.breakpoints.down("sm"))
    
    const handleSignOut = (e: FixMeLater) => {
        logoutDispatch(logOut())    
        logoutDispatch(logOutInstitution())
        logoutDispatch(logOutRoles())
        logoutDispatch(resetPage())

        logoutDispatch(resetUsers())
        logoutDispatch(resetRoles())

        logoutDispatch(resetSubjects())

        navigate("/login")
    }

    const handleSidebar = (e: FixMeLater) => {
        if (openSidebar) onCloseSidebar(e)
        else if (!openSidebar) onOpenSidebar(e)
    }

    useEffect(()=>{
        attendanceDispatch(viewAttendance(institution))
    }, [])

    const pendingAttendance = attendance.filter((d) => d.status === "Pending")
    const pendingRooms = pendingAttendance.map((d) => {return d.roomName + ", "})

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
      };

    const open = Boolean(anchorEl);
    const id = open ? 'notif-popper' : undefined;

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
                    <IconButton
                    size="small"
                    onClick={handleSidebar}
                    sx={{
                        display: !belowMid ? "none" : "block",
                        color: "#FFFFFF"
                    }}>
                        <Badge badgeContent={0} color="primary">
                            <MenuIcon />
                        </Badge>
                    </IconButton>

                    <img width={32} src="/assets/Logo.png"/>
                    <Typography
                    variant="h5"
                    fontWeight={700}
                    noWrap>
                        EncorEd
                    </Typography>
                </Box>
                

                <Box display={"flex"} gap={2}>
                    <IconButton size="small" sx={{color: '#FFFFFF'}} onClick={handleClick}>
                        <Badge badgeContent={pendingAttendance.length} color="error" >
                            <NotificationsNoneOutlinedIcon/>
                        </Badge>
                    </IconButton>
                    <Popper id={id} open={open} anchorEl={anchorEl} sx={{zIndex: '9998'}}>
                        <a href={`/dashboard/report/attendance/${institution}`} style={{textDecoration: 'none', color: 'black'}} >
                            <Box sx={{ borderRadius: 2, border: 0.5, p: 1, bgcolor: 'white' }}>
                                {pendingAttendance.length} pending attendance for rooms: <br/>
                                {pendingRooms}
                            </Box>
                        </a>
                    </Popper>
                    

                    <Stack display={!belowSmall ? "flex" : "none"} alignItems={"center"} direction={"row"} gap={2}>
                        <img width={36} height={36} src="/assets/profilepic.png"/>

                        <Typography
                        variant="h6"
                        fontWeight={400}
                        component={Link}
                        to={"/dashboard/profile"}
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
                    </Stack>
                </Box>

                
            </Toolbar>
        </AppBar>
    )
}

export default Navbar