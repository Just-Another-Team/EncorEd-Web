import React from "react"
import {
    Box,
    Grid,
    Typography
} from '@mui/material'
import SubjectEventCard from "../../../components/Cards/SubjectEventCard"

const MapList = () => {
    return(
        <>
            <Box
            marginBottom={2}>
                <Typography variant="h4" fontWeight={700}>
                    Maps
                </Typography>
            </Box>
            
            <Box
            marginBottom={4}>
                <Typography variant="h5" fontWeight={500} marginBottom={1}>
                    Recently Opened
                </Typography>

                <Grid container spacing={2} >
                    {Array.from({length: 4}).map((el, ind) => (
                        <Grid item xs={3}>
                            {/* <div style={{border: '3px solid blue', minHeight: 128, borderRadius: 8}}>
                                HELLO!?
                            </div> */}
                            <SubjectEventCard src="/assets/SubjectTestPic.png"/>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Box>
                <Typography variant="h5" fontWeight={500} marginBottom={1}>
                    Projects
                </Typography>

                <Grid container spacing={2} >
                    {Array.from({length: 8}).map((el, ind) => (
                        <Grid item xs={3}>
                            {/* <div style={{border: '3px solid blue', minHeight: 128, borderRadius: 8}}>
                                HELLO!?
                            </div> */}
                            <SubjectEventCard src="/assets/SubjectTestPic.png"/>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    )
}

export default MapList