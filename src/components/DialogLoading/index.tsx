import React from 'react'
import { FixMeLater } from '../../types/FixMeLater'
import {CircularProgress, Dialog, DialogContent, DialogContentText, DialogTitle, Stack} from '@mui/material'

type LoadingDialogType = {
    open: boolean;
    text: string;
}

const LoadingDialog = ({
    open,
    text
}: LoadingDialogType) => {
    return(
        <Dialog
        open={open}
        maxWidth="sm"
        fullWidth>
            {/* Should have been content */}
            <DialogTitle>Loading</DialogTitle>
            <DialogContent>
                <Stack
                justifyContent={"center"}
                alignItems={"center"}>
                    <CircularProgress
                    size={"4rem"}/>
                </Stack>
                <DialogContentText
                textAlign={'center'}
                marginTop={2}>
                    {text}
                </DialogContentText>
            </DialogContent>
        </Dialog>
    )
}

export default LoadingDialog