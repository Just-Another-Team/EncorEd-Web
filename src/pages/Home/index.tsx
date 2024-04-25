import { Box, Button, Grid, Stack, Typography, useMediaQuery, useTheme } from "@mui/material"
import { PieChart } from "@mui/x-charts"
import AttendanceChart from "./AttendanceChart"
import OngoingSubjects from "./OngoingSubjects"
import { useSubject } from "../../hooks/useSubject"
import { useUsers } from "../../hooks/useUsers"
import { UserRole } from "../../data/IUser"
import { useAttendances } from "../../hooks/useAttendances"

const Home = () => {
    const { getAttendancesByCurrentDay } = useAttendances()
    const { getSubjects } = useSubject()
    const { users } = useUsers()
    //const belowMd =

    const attendanceData = () => {
        const reducedAttendances = getAttendancesByCurrentDay()
        
        const presentValue = reducedAttendances.filter((attd) => attd.ATTD_TEACHERSTATUS === "Present").length
        const earlyDismissalValue = reducedAttendances.filter((attd) => attd.ATTD_TEACHERSTATUS === "Early Dismissal").length
        const lateValue = reducedAttendances.filter((attd) => attd.ATTD_TEACHERSTATUS === "Late").length
        const absentValue = reducedAttendances.filter((attd) => attd.ATTD_TEACHERSTATUS === "Absent").length

        return [
            { value: presentValue, label: 'Present' },
            { value: earlyDismissalValue, label: 'Early Dismissal' },
            { value: lateValue, label: 'Late' },
            { value: absentValue, label: 'Absent' },
        ]
    }

    const theme = useTheme()
    const belowSm = useMediaQuery(theme.breakpoints.down("sm"))

    // TO-DO: Provide another tsx file UNDER HOME and separate by role
    return (
        <Box>
            {/* 
            
            PieChart
            Number of submitted attendances or recent notifications
            Number of Present
            Number of Lates
            Number of Absents

            Ongoing Subjects
            Recently Submitted Attendances

            */}

            <Box
            display='flex'
            flexDirection='row'
            marginBottom={2}>
                <Typography
                variant="h4"
                flex={1}
                fontWeight={700}>
                    Home
                </Typography>
                <Button
                variant="contained">
                    Print Report
                </Button>
            </Box>

            <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={12} lg={6}>
                    <AttendanceChart />
                </Grid>

                {/* Separate in another box */}
                <Grid item xs={12} lg={6}>
                    <Box
                    display={'flex'}
                    flexDirection={'column'}
                    gap={2}
                    height={'100%'}>
                        <Box
                        flex={0.5}
                        display={'flex'}
                        gap={2}>
                            <Box
                            flex={1}
                            display={'flex'}
                            padding={1}
                            paddingX={1.5}
                            border={'2px solid lightblue'}
                            alignItems={'center'}
                            borderRadius={2}>
                                <Typography flex={1} variant="h5" fontWeight={700} lineHeight={1}>Present</Typography>
                                <Typography variant="h6" lineHeight={1} textAlign={"end"}>{ attendanceData().find(attd => attd.label === 'Present')?.value }</Typography>
                            </Box>

                            <Box
                            display={'flex'}
                            flex={1}
                            padding={1}
                            paddingX={1.5}
                            border={'2px solid lightblue'}
                            alignItems={'center'}
                            borderRadius={2}>
                                <Typography flex={1} variant="h5" fontWeight={700} lineHeight={1}>Early Dismissal</Typography>
                                <Typography variant="h5" lineHeight={1} textAlign={"end"}>{ attendanceData().find(attd => attd.label === 'Early Dismissal')?.value }</Typography>
                            </Box>
                        </Box>

                        <Box
                        flex={0.5}
                        display={'flex'}
                        gap={2}>
                            <Box
                            flex={1}
                            display={'flex'}
                            padding={1}
                            paddingX={1.5}
                            border={'2px solid lightblue'}
                            alignItems={'center'}
                            borderRadius={2}>
                                <Typography flex={1} variant="h5" fontWeight={700} lineHeight={1}>Late</Typography>
                                <Typography variant="h6" lineHeight={1} textAlign={"end"}>{ attendanceData().find(attd => attd.label === 'Late')?.value }</Typography>
                            </Box>

                            <Box
                            display={'flex'}
                            flex={1}
                            padding={1}
                            paddingX={1.5}
                            border={'2px solid lightblue'}
                            alignItems={'center'}
                            borderRadius={2}>
                                <Typography flex={1} variant="h5" fontWeight={700} lineHeight={1}>Absent</Typography>
                                <Typography variant="h5" lineHeight={1} textAlign={"end"}>{ attendanceData().find(attd => attd.label === 'Absent')?.value }</Typography>
                            </Box>
                        </Box>

                        <Stack
                        spacing={2}
                        direction={belowSm ? 'column' : 'row'}>
                            <Box
                            flex={1}
                            padding={1}
                            paddingX={1.5}
                            bgcolor={'lightblue'}
                            borderRadius={2}>
                                <Box>
                                    <Typography variant="inherit" fontSize={12} fontStyle={"italic"} lineHeight={1}>Total Number of</Typography>
                                </Box>
                                <Box
                                display={'flex'}>
                                    <Typography flex={1} variant="h5" fontWeight={700} lineHeight={1}>Subjects</Typography>
                                    <Box>
                                        <Typography variant="h6" lineHeight={1} textAlign={"end"}>{ getSubjects().length }</Typography>
                                        <Typography variant="inherit" lineHeight={1} fontSize={12} fontStyle={"italic"}>&nbsp;</Typography>
                                    </Box>
                                </Box>
                            </Box>

                            <Box
                            flex={1}
                            padding={1}
                            paddingX={1.5}
                            bgcolor={'lightblue'}
                            borderRadius={2}>
                                <Box>
                                    <Typography variant="inherit" fontSize={12} fontStyle={"italic"} lineHeight={1}>Total Number of</Typography>
                                </Box>
                                <Box
                                display={'flex'}>
                                    <Typography flex={1} variant="h5" fontWeight={700} lineHeight={1}>Teachers</Typography>
                                    <Box>
                                        <Typography variant="h5" lineHeight={1} textAlign={"end"}>{ users.filter(user => (user.ROLE_ID as UserRole).teacher).length }</Typography>
                                        <Typography variant="inherit" lineHeight={1} fontSize={12} fontStyle={"italic"}>&nbsp;</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Stack>
                    </Box>
                </Grid>
            </Grid>

            <OngoingSubjects />
        </Box>
    )
}

export default Home