import React, { ReactNode, useEffect } from "react";
import { 
    Toolbar,
    Box,
    ToolbarProps,
} from "@mui/material";

type NavbarType = {
    childrenDirection?: 'flex-start' | 'flex-end' | "center" | "space-between" | "space-around"
    children?: ReactNode;
} & ToolbarProps

const Navbar = (props: NavbarType) => {

    const { children, childrenDirection } = props

    return(
        <Toolbar
        {...props as ToolbarProps}>
            <Box
            display={"flex"}
            flex={1}
            justifyContent={childrenDirection}
            alignItems={"center"}
            gap={1}>
                { children }
            </Box>
        </Toolbar>
    )
}

export default Navbar