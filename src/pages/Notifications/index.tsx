import { Box, Typography } from "@mui/material"
import NotificationItems from "./NotificationItems"

const NotificationList = () => {

    return(
        <Box>
            <Box
            marginBottom={2}>
                <Typography
                variant="h4"
                fontWeight={700}>
                    Notifications
                </Typography>
            </Box>

            <NotificationItems />
        </Box>
    )
}

export default NotificationList