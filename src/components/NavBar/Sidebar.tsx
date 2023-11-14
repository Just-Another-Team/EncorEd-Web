import React from "react";
import {
    Drawer,
    Toolbar,
    List,
    ListItemButton,
    ListItemIcon,
    ListItem,
    ListItemText,
    ListItemButtonProps,
    Box
} from '@mui/material'
import { nextPage } from "../../app/features/navigation/navigationSlice";
import { Link } from "react-router-dom";
import { FixMeLater } from "../../types/FixMeLater";

const drawerWidth = 240;

const CustomListItemButton = <C extends React.ElementType>(props: ListItemButtonProps<C, { component?: C }>) => {
    return (<ListItemButton {...props}>{props.children}</ListItemButton>)
}

const Sidebar = ({navigations, select, selectedPage}: FixMeLater) => {
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
                    {navigations?.map((navigation: FixMeLater, index: FixMeLater) => (
                        <ListItem key={navigation.name} disablePadding>
                            <CustomListItemButton
                            component={Link}
                            to={navigation.href}
                            onClick={() => {
                                select(nextPage(navigation.name))
                            }}
                            sx={{
                                backgroundColor: navigation.name === selectedPage ? '#6DB6FD' : ''
                            }}>
                                <ListItemIcon sx={{ color: '#FFFFFF' }}>{navigation.icon}</ListItemIcon>
                                <ListItemText primary={navigation.name} />
                            </CustomListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    )
}

export default Sidebar