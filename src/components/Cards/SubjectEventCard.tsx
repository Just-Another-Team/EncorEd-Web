import { Box, SxProps, Theme } from "@mui/material";
import React from "react";
import { FixMeLater } from "../../types/FixMeLater";

//Provide a way so that this card can move to another page

type SubjectEventCardType = {
    display?: string;
    src?: string | undefined;
    height?: string | number ;
    children?: React.ReactNode;
    sx?: SxProps<Theme> | undefined;
}

const SubjectEventCard = ({display = 'flex', src, height = 160, children, sx}: SubjectEventCardType) => {
    return (
        <Box
        display={display}
        alignItems={'center'}
        minHeight={height}
        gap={2}
        sx={{
            borderRadius: 2,
            backgroundColor: '#A2D0FE',
            overflow: 'hidden',
            ...sx
        }}>
            {(src !== undefined) && (
                <img style={{height: height, width: children !== undefined ? 'auto' : '100%'}} src={src}/>
            )}
            {children}
        </Box>
    )
}

export default SubjectEventCard