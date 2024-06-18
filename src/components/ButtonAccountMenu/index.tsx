import { useState } from "react"
import { Avatar, Box, Button, Link, Menu, MenuItem, Stack, Typography, useMediaQuery, useTheme } from "@mui/material"
import Logout from "@mui/icons-material/Logout";
import { FixMeLater } from "../../types/FixMeLater";
import { useUsers } from "../../hooks/useUsers";
import { Settings } from "@mui/icons-material";
import { UserRole } from "../../data/IUser";

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
    const { getCurrentUser } = useUsers()

    const theme = useTheme()
    const belowMd = useMediaQuery(theme.breakpoints.down("md"))

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const role = getCurrentUser()?.ROLE_ID as UserRole

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

    const handleSettings = () => {

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
                    { !belowMd ? fullName : null }
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
                { belowMd ?
                    <MenuItem>
                        <Typography>{getCurrentUser()?.USER_FULLNAME}</Typography>
                    </MenuItem> : undefined
                }
                {
                    role.admin || role.campusDirector ? (
                        <MenuItem onClick={handleSettings}>
                            <Stack direction={"row"} gap={1}>
                                <Settings />
                                <Typography>Settings</Typography>
                            </Stack>
                        </MenuItem>
                    ) : undefined
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