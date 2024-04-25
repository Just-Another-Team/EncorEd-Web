import React, { useEffect } from "react";
import {
    Drawer,
    Toolbar,
    List,
    ListItemButton,
    ListItemIcon,
    ListItem,
    ListItemText,
    ListItemButtonProps,
    Box,
    useTheme,
    useMediaQuery,
    Typography,
    Stack,
    SxProps,
    Theme
} from '@mui/material'
import { Link, useLocation } from "react-router-dom";
import { FixMeLater } from "../../types/FixMeLater";
import LinkListItem from "./LinkListItem";
import { defaultSideBar } from "../../data/drawerWidth";

//const drawerWidth = 208; //Move to another react file

type SidebarType = {
    links: FixMeLater; //links: MenuItemType
    // select: FixMeLater; //MenuItemOnClick
    // selectedPage: FixMeLater;
    isDrawerOpen: boolean; //IsDrawerOpen
    onCloseDrawer: () => void //OnCloseDrawer
}

const Sidebar = ({
    links,
    isDrawerOpen,
    onCloseDrawer
}: SidebarType) => {

    //selectedPage: Selector
    const { pathname } = useLocation();

    const theme = useTheme()
    const belowMid = useMediaQuery(theme.breakpoints.down("md"))

    const handleOnClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        onCloseDrawer();
    }

    return(
        <Drawer
        variant={!belowMid ? "permanent" : "temporary"}
        open={isDrawerOpen}
        onClose={onCloseDrawer}
        sx={{
            width: defaultSideBar,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { 
                width: defaultSideBar,
                boxSizing: 'border-box' ,
                backgroundColor: theme.palette.primary.main,
            },
        }}>
            {/* TO-DO: Color the title and provide links */}
            <Toolbar sx={{gap: 2}}>
                <img width={32} src="/assets/Logo.png"/>
                <Typography
                variant="h5"
                fontWeight={700}
                noWrap>
                    Encor<span>Ed</span>
                </Typography>
            </Toolbar>
            
            <Box sx={{ overflow: 'auto'}}> 
                <List disablePadding>
                    {links?.map((navigation: FixMeLater, index: FixMeLater) => (
                        <ListItem key={navigation.name} disablePadding>
                            <LinkListItem
                            component={Link}    
                            to={navigation.href}
                            onClick={handleOnClick}
                            sx={{
                                color: pathname === navigation.href ? theme.palette.grey[50] : theme.palette.grey[400],
                            }}>
                                <ListItemIcon
                                sx={{
                                    color: pathname === navigation.href ? theme.palette.grey[50] : theme.palette.grey[400],
                                }}>
                                    {navigation.icon}
                                </ListItemIcon>
                                <ListItemText
                                primary={navigation.name}
                                primaryTypographyProps={{
                                    fontWeight: pathname === navigation.href ? 700 : 400
                                }}/>
                            </LinkListItem>
                        </ListItem>
                    ))}
                </List>

            </Box>
        </Drawer>
    )
}

export default Sidebar