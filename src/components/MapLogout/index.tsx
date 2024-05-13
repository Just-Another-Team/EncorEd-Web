import { Box, Button, CircularProgress, Stack } from "@mui/material"
import DialogMessage from "../DialogMessage"
import ControlledTextField from "../TextFieldControlled/input"
import { useForm } from "react-hook-form"
import { useAuth } from "../../hooks/useAuth"
import useLoading from "../../hooks/useLoading"
import { AuthErrorCodes } from "firebase/auth";
import { FirebaseError } from "firebase/app"

type LogoutType = {
    password: string | null;
}

type MapLogoutType = {
    openModal: boolean
    kioskName: string
    closeLogOutModal: () => void
}

const MapLogout = (props: MapLogoutType) => {
    const { kioskName, openModal, closeLogOutModal } = props

    const { reauthenticate, signOut } = useAuth()
    const { loading, openLoading, closeLoading } = useLoading();

    const { control, handleSubmit, reset, setError } = useForm<LogoutType>({
        defaultValues: {
            password: null
        }
    });

    const logout = async ({ password }: LogoutType) => {
        openLoading();
        await reauthenticate(password!)
            .then(async () => {
                signOut()
                closeLogOutModal()
            })
            .catch((error) => {
                console.error(error)
                if (error instanceof FirebaseError) {
                    if (error.code === AuthErrorCodes.INVALID_PASSWORD) setError('password', { type: "Firebase Auth", message: "Wrong Password" } )
                }
            })
        closeLoading();
    }

    return (
        <DialogMessage
        open={openModal}
        PaperProps={{
            component: 'form',
            onSubmit: handleSubmit(logout),
            onReset: () => {
                reset()
                closeLogOutModal()
            },
        }}
        maxWidth="md"
        title={`Are you sure you want to logout ${kioskName}?`}> {/* selectedObject ? instanceOfSubject(selectedObject) ? (selectedObject as ISubject).SUB_CODE : instanceOfUser(selectedObject) ? (selectedObject as IUser).USER_FULLNAME : instanceOfDepartment(selectedObject as IDepartment) ? (selectedObject as IDepartment).DEPT_NAME : undefined : undefined */}
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
                    <DialogMessage.Text
                    content={`To confirm the logout process. Please enter the password of ${kioskName}.`}/>
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

export default MapLogout