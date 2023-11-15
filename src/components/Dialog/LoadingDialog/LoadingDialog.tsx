import React from 'react'
import { FixMeLater } from '../../../types/FixMeLater'
import {CircularProgress, Dialog, DialogContent, DialogContentText, DialogTitle, Stack} from '@mui/material'

const LoadingDialog = ({open, text}: FixMeLater) => {
    return(
        <Dialog
        open={open}>
            {/* Should have been content */}
            <DialogTitle>Loading</DialogTitle>
            <DialogContent>
                <Stack justifyContent={"center"} alignItems={"center"} padding={2} gap={2}>
                    <CircularProgress />
                    <DialogContentText>
                        {text}
                    </DialogContentText>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}

export default LoadingDialog