import React, { ReactNode, useEffect } from "react";
import { 
    Toolbar,
    Box,
} from "@mui/material";

type NavbarType = {
    childrenDirection?: 'flex-start' | 'flex-end' | "center" | "space-between" | "space-around"
    children?: ReactNode;
}

const Navbar = ({
    childrenDirection = "flex-end",
    children
}: NavbarType) => {

    return(
        <Toolbar>
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