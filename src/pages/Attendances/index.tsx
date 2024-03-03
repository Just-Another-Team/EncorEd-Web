import { 
    Box,
    Typography
} from "@mui/material"
import AttendanceList from "./AttendanceList"

const Attendances = () => {
    return (
        <Box
        height={592}>
            <Typography
            variant="h4"
            fontWeight={700}
            marginBottom={2}>
                Attendances
            </Typography>


            <AttendanceList />
        </Box>
    )
}

export default Attendances