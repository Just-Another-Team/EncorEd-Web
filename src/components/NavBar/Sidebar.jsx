import React from "react";
import {
    Drawer,
    Toolbar,
    List,
    ListItemButton,
    ListItemIcon,
    ListItem,
    ListItemText,
    Box
} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux';
import { nextPage } from "../../features/navigation/navigationSlice";
import { Link } from "react-router-dom";

import HomeOutline from '@mui/icons-material/HomeOutlined'
import BookOutline from '@mui/icons-material/ClassOutlined'
import MapOutline from '@mui/icons-material/MapOutlined'
import EventOutline from '@mui/icons-material/CalendarTodayOutlined'
import GroupsOutline from '@mui/icons-material/GroupsOutlined'
import OrganizationOutline from '@mui/icons-material/PieChartOutlined'
import ReportOutline from '@mui/icons-material/AssessmentOutlined';

const drawerWidth = 240;

const Sidebar = ({selected}) => {
    const select = useDispatch()
    //const [selected, setSelected] = React.useState('Home');

    const navigations = [
        {name: "Home", icon: <HomeOutline />, href: "/dashboard/home"},
        {name: "Reports", icon: <ReportOutline />, href: "/dashboard/home"},
        {name: "Subject", icon: <BookOutline />, href: "/dashboard/subject"},
        {name: "Maps", icon: <MapOutline />, href: "/dashboard/map/list"},
        {name: "Events", icon: <EventOutline />, href: "/dashboard/event"},
        {name: "User and Groups", icon: <GroupsOutline />, href: "/dashboard/users"},
        {name: "Institution", icon: <OrganizationOutline />, href: "/dashboard/institution"},
    ]

    return(
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { 
                    width: drawerWidth,
                    boxSizing: 'border-box' ,
                    backgroundColor: '#45A3FD',
                    color: '#FFFFFF'
                },
            }}
        >
            <Toolbar/>
            <Box sx={{ overflow: 'auto'}}>
                <List disablePadding>
                    {navigations.map((navigation, index) => (
                        <ListItem key={navigation.name} disablePadding>
                            <ListItemButton
                            LinkComponent={Link}
                            to={navigation.href}
                            onClick={(e) => {
                                select(nextPage(navigation.name))
                            }}
                            sx={{
                                backgroundColor: navigation.name === selected && '#6DB6FD'
                            }}>

                                <ListItemIcon sx={{ color: '#FFFFFF' }}>
                                    {navigation.icon}
                                </ListItemIcon>

                                <ListItemText primary={navigation.name} />

                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    )
}

export default Sidebar