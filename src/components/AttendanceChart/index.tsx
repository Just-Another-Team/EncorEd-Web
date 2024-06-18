import { Box, IconButton, Link, Typography } from "@mui/material"
import { BarChart, PieChart } from "@mui/x-charts"
import { useAttendances } from "../../hooks/useAttendances"
import { BarChartOutlined, PieChartOutline } from "@mui/icons-material"
import { useState } from "react"
import dayjs, { Dayjs } from "dayjs"
import IAttendance from "../../data/IAttendance"
import Color from "../../assets/Color"

type AttendanceChartType = {
    barChart?: boolean
    attendanceData: Array<IAttendance>,
    title?: string
    showLabel?: boolean
}

const AttendanceChart = ({
    barChart,
    attendanceData,
    showLabel,
    title = "There no complete attendances submitted today"
}: AttendanceChartType) => {
    //const { attendances, getAttendancesByCurrentDay } = useAttendances()

    // Get Ongoing Subjects
    // - If Admin or CD, show all attendances
    // - If Dean, show attendances that attendance checkers created under a dean

    //const [ date,  ] = useState<Dayjs>();
    const [chart, setChart] = useState<"pie" | "bar">("pie");

    const handleDateRange = () => {

    }
    
    const openPie = () => {
        setChart("pie")
    }

    const openBar = () => {
        setChart("bar")
    }

    const completeAttendanceData = () => {
        const reducedAttendances = attendanceData
        
        const presentValue = reducedAttendances.filter((attd) => attd.ATTD_TEACHERSTATUS === "Present").length
        // const incompletePresent = reducedAttendances.filter((attd) => attd.ATTD_TEACHERSTATUS === "present").length
        const earlyDismissalValue = reducedAttendances.filter((attd) => attd.ATTD_TEACHERSTATUS === "Early Dismissal").length
        const lateValue = reducedAttendances.filter((attd) => attd.ATTD_TEACHERSTATUS === "Late").length
        const absentValue = reducedAttendances.filter((attd) => attd.ATTD_TEACHERSTATUS === "Absent").length
        // const incompleteMissing = reducedAttendances.filter((attd) => attd.ATTD_TEACHERSTATUS === "not-in-room").length

        return [
            { value: presentValue, label: 'Present', color: Color('darkBlue', 400) },
            { value: earlyDismissalValue, label: 'Early Dismissal', color: Color('darkBlue', 300) },
            { value: lateValue, label: 'Late', color: Color('darkBlue', 200) },
            { value: absentValue, label: 'Absent', color: Color('darkBlue', 100) },
            // { value: incompletePresent, label: 'Incomplete (Present)' },
            // { value: incompleteMissing, label: 'Incomplete (Not-in-Room)' },
        ]
    }
    
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
                    { showLabel ? (
                        <>
                            <Typography marginLeft={1} variant="caption">{`as of ${dayjs().format('MMMM DD, YYYY')}`}</Typography>
                        </>
                    ) : undefined }
                    {/* <Link variant="caption" marginLeft={0.5} onClick={handleDateRange} underline="none">{dayjs().format('MMMM DD, YYYY')}</Link> */}
                    {/* Drop down */}
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
            { attendanceData.length === 0 ?
            <Box
            height={320}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}>
                <Typography textAlign={'center'}>{title}</Typography>
            </Box> : 
            chart === "pie" && completeAttendanceData().length !== 0 ?
            <PieChart
            series={[
                {
                    data: completeAttendanceData(),
                },
            ]}
            height={320}

            sx={{
                display: 'block'
            }}/> : 
            barChart || chart === "bar"  ? //&& completeAttendanceData().length !== 0
            <BarChart
            xAxis={[{
                scaleType: 'band',
                data: ['Present', 'Early Dismissal', 'Late', 'Absent']
            }]}
            series={[
                {
                    data: completeAttendanceData().map(attd => attd.value),
                    color: Color('darkBlue', 400)
                },
            ]}
            height={320}
            sx={{
                display: 'block',
            }}/> : undefined}
        </Box>
    )
}

export default AttendanceChart