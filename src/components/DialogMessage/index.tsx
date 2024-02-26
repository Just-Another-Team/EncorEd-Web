import { 
    Box,
    Button,
    Dialog,
    DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, SxProps, Theme, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';

const CloseButtonStyle: SxProps<Theme> = {
    position: "absolute",
    right: 8,
    top: 8,
    color: (theme) => theme.palette.grey[500]

}

const DialogMessage = () => {
    return (
        <Dialog
        open={true}
        fullWidth
        maxWidth={"xs"}>
            <DialogTitle>
                Hello
            </DialogTitle>
            <IconButton
            sx={CloseButtonStyle}>
                <CloseIcon />
            </IconButton>

            <DialogContent>
                <DialogContentText>
                    World.
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button>OKAY</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogMessage