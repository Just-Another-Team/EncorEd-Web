import { Box, Button, FormControl, FormLabel, PaginationItem } from "@mui/material"
import DialogMessage from "../../components/DialogMessage"
import Week from "./Week";
import { useForm } from "react-hook-form";
import { FixMeLater } from "../../types/FixMeLater";
import TimePickerControlled from "../../components/TimePickerControlled";
import { ArrowForwardOutlined } from "@mui/icons-material";
import ISubject from "../../data/ISubject";
import DropDown from "../../components/DropDown";
import { useUsers } from "../../hooks/useUsers";
import ControlledTextField from "../../components/TextFieldControlled/input";
import ISchedule from "../../data/ISchedule";
import dayjs from "dayjs";
import { useSubject } from "../../hooks/useSubject";
import useDepartment from "../../hooks/useDepartment";
import IUser, { UserRole } from "../../data/IUser";

type AddDialogType = {
    addModal: boolean;
    closeAddModal: () => void
}

const AddDialog = ({
    addModal,
    closeAddModal
}: AddDialogType) => {
    const { getDepartment } = useDepartment()
    const { getTeachers, getUsersByCreator, getCurrentUser } = useUsers();
    const { addSubject } = useSubject();

    const { control, handleSubmit, setValue, reset } = useForm<ISubject>({
        defaultValues: {
            SUB_CODE: "",
            SUB_DESCRIPTION: "",
            USER_ID: undefined,
            SCHED_ID: undefined,
        }
    });

    const addData = async (input: ISubject) => {
        const data: ISubject = {
            SUB_CODE: input.SUB_CODE,
            SUB_DESCRIPTION: input.SUB_DESCRIPTION,
            SCHED_ID: {
                SCHED_STARTTIME: dayjs((input.SCHED_ID as ISchedule).SCHED_STARTTIME).toISOString(),
                SCHED_ENDTIME: dayjs((input.SCHED_ID as ISchedule).SCHED_ENDTIME).toISOString(),
                SCHED_WEEKASSIGNED: (input.SCHED_ID as ISchedule).SCHED_WEEKASSIGNED, 
            },
            USER_ID: input.USER_ID ? input.USER_ID : null,
            SUB_CREATEDBY: getCurrentUser()?.USER_ID,
            SUB_UPDATEDBY: getCurrentUser()?.USER_ID
        }

        //console.log(data)

        await addSubject(data)
            .then(() => {
                console.log("Subject and Schedule is added successfully!")
            })
            .catch((error) => {
                console.error(error)
            })

        closeAddModal()
        reset()
    }

    const role = getCurrentUser()?.ROLE_ID as UserRole

    // const instructors = getTeachers().map((el): {label: string; value: string} => ({
    //     label: el.USER_FULLNAME!,
    //     value: el.USER_ID!
    // }))

    // const filteredInstructors = getUsersByCreator(getCurrentUser()?.USER_ID as string).filter(user => (user.ROLE_ID as UserRole).teacher).map((el): {label: string; value: string} => ({
    //     label: el.USER_FULLNAME!,
    //     value: el.USER_ID!
    // }))

    const instructors = (instructorArray: Array<IUser>) => {
        return instructorArray.map((el): {label: string; value: string} => ({
            label: el.USER_FULLNAME!,
            value: el.USER_ID!
        }))
    }

    return (
        <DialogMessage
        open={addModal}
        PaperProps={{
            component: 'form',
            onSubmit: handleSubmit(addData),
            onReset: () => {
                closeAddModal()
                reset()
            },
        }}
        maxWidth="md"
        title="Add Subject">
            <DialogMessage.Body>
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
                    label="Description"
                    variant="standard"/>
                </Box>

                <Box
                paddingY={1}>
                    <DropDown
                    defaultValue={undefined}
                    label="Instructor"
                    name="USER_ID"
                    control={control}
                    // rules={{
                    //     required: "Choose an instructor."
                    // }}
                    rules={undefined}
                    fullWidth
                    size="small"
                    variant="standard"
                    //options={role.admin ? instructors : filteredInstructors}
                    options={instructors(role.admin ? getTeachers() : getUsersByCreator(getCurrentUser()?.USER_ID as string).filter(user => (user.ROLE_ID as UserRole).teacher))}/>
                </Box>

                <Box>
                    <FormControl fullWidth>
                        <FormLabel component="legend">Schedule</FormLabel>
                        <Box
                        display='flex'
                        paddingY={1}
                        gap={2}
                        alignItems='center'>
                            <TimePickerControlled
                            name="SCHED_ID.SCHED_STARTTIME"
                            label={"Start Time"}
                            rules={{
                                required: "Set a starting hour of the subject"
                            }}
                            control={control}/>

                            <ArrowForwardOutlined />

                            <TimePickerControlled
                            name="SCHED_ID.SCHED_ENDTIME"
                            label={"End Time"}
                            rules={{
                                required: "Set an ending hour of the subject"
                            }}
                            fullWidth
                            control={control}/>
                        </Box>
                    </FormControl>

                    <Week
                    name="SCHED_ID.SCHED_WEEKASSIGNED"
                    control={control}
                    setValue={setValue}/>
                </Box>

                {/* { loading ?
                <Stack
                justifyContent={"center"}
                alignItems={"center"}
                padding={9}>
                    <CircularProgress
                    size={"4rem"}/>
                </Stack> :
                 } */}
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

export default AddDialog