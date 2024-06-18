import React, { ReactNode, useEffect } from "react";
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
import Color from "../../assets/Color";

//const drawerWidth = 208; //Move to another react file

type OnCloseDrawer = {
    onCloseDrawer: () => void
}

type SidebarListType = {
    links: FixMeLater;
} & OnCloseDrawer

type SidebarType = {
    // select: FixMeLater; //MenuItemOnClick
    // selectedPage: FixMeLater;
    sideBarWidth?: number
    isDrawerOpen: boolean; //IsDrawerOpen
    children: ReactNode
    backgroundColor?: string
} & OnCloseDrawer

const Sidebar = ({
    isDrawerOpen,
    onCloseDrawer,
    sideBarWidth = defaultSideBar,
    children,
    backgroundColor
}: SidebarType) => {

    const theme = useTheme()
    const belowMid = useMediaQuery(theme.breakpoints.down("md"))

    return(
        <Drawer
        variant={!belowMid ? "permanent" : "temporary"}
        open={isDrawerOpen}
        onClose={onCloseDrawer}
        sx={{
            width: sideBarWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { 
                width: sideBarWidth,
                boxSizing: 'border-box' ,
                backgroundColor: backgroundColor ? backgroundColor : theme.palette.primary.main,
            },
        }}>
            {/* TO-DO: Color the title and provide links */}
            <Toolbar sx={{gap: 2}}>
                <img width={32} src="/assets/Logo.png"/>
                <Typography
                variant="h5"
                fontWeight={700}
                color={Color('white', 400)}
                noWrap>
                    Encor<span>Ed</span>
                </Typography>
            </Toolbar>

            { children }
            
            {/* Turn this into children instead */}
            {/* <Box sx={{ overflow: 'auto'}}>
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
            </Box> */}

        </Drawer>
    )
}

const SideBarList = ({ 
    links,
    onCloseDrawer
}: SidebarListType) => {

    const { pathname } = useLocation();

    const theme = useTheme()

    const handleOnClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        onCloseDrawer();
    }

    return (
        <Box sx={{ overflow: 'auto'}}>
            <List disablePadding>
                {links?.map((navigation: FixMeLater, index: FixMeLater) => {
                    return (
                        <ListItem key={navigation.name} disablePadding>
                            <LinkListItem
                            component={Link}    
                            to={navigation.href}
                            onClick={handleOnClick}
                            sx={{
                                color: pathname.split("/")[2] === (navigation.href as string).split("/")[2] ? theme.palette.grey[50] : theme.palette.grey[400],
                            }}>
                                <ListItemIcon
                                sx={{
                                    color: pathname.split("/")[2] === (navigation.href as string).split("/")[2] ? theme.palette.grey[50] : theme.palette.grey[400],
                                }}>
                                    {navigation.icon}
                                </ListItemIcon>
                                <ListItemText
                                primary={navigation.name}
                                primaryTypographyProps={{
                                    fontWeight: pathname.split("/")[2] === (navigation.href as string).split("/")[2] ? 700 : 400
                                }}/>
                            </LinkListItem>
                        </ListItem>
                    )
                })}
            </List>
        </Box>
    )
}

Sidebar.ItemList = SideBarList

export default Sidebar