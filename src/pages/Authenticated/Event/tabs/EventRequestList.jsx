import React from "react";
import { 
    Box,
    Stack,
} from "@mui/material";
import SubjectEventCard from "../../../../components/Cards/SubjectEventCard";

const EventRequest = () => {
    return(
        <>            
            <Stack marginBottom={2} gap={2}>

                {Array.from({length: 8}).map((el, ind) => (
                    // <Box sx={{border: '3px solid green', minHeight: 128, borderRadius: 2}}>
                    //     HELLO!?
                    // </Box>
                
                    <SubjectEventCard height={108} src="/assets/SubjectTestPic.png">
                        Title
                    </SubjectEventCard>
                ))}

            </Stack>
        </>
    )
}

export default EventRequest