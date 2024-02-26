import React, { ReactNode, useEffect } from "react";
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
    Avatar,
    Popper,
    Menu,
    MenuItem
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/encored-store-hooks";
import { Link } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
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

type NavbarType = {
    childrenDirection?: 'flex-start' | 'flex-end' | "center" | "space-between" | "space-around"
    children?: ReactNode;
}

const Navbar = ({
    childrenDirection = "flex-end",
    children
}: NavbarType) => {
    // const user = useAppSelector(state => state.authentication.data)
    // const institution = useAppSelector(state => state.authentication.data.institution)
    // //const role = useAppSelector(state => state.roles)
    // const attendance = useAppSelector(state => state.report.data)
    // const loadingAttendance = useAppSelector(state => state.report.loading)

    // const attendanceDispatch = useAppDispatch()
    // const logoutDispatch = useAppDispatch()
    
    // const navigate = useNavigate()

    // const theme = useTheme()
    // const belowMid = useMediaQuery(theme.breakpoints.down("md"))
    
    // const handleSignOut = (e: FixMeLater) => {
    //     logoutDispatch(logOut())    
    //     logoutDispatch(logOutInstitution())
    //     logoutDispatch(logOutRoles())
    //     logoutDispatch(resetPage())

    //     logoutDispatch(resetUsers())
    //     logoutDispatch(resetRoles())

    //     logoutDispatch(resetSubjects())

    //     navigate("/login")
    // }

    // const pendingAttendance = attendance.filter((d) => d.status === "Pending")
    // const pendingRooms = pendingAttendance.map((d) => {return d.roomName + ", "})

    // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    // const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    //     setAnchorEl(anchorEl ? null : event.currentTarget);
    //   };

    // const open = Boolean(anchorEl);
    // const id = open ? 'notif-popper' : undefined;

    return(
        <Toolbar>
            {/* <Box
            display={"flex"}
            gap={2}>
                <IconButton
                size="small"
                onClick={onClickShowSidebar}
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
            </Box> */}
            

            <Box
            display={"flex"}
            flex={1}
            justifyContent={childrenDirection}
            alignItems={"center"}
            gap={1}>
                {children}
            </Box>
            
        </Toolbar>
    )
}

export default Navbar