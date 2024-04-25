import { Box, IconButton, Typography } from "@mui/material"
import { BarChart, PieChart } from "@mui/x-charts"
import { useAttendances } from "../../hooks/useAttendances"
import { BarChartOutlined, PieChartOutline } from "@mui/icons-material"
import { useState } from "react"
import dayjs from "dayjs"

const AttendanceChart = () => {
    const { attendances, getAttendancesByCurrentDay } = useAttendances()

    const [chart, setChart] = useState<"pie" | "bar">("pie");

    const openPie = () => {
        setChart("pie")
    }

    const openBar = () => {
        setChart("bar")
    }

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
    console.log(getAttendancesByCurrentDay().length)
    
    return (
        <Box
        bgcolor={"#f4f4f4"}
        padding={2}
        borderRadius={2}>
            <Box
            display='flex'
            flexDirection={'row'}>
                <Typography
                flex={1}
                variant="h6">
                    Attendance Overview
                    <Typography marginLeft={1} variant="caption">
                        as of {dayjs().format('MMMM DD, YYYY')}
                    </Typography>
                </Typography>
                <IconButton
                onClick={openPie}
                color={ chart === "pie" ? "primary" : "default"}
                size="small">
                    <PieChartOutline />
                </IconButton>
                <IconButton
                onClick={openBar}
                color={ chart === "bar" ? "primary" : "default"}
                size="small">
                    <BarChartOutlined />
                </IconButton>
            </Box>
            { getAttendancesByCurrentDay().length === 0 ?
            <Box
            height={320}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}>
                <Typography>There no complete attendances submitted today</Typography>
            </Box> : 
            chart === "pie" && getAttendancesByCurrentDay().length !== 0 ?
            <PieChart
            series={[
                {
                    data: attendanceData(),
                },
            ]}
            height={320}
            sx={{
                display: 'block'
            }}/> : 
            chart === "bar" && getAttendancesByCurrentDay().length !== 0 ?
            <BarChart
            xAxis={[{
                scaleType: 'band',
                data: ['Present', 'Early Dismissal', 'Late', 'Absent']
            }]}
            series={[
                {data: attendanceData().map(attd => attd.value)},
            ]}
            height={320}
            sx={{
                display: 'block',
            }}/> : undefined}
            {/* <Box
            height={320}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}>
                <Typography>There no complete attendances submitted today</Typography>
            </Box> */}
            {/* { chart === "pie" ?
                <PieChart
                series={[
                    {
                        data: attendanceData(),
                    },
                ]}
                height={320}
                sx={{
                    display: 'block'
                }}/>
            : undefined }
            { chart === "bar" ?
                <BarChart
                xAxis={[{
                    scaleType: 'band',
                    data: ['Present', 'Early Dismissal', 'Late', 'Absent']
                }]}
                series={[
                    {data: attendanceData().map(attd => attd.value)},
                ]}
                height={320}
                sx={{
                    display: 'block',
                }}/>
            : undefined } */}
        </Box>
    )
}

export default AttendanceChart