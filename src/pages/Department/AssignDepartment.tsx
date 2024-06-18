import { useForm } from "react-hook-form";
import DialogMessage from "../../components/DialogMessage"
import { Box, Button } from "@mui/material";
import ISubject from "../../data/ISubject";
import DropDown from "../../components/DropDown";
import { useUsers } from "../../hooks/useUsers";
import IUser, { UserRole } from "../../data/IUser";
import { useSubject } from "../../hooks/useSubject";
import IDepartment from "../../data/IDepartment";
import useDepartment from "../../hooks/useDepartment";

type AssignDepartmentType = {
    openModal: boolean;
    closeModal: () => void;
    department: IDepartment | undefined
    onSubmit: (data: IDepartment) => void
}

const AssignDepartment = ({
    openModal,
    closeModal,
    department,
    onSubmit
}: AssignDepartmentType) => {
    const { getUsersByCreator, getCurrentUser, getDeans } = useUsers()

    const { control, handleSubmit, reset } = useForm<IDepartment>({
        defaultValues: {
            DEPT_DEAN: undefined,
        }
    });

    const submitHandler = (data: IDepartment) => {
        reset()
        onSubmit(data)
    }

    const role = getCurrentUser()?.ROLE_ID as UserRole

    

    const deans = (teacherArray: Array<IUser>): Array<{ label: string, value: string }> => {
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
            onSubmit: handleSubmit(submitHandler),
            onReset: () => {
                closeModal()
                reset()
            },
        }}
        maxWidth="sm"
        title={`Assign Dean to ${department?.DEPT_NAME}`}>
            <DialogMessage.Body>
                <Box>
                    <DropDown
                    defaultValue={undefined}
                    label="Dean"
                    name="DEPT_DEAN"
                    control={control}
                    size="small"
                    fullWidth
                    rules={{
                        required: "Please select a dean"
                    }}
                    variant="standard"
                    options={role.admin ? deans(getDeans().filter(dean => (dean.DEPT_ID as IDepartment).DEPT_ID === department?.DEPT_ID)) : deans(getUsersByCreator(getCurrentUser()?.USER_ID as string).filter(user => user.DEPT_ID !== null).filter(user => (user.DEPT_ID as IDepartment).DEPT_ID === department?.DEPT_ID! && (user.ROLE_ID as UserRole).dean))}/>
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

export default AssignDepartment