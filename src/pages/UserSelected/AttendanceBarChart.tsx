import { BarChartOutlined } from "@mui/icons-material"
import { Box, IconButton, Typography } from "@mui/material"
import { BarChart } from '@mui/x-charts'
import Color from "../../assets/Color"

const AttendanceBarChart = () => {

    const dataset = [
        {
          present: 59,
          earlyDismissal: 57,
          late: 86,
          absent: 21,
          month: 'Jan',
        },
        {
          present: 50,
          earlyDismissal: 52,
          late: 78,
          absent: 28,
          month: 'Feb',
        },
        {
          present: 47,
          earlyDismissal: 53,
          late: 106,
          absent: 41,
          month: 'Mar',
        },
        {
          present: 54,
          earlyDismissal: 56,
          late: 92,
          absent: 73,
          month: 'Apr',
        },
        {
          present: 57,
          earlyDismissal: 69,
          late: 92,
          absent: 99,
          month: 'May',
        },
    ];

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
                    Current Semester
                </Typography>
            </Box>
            <BarChart
            dataset={dataset}
            xAxis={[{
                scaleType: 'band',
                dataKey: 'month'
            }]}
            series={[
                {
                    dataKey: 'present',
                    label: "Present",
                    color: Color('darkBlue', 400)
                },
                {
                    dataKey: 'earlyDismissal',
                    label: "Early Dismissal",
                    color: Color('darkBlue', 300)
                },
                {
                    dataKey: 'late',
                    label: "Late",
                    color: Color('darkBlue', 200)
                },
                {
                    dataKey: 'absent',
                    label: "Absent",
                    color: Color('darkBlue', 100)
                },
            ]}
            height={320}
            sx={{
                display: 'block',
            }}/>
        </Box>
    )
}

export default AttendanceBarChart