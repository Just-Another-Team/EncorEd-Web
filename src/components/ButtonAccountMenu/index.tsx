import { useState } from "react"
import { Avatar, Box, Button, Link, Menu, MenuItem, Stack, Typography, useMediaQuery, useTheme } from "@mui/material"
import Logout from "@mui/icons-material/Logout";
import { FixMeLater } from "../../types/FixMeLater";

type AccountMenuButtonType = {
    avatarSrc?: string;
    fullName?: string;
    onLogout: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}

const AccountMenuButton = ({
    avatarSrc = "/assets/profilepic.png",
    fullName = "Firstname Lastname",
    onLogout
}: AccountMenuButtonType) => {

    const theme = useTheme()
    const belowSm = useMediaQuery(theme.breakpoints.down("sm"))

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        handleClose();
        onLogout!(e);
    }

    return(
        <>
            <Button
            onClick={handleClick}
            variant="text"
            color="inherit">
                <Box
                display={"flex"}
                justifyContent={"flex-end"}
                alignItems={"center"}
                gap={1}>
                    <Avatar 
                    src={avatarSrc} //src asset needs to be connected to authenticated user
                    />
                    { !belowSm ? fullName : null }
                </Box>
            </Button>

            <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorReference="anchorEl"
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}>
                { belowSm ?
                    <MenuItem>
                        <Typography>Firstname Lastname</Typography>
                    </MenuItem> : undefined
                }
                <MenuItem onClick={handleLogout}>
                    <Stack direction={"row"} gap={1}>
                        <Logout/>
                        <Typography>Logout</Typography>
                    </Stack>
                </MenuItem>
            </Menu>
        </>
    )
}

export default AccountMenuButton