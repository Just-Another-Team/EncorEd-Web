import { useState } from "react";
import { Badge, IconButton, useTheme } from "@mui/material"
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

type NotificationButtonType = {
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    newNotificationLength?: number;
}

const NotificationButton = ({ onClick, newNotificationLength = 0 }: NotificationButtonType) => {
    const [variant, setVariant] = useState<"dot" | "standard">("dot");

    const theme = useTheme();

    const onMouseEnter = () => {
        setVariant("standard");
    }

    const onMouseLeave = () => {
        setVariant("dot");
    }

    return (
        <IconButton
        size="small"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        color="primary">
            <Badge
            badgeContent={newNotificationLength}
            variant={variant}
            overlap="circular"
            color="error">
                <NotificationsNoneOutlinedIcon/>
            </Badge>
        </IconButton>
    )
}

export default NotificationButton