import { Box, Button, CircularProgress, Stack } from "@mui/material";
import DialogMessage from "../../components/DialogMessage";
import ISubject from "../../types/ISubject";
import { useSubject } from "../../hooks/useSubject";
import { useAuth } from "../../hooks/useAuth";
import useLoading from "../../hooks/useLoading";
import ControlledTextField from "../../components/TextFieldControlled/input";
import { useForm } from "react-hook-form";
import { useEffect, useMemo } from "react";
import { FirebaseError } from "firebase/app";
import { AuthErrorCodes } from "firebase/auth";
import IUser from "../../types/IUser";
import ISchedule from "../../types/ISchedule";
import IRoom from "../../types/IRoom";

type UpdateInputs = {
    password: string | null;
} & ISubject

type UpdateSubjectType = {
    subject?: ISubject;
    updateModal: boolean;
    closeUpdateModal: () => void;
}

const UpdateSubject = ({
    subject,
    updateModal,
    closeUpdateModal
}: UpdateSubjectType) => {
    const { reauthenticate } = useAuth()
    const { updateSubject } = useSubject();
    const { loading, openLoading, closeLoading } = useLoading();

    const { control, handleSubmit, reset, setValue, setError } = useForm<UpdateInputs>({
        defaultValues: {
            SUB_ID: undefined,
            SUB_CODE: undefined,
            SUB_DESCRIPTION: undefined,
            USER_ID: undefined, //Drop down
            SCHED_ID: undefined, //A lot of things to work on this
            ROOM_ID: undefined, //Not necessary
            SUB_STATUS: undefined,
            password: null
        }
    });

    useEffect(() => {
        setValue('SUB_ID', subject?.SUB_ID)
        setValue('SUB_CODE', subject?.SUB_CODE!)
        setValue('SUB_DESCRIPTION', subject?.SUB_DESCRIPTION!)
        setValue('USER_ID', subject?.USER_ID as IUser)
        setValue('SCHED_ID', subject?.SCHED_ID as ISchedule)
        setValue('ROOM_ID', subject?.ROOM_ID as IRoom)
        setValue('SUB_STATUS', subject?.SUB_STATUS!)
    }, [subject])

    const updateData = async (data: UpdateInputs) => {
        openLoading();

        await reauthenticate(data.password!)
            .then(() => {
                return updateSubject(data as ISubject)
                    .catch((error) => Promise.reject(error))
            })
            .then(() => {
                console.log("Successfully updated!")
                reset()
                closeUpdateModal()
            })
            .catch((error) => {
                if (error instanceof FirebaseError) {
                    if (error.code === AuthErrorCodes.INVALID_PASSWORD) setError('password', { type: "Firebase Auth", message: "Wrong Password" } )
                }
            })

        closeLoading();
    }

    //Add the Following inputs:
    // - USER_ID
    // - SCHEDULE_ID

    return (
        <DialogMessage
        open={updateModal}
        PaperProps={{
            component: 'form',
            onSubmit: handleSubmit(updateData),
            onReset: () => {
                closeUpdateModal()
                reset()
            },
        }}
        maxWidth="sm"
        title={`Update Subject ${subject?.SUB_CODE}?`}>
            <DialogMessage.Body>
                { loading ?
                <Stack
                justifyContent={"center"}
                alignItems={"center"}
                padding={9}>
                    <CircularProgress
                    size={"4rem"}/>
                </Stack> :
                <Box>
                    <ControlledTextField
                    name="SUB_CODE"
                    control={control}
                    size="small"
                    fullWidth
                    rules={{
                        required: "Subject code is required!"
                    }}
                    label="Code"
                    variant="standard"/>

                    <ControlledTextField
                    name="SUB_DESCRIPTION"
                    control={control}
                    size="small"
                    fullWidth
                    rules={{
                        required: "Subject description is required!"
                    }}
                    label="Desription"
                    variant="standard"/>

                    <ControlledTextField
                    name="password"
                    control={control}
                    size="small"
                    fullWidth
                    rules={{
                        required: "Password is required"
                    }}
                    label="Password"
                    type="password"
                    variant="standard"/>
                </Box> }
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

export default UpdateSubject