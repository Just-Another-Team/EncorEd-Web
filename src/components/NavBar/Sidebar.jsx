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
import { nextPage } from "../../features/navigation/navigationSlice";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const Sidebar = ({navigations, select, selectedPage}) => {


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
                                backgroundColor: navigation.name === selectedPage.page && '#6DB6FD'
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