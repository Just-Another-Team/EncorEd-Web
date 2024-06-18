import { Box, Button, CircularProgress, FormControl, FormHelperText, FormLabel, Input, PaginationItem, Stack } from "@mui/material"
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
import { useSubject } from "../../hooks/useSubject";
import useDepartment from "../../hooks/useDepartment";
import IUser, { UserRole } from "../../data/IUser";
import { useEffect } from "react";
import ISchedule from "../../data/ISchedule";
import dayjs from "dayjs";

type AddDialogType = {
    openModal: boolean;
    closeModal: () => void
    selectedSubject?: ISubject | undefined;
    loading: boolean;
    title: string;
    onSubmit: (data: ISubject) => void
}

const SubjetForm = ({
    openModal,
    closeModal,
    loading,
    onSubmit,
    title,
    selectedSubject
}: AddDialogType) => {
    const { getTeachers, getUsersByCreator, getCurrentUser } = useUsers();

    const { control, handleSubmit, setValue, reset, watch } = useForm<ISubject>({
        defaultValues: {
            SUB_EDP_CODE: null,
            SUB_CODE: "",
            SUB_DESCRIPTION: "",
            USER_ID: undefined,
            SCHED_ID: undefined,
        }
    });

    const submitHandler = (data: ISubject) => {
        reset()
        onSubmit(data)
    }

    useEffect(() => {
        if (selectedSubject) {
            const instructor = selectedSubject.USER_ID as IUser
            const schedule = selectedSubject.SCHED_ID as ISchedule

            setValue('SUB_EDP_CODE', selectedSubject?.SUB_EDP_CODE)
            setValue('SUB_CODE', selectedSubject?.SUB_CODE)
            setValue('SUB_DESCRIPTION', selectedSubject?.SUB_DESCRIPTION)
            setValue('USER_ID', selectedSubject.USER_ID !== null ? instructor.USER_ID : "")
            setValue('SCHED_ID', schedule)
        }
    }, [selectedSubject])

    const role = getCurrentUser()?.ROLE_ID as UserRole

    const instructors = (instructorArray: Array<IUser>) => {
        return instructorArray.map((el): {label: string; value: string} => ({
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
        maxWidth="md"
        title={title}>
            <DialogMessage.Body>
                { loading ?
                <Stack
                justifyContent={"center"}
                alignItems={"center"}
                padding={9}>
                    <CircularProgress
                    size={"4rem"}/>
                </Stack> :
                <>
                    <Box>
                        <ControlledTextField
                        name="SUB_EDP_CODE"
                        control={control}
                        size="small"
                        fullWidth
                        rules={{
                            required: "Subject EDP Code is required!"
                        }}
                        label="Code"
                        variant="standard"/>

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
                        rules={undefined}
                        fullWidth
                        size="small"
                        variant="standard"
                        options={instructors(role.admin ? getTeachers() : getUsersByCreator(getCurrentUser()?.USER_ID as string).filter(user => (user.ROLE_ID as UserRole).teacher))}/>
                    </Box>

                    <Box>
                        <FormControl
                        fullWidth>
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
                                    required: "Set a starting hour of the subject",
                                }}
                                fullWidth
                                control={control}/>

                                <ArrowForwardOutlined />

                                <TimePickerControlled
                                name="SCHED_ID.SCHED_ENDTIME"
                                label={"End Time"}
                                rules={{
                                    required: "Set an ending hour of the subject",
                                    validate: (value) => {
                                        const endTime = dayjs(value as Date)
                                        const startTime = dayjs(watch('SCHED_ID.SCHED_STARTTIME') as Date)

                                        return endTime.isAfter(startTime) || "Ending hour must be after start hour"
                                    }
                                }}
                                fullWidth
                                control={control}/>
                            </Box>
                        </FormControl>

                        <Week
                        updateWeeks={selectedSubject ? (selectedSubject?.SCHED_ID as ISchedule).SCHED_WEEKASSIGNED : []}
                        name="SCHED_ID.SCHED_WEEKASSIGNED"
                        control={control}
                        setValue={setValue}/>
                    </Box>
                </>}
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

export default SubjetForm