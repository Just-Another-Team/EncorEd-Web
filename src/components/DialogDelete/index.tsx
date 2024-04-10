import { Box, Button, CircularProgress, Stack } from "@mui/material"
import DialogMessage from "../../components/DialogMessage"
import ControlledTextField from "../../components/TextFieldControlled/input"
import useLoading from "../../hooks/useLoading";
import { useForm } from "react-hook-form";
import { useSubject } from "../../hooks/useSubject";
import { FirebaseError } from "firebase/app";
import { AuthErrorCodes } from "firebase/auth";
import { useAuth } from "../../hooks/useAuth";
import ISubject from "../../data/ISubject";
import { AxiosResponse } from "axios";
import IUser from "../../data/IUser";
import IDepartment from "../../data/IDepartment";

type DeleteType = {
    password: string | null;
}

type ObjectType = IUser | ISubject | IDepartment
//User
//Subject
//Department
//Kiosk

type DeleteDialogType = {
    selectedObject: ObjectType
    handleClear: () => void
    onDelete: () => void

    deleteModal: boolean;
    closeDeleteModal: () => void;
}

const DeleteDialog = ({
    selectedObject,
    handleClear,
    onDelete,
    deleteModal,
    closeDeleteModal
}: DeleteDialogType) => {
    const { reauthenticate } = useAuth()
    const { loading, openLoading, closeLoading } = useLoading();

    const { control, handleSubmit, reset, setError } = useForm<DeleteType>({
        defaultValues: {
            password: null
        }
    });

    const deleteData = async ({ password }: DeleteType) => {
        openLoading();
        await reauthenticate(password!)
            .then(async () => {
                await onDelete()
                reset()
                closeDeleteModal()
            })
            .catch((error) => {
                console.error(error)
                if (error instanceof FirebaseError) {
                    if (error.code === AuthErrorCodes.INVALID_PASSWORD) setError('password', { type: "Firebase Auth", message: "Wrong Password" } )
                }
            })
        closeLoading();
    }

    const instanceOfSubject = (object: ObjectType): object is ISubject => {
        return 'SUB_ID' in object
    }

    const instanceOfUser = (object: ObjectType): object is IUser => {
        return 'USER_ID' in object
    }

    const instanceOfDepartment = (object: ObjectType): object is IDepartment => {
        return 'DEPT_ID' in object
    }

    return (
        <DialogMessage
        open={deleteModal}
        PaperProps={{
            component: 'form',
            onSubmit: handleSubmit(deleteData),
            onReset: () => {
                handleClear()
                reset()
                closeDeleteModal()
            },
        }}
        maxWidth="md"
        title={`Are you sure you want to delete ${selectedObject ? instanceOfSubject(selectedObject) ? (selectedObject as ISubject).SUB_CODE : instanceOfUser(selectedObject) ? (selectedObject as IUser).USER_FULLNAME : instanceOfDepartment(selectedObject as IDepartment) ? (selectedObject as IDepartment).DEPT_NAME : undefined : undefined}?`}>
            <DialogMessage.Body>
                { loading ?
                <Stack
                justifyContent={"center"}
                alignItems={"center"}
                padding={2.6}>
                    <CircularProgress
                    size={"4rem"}/>
                </Stack> :
                <Box>
                    <DialogMessage.Text content="To confirm the delete process. Please enter your password."/>
                    <ControlledTextField
                    name="password"
                    control={control}
                    size="small"
                    fullWidth
                    rules={{
                        required: "Password is required"
                    }}
                    margin="dense"
                    label="Password"
                    type="password"
                    variant="standard"/>
                </Box>}
            </DialogMessage.Body>
            <DialogMessage.Footer>
                <Button
                color="error"
                type="reset">
                    CANCEL
                </Button>
                <Button
                type="submit">
                    SUBMIT
                </Button>
            </DialogMessage.Footer>
        </DialogMessage>
    )
}

export default DeleteDialog