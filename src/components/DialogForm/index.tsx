import { 
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material'

// Within the children node
// It must be a Grid component. See this documentation: https://mui.com/material-ui/react-grid/

// Each Grid Cell must contain input components. Make sure input components
// are wrapped in a Controller component. See https://blog.logrocket.com/using-material-ui-with-react-hook-form/

// Note: Most of the custom input components in this project are all wrapped with the Controller component

type DialogFormType = {
    open: boolean;
    title?: string;
    maxWidth?: "xs" | "sm" | "md" | "lg" | "xl"
    
    onSubmitForm?: (event: React.FormEvent<HTMLFormElement>) => void;
    onClose?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,

    children?: React.ReactNode;
}

const DialogForm = ({
    open,
    title = "Form Title Here",
    maxWidth = "lg",
    onSubmitForm,
    onClose,
    children
}: DialogFormType) => {
    return(
        <Dialog
        open={open}
        maxWidth={maxWidth}
        fullWidth
        PaperProps={{
            component: 'form',
            onSubmit: onSubmitForm,
        }}>
            {/* Should have been content */}
            <DialogTitle>{title}</DialogTitle>

            <DialogContent>
                { children }
            </DialogContent>

            <DialogActions>
                <Button
                onClick={onClose}
                variant='outlined'>
                    Cancel
                </Button>
                <Button
                type="submit"
                variant='contained'>
                    Subscribe
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogForm