import { 
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material'

type DialogFormType = {
    open: boolean;
    title?: string;
    maxWidth?: "xs" | "sm" | "md" | "lg" | "xl"
    
    onSubmitForm: (event: React.FormEvent<HTMLFormElement>) => void;
    onClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,

    children: React.ReactNode;
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
                <Button onClick={onClose}>Cancel</Button>
                <Button type="submit">Subscribe</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogForm