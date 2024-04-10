import { Box, Typography } from "@mui/material"
import { PieChart } from "@mui/x-charts"

const Home = () => {

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

            <Box>
                <Box border={'1px solid black'}>
                    <PieChart
                    series={[
                        {
                            data: [
                                { id: 0, value: 10, label: 'series A' },
                                { id: 1, value: 15, label: 'series B' },
                                { id: 2, value: 20, label: 'series C' },
                            ],
                        },
                    ]}
                    margin={{
                        top: 48,
                        bottom: 48,
                        left: 24,
                        right: 132,
                    }}
                    height={480}/>
                </Box>

                <Box border={'1px solid black'}>
                    <Typography>Number of Attendances or Recent Notifications</Typography>
                </Box>

                <Box border={'1px solid black'}>
                    <Typography>Number of Present</Typography>
                </Box>

                <Box border={'1px solid black'}>
                    <Typography>Number of Lates</Typography>
                </Box>

                <Box border={'1px solid black'}>
                    <Typography>Number of Absents</Typography>
                </Box>
            </Box>


        </Box>
    )
}

export default Home