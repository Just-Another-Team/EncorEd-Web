import React from "react";
import { 
    Box,
    Grid,
    Stack,
    Typography,
} from "@mui/material";
import SubjectEventCard from "../../../../components/Cards/SubjectEventCard";

const SubjectRequest = () => {
    return(
        <>            
            <Stack marginBottom={2} gap={2}>

                {Array.from({length: 8}).map((el, ind) => (
                    // <Box sx={{border: '3px solid green', minHeight: 128, borderRadius: 2}}>
                    //     HELLO!?
                    // </Box>
                
                    <SubjectEventCard height={108} src="/assets/SubjectTestPic.png">
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography variant="h5" fontWeight={700}>Subject Title {ind + 1}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="p">Original Schedule: </Typography>  
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="p">Requested Schedule: </Typography>  
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="p">Original Room: </Typography>  
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="p">Requested Room: </Typography>  
                            </Grid>
                        </Grid>
                    </SubjectEventCard>
                ))}

            </Stack>
        </>
    )
}

export default SubjectRequest