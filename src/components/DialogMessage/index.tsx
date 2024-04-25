import { 
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogProps,
    DialogTitle,
    IconButton,
    SxProps,
    Theme,
    Typography
} from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import React from "react";

const CloseButtonStyle: SxProps<Theme> = {
    position: "absolute",
    right: 8,
    top: 8,
    color: (theme) => theme.palette.grey[500]
}

type DialogMessageType = {
    title: string;
    children: React.ReactNode
} & DialogProps

type DialogContentType = {
    children?: React.ReactNode;
    content?: string | null;
}

const DialogMessage = (props: DialogMessageType) => {
    return (
        <Dialog
        fullWidth
        {...props as DialogProps}>
            <DialogTitle>
                { props.title }
            </DialogTitle>

            { props.children }
        </Dialog>
    )
}

const Body = ({ children }: DialogContentType) => {
    return (
        <DialogContent>
            { children }
        </DialogContent>
    )
}

const Text = ({ content }: DialogContentType) => {
    return (
        <DialogContentText>
            { content }
        </DialogContentText>
    )
}

const Footer = ({ children }: DialogContentType) => {
    return (
        <DialogActions>
            { children }
        </DialogActions>
    )
}

DialogMessage.Body = Body
DialogMessage.Text = Text
DialogMessage.Footer = Footer

export default DialogMessage