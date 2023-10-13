import React from "react";
import { 
    Box,
    Tabs,
    Typography,
    Tab,
    Button,
    TextField,
    Grid
} from "@mui/material";
import { useSelector } from "react-redux";
import dayjs from 'dayjs'

const Profile = () => {
    const user = useSelector(state => state.authentication.user)


    return(
        <>
            <Box height={72} sx={{backgroundColor: '#A9C5E1'}}>
                <Typography variant="h4">{user.displayName}</Typography>
            </Box>

            <Box>
                <Typography>Email: {user.email}</Typography>
                <Typography>Joined Date: {dayjs(user.joinDate).format("MMMM D, YYYY")}</Typography>
                <Typography>Is Admin:{user.isadmin ? "Yes" : "No"}</Typography>
                <Typography>Is Alumni: {user.isalumni ? "Yes" : "No"}</Typography>
                <Typography>Institution: </Typography>
                {user.addedBy !== null && <Typography>{user.addedBy}</Typography>}
            </Box>  
        </>
    )
}

export default Profile