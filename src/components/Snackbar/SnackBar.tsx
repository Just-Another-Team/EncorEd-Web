import { Alert, Fade, Snackbar, SnackbarCloseReason } from "@mui/material"

type SnackBarCloseType = ((event: Event | React.SyntheticEvent<any, Event>, reason: SnackbarCloseReason) => void)

type AlertCloseType = ((event: React.SyntheticEvent<Element, Event>) => void)

type SnackBarType = {
    severity: "success" | "error",
    message: string | undefined
    open: boolean
    onClose: SnackBarCloseType | AlertCloseType | undefined
}

const SnackBar = (props: SnackBarType) => {

    const { open, message, severity, onClose } = props

    return (
        <Snackbar
        open={open}
        autoHideDuration={3000}
        TransitionComponent={Fade}
        onClose={onClose as SnackBarCloseType}>
            <Alert
            variant="filled"
            severity={severity}
            onClose={onClose as AlertCloseType}>
                { message }
            </Alert>
        </Snackbar>
    )
}

export default SnackBar