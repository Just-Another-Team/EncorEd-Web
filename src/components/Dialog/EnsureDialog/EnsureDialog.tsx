import React from 'react'
import { FixMeLater } from '../../../types/FixMeLater'
import {Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack} from '@mui/material'
import { DetailsInput } from '../../../app/features/subject/subjectSlice'

type DialogType = {
    open: boolean
    value?: DetailsInput
    valueType?: string
    handleConfirmation: React.MouseEventHandler<HTMLButtonElement>
    handleClose?: React.MouseEventHandler<HTMLButtonElement> | undefined
}

const EnsureDialog = ({
    open,
    value,
    valueType,
    handleClose,
    handleConfirmation
}: DialogType) => {
    return(
        <Dialog
        open={open}
        //onClose={handleClose}
        component='form'>
            <DialogTitle>Delete {value?.name}?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure want to permanently delete this {valueType}? Doing so will remove the {valueType} completely.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>No</Button>
                <Button onClick={handleConfirmation} color="error">Yes</Button>
            </DialogActions>
        </Dialog>
    )
}

export default EnsureDialog