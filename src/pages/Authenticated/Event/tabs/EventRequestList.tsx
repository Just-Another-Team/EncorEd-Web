import React from "react";
import { 
    Box,
    Pagination,
    Stack,
} from "@mui/material";
import SubjectEventCard from "../../../../components/Cards/SubjectEventCard";

const EventRequest = () => {

    let itemsLength = 5;
    let size = 5;

    return(
        <>            
            <Stack marginBottom={2} gap={2}>

                {Array.from({length: itemsLength}).slice(0, size).map((el, ind) => (                
                    <SubjectEventCard height={108} src="/assets/SubjectTestPic.png">
                        Title
                    </SubjectEventCard>
                ))}

            </Stack>
            <Stack>
                <Pagination count={Math.ceil(itemsLength / size)}/>
            </Stack>
        </>
    )
}

export default EventRequest