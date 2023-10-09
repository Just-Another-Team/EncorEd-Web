import { Box } from "@mui/material";
import React from "react";

//Provide a way so that this card can move to another page

const SubjectEventCard = ({src, height = 160, children, sx}) => {
    return (
        <Box
        display={'flex'}
        alignItems={'center'}
        minHeight={height}
        gap={2}
        sx={{
            borderRadius: 2,
            backgroundColor: '#A2D0FE',
            overflow: 'hidden',
            ...sx
        }}>
            {/* /assets/SubjectTestPic.png */}
            {src !== "" && (
                <img style={{height: height, width: children !== undefined ? null : '100%'}} src={src}/>
            )}
            
            {children}
        </Box>
    )
}

export default SubjectEventCard