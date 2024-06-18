import { useForm } from "react-hook-form";
import DialogMessage from "../../components/DialogMessage"
import { Box, Button } from "@mui/material";
import ControlledTextField from "../../components/TextFieldControlled/input";
import ISubject from "../../data/ISubject";
import DropDown from "../../components/DropDown";
import { useUsers } from "../../hooks/useUsers";
import IUser, { UserRole } from "../../data/IUser";
import { useSubject } from "../../hooks/useSubject";
import ISchedule from "../../data/ISchedule";
import dayjs, { Dayjs } from "dayjs";
import isBetweenDates from 'dayjs/plugin/isBetween'

dayjs.extend(isBetweenDates)

type AssignTeacherType = {
    openModal: boolean;
    closeModal: () => void;
    subject: ISubject | undefined
    onSubmit: (data: ISubject) => void
}

const AssignTeacher = ({
    openModal,
    closeModal,
    subject,
    onSubmit
}: AssignTeacherType) => {

    const { getSubjects } = useSubject()
    const { getUsersByCreator, getTeachers, getCurrentUser } = useUsers()

    const { control, handleSubmit, setValue, reset, setError } = useForm<ISubject>({
        defaultValues: {
            USER_ID: undefined,
        }
    });

    // const assignTeacherHandler = async (data: ISubject) => {
    //     const assignedTeacher: { SUB_ID: string, USER_ID: string} = {
    //         SUB_ID: subject?.SUB_ID as string,
    //         USER_ID: data.USER_ID as string
    //     }

    //     await assignTeacherToSubject(assignedTeacher)
    //         .then((result) => {
    //             console.log(result)
    //         })
    //         .catch((error) => {
    //             console.error(error)
    //         })

    //     closeModal()
    //     reset()
    // }

    const submitHandler = (data: ISubject) => {
        //Get user ID, show how many 
        const subjectSchedules = getSubjects().filter(subject => subject.USER_ID !== null).filter(subject => (subject.USER_ID as IUser).USER_ID === data.USER_ID)//.map(subject => subject.SCHED_ID as ISchedule)
        const subjectSchedule = {
            ...subject?.SCHED_ID as ISchedule,
            SCHED_STARTTIME: dayjs((subject?.SCHED_ID as ISchedule).SCHED_STARTTIME),
            SCHED_ENDTIME: dayjs((subject?.SCHED_ID as ISchedule).SCHED_ENDTIME)
        } as ISchedule

        //console.log(subjectSchedule, subjectSchedules)
        // console.log(subjectSchedule.SCHED_WEEKASSIGNED, subjectSchedules.map(subjectSchedule => (subjectSchedule.SCHED_ID as ISchedule).SCHED_WEEKASSIGNED), subjectSchedules.find(subjectSched => (subjectSched.SCHED_ID as ISchedule).SCHED_WEEKASSIGNED.some(week => subjectSchedule.SCHED_WEEKASSIGNED.includes(week))))
        
        //Get start time and end time of selected subject
        //Get start time and end time of subjects assigned to Teacher

        //Check if the selected subject is included in one of the weeks in the subjectsAssignedToTeacher
        const subjectInSameDay = subjectSchedules.find(subjectSched => (subjectSched.SCHED_ID as ISchedule).SCHED_WEEKASSIGNED.some(week => subjectSchedule.SCHED_WEEKASSIGNED.includes(week)))

        if (!subjectInSameDay) {
            onSubmit(data)
            reset()
            return
        }

        //If start time of selected subject is within the start time and end time of subjects assigned to teacher OR
        //If end time of selected subject is within the start time and end time of subjects assigned to teacher
        //Then show an error where the selected subject will overlap to other subjects assigned to teacher OR
        //Filter a list of teachers
        
        const sameDaySchedule = {
            ...subjectInSameDay?.SCHED_ID as ISchedule,
            SCHED_STARTTIME: dayjs((subjectInSameDay?.SCHED_ID as ISchedule).SCHED_STARTTIME),
            SCHED_ENDTIME: dayjs((subjectInSameDay?.SCHED_ID as ISchedule).SCHED_ENDTIME)
        } as ISchedule

        if ((subjectSchedule.SCHED_STARTTIME as Dayjs).isSame(sameDaySchedule.SCHED_STARTTIME, "minute") || (subjectSchedule.SCHED_ENDTIME as Dayjs).isSame(sameDaySchedule.SCHED_ENDTIME, "minute") || (subjectSchedule.SCHED_STARTTIME as Dayjs).isBetween(sameDaySchedule.SCHED_STARTTIME, sameDaySchedule.SCHED_ENDTIME, 'minute', "()") || (subjectSchedule.SCHED_ENDTIME as Dayjs).isBetween(sameDaySchedule.SCHED_STARTTIME, sameDaySchedule.SCHED_ENDTIME, 'minute', "()")) {
            setError('USER_ID', { message: `Teacher has subjects that will be overlapped by ${subject?.SUB_DESCRIPTION}` }) //set to react-hook-forms validate soon
            return
        }

        onSubmit(data)
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
            onSubmit: handleSubmit(submitHandler),
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