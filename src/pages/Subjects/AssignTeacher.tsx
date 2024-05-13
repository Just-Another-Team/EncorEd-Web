import { useForm } from "react-hook-form";
import DialogMessage from "../../components/DialogMessage"
import { Box, Button } from "@mui/material";
import ControlledTextField from "../../components/TextFieldControlled/input";
import ISubject from "../../data/ISubject";
import DropDown from "../../components/DropDown";
import { useUsers } from "../../hooks/useUsers";
import IUser, { UserRole } from "../../data/IUser";
import { useSubject } from "../../hooks/useSubject";

type AssignTeacherType = {
    openModal: boolean;
    closeModal: () => void;
    subject: ISubject | undefined
}

const AssignTeacher = ({
    openModal,
    closeModal,
    subject
}: AssignTeacherType) => {

    const { assignTeacherToSubject } = useSubject()
    const { getUsersByCreator, getTeachers, getCurrentUser } = useUsers()

    const { control, handleSubmit, setValue, reset } = useForm<ISubject>({
        defaultValues: {
            USER_ID: undefined,
        }
    });

    const assignTeacherHandler = async (data: ISubject) => {
        console.log("USER_ID: ", data)

        const assignedTeacher: { SUB_ID: string, USER_ID: string} = {
            SUB_ID: subject?.SUB_ID as string,
            USER_ID: data.USER_ID as string
        }

        await assignTeacherToSubject(assignedTeacher)
            .then((result) => {
                console.log(result)
            })
            .catch((error) => {
                console.error(error)
            })

        closeModal()
        reset()
    }

    const role = getCurrentUser()?.ROLE_ID as UserRole

    const teachers = (teacherArray: Array<IUser>): Array<{ label: string, value: string }> => {
        return teacherArray.map((el): {label: string; value: string} => ({
            label: el.USER_FULLNAME!,
            value: el.USER_ID!
        }))
    }

    return (
        <DialogMessage
        open={openModal}
        PaperProps={{
            component: 'form',
            onSubmit: handleSubmit(assignTeacherHandler),
            onReset: () => {
                closeModal()
                reset()
            },
        }}
        maxWidth="sm"
        title={`Assign Instructor to ${subject?.SUB_DESCRIPTION}`}>
            <DialogMessage.Body>
                <Box>
                    <DropDown
                    defaultValue={undefined}
                    label="Instructor"
                    name="USER_ID"
                    control={control}
                    size="small"
                    fullWidth
                    rules={{
                        required: "Please select an instructor"
                    }}
                    variant="standard"
                    options={role.admin ? teachers(getTeachers()) : teachers(getUsersByCreator(getCurrentUser()?.USER_ID as string).filter(user => (user.ROLE_ID as UserRole).teacher))}/>
                </Box>
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

export default AssignTeacher