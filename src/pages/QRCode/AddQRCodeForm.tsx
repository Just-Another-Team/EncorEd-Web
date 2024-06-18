import { Box, Grid, Stack, Typography, Avatar, IconButton, Button, Paper } from "@mui/material"
import { useForm } from "react-hook-form"
import { QRCodeType } from "../../types/QRCodeType"
import DialogForm from "../../components/DialogForm"
import QRCode from "react-qr-code"
import FormInputDropDown from "../../components/DropDown"
import { useRooms } from "../../hooks/useRooms"
import { useSubject } from "../../hooks/useSubject"
import { useUsers } from "../../hooks/useUsers"
import { UserRole } from "../../data/IUser"
import useDepartment from "../../hooks/useDepartment"
import IFloor from "../../data/IFloor"
import DialogMessage from "../../components/DialogMessage"
import dayjs, { Dayjs } from "dayjs"
import { MouseEventHandler, useEffect, useState } from "react"
import ISchedule from "../../data/ISchedule"
import Color from "../../assets/Color";
import { Close } from "@mui/icons-material";
import ISubject from "../../data/ISubject"

type AddQRCodeFormType = {
    open: boolean;
    onCancel: () => void;
    onSubmit: (data: QRCodeType) => void;
}

type SubjectCardType = {
    subject: ISubject,
    onClose?: MouseEventHandler<HTMLButtonElement>
    onClick?: MouseEventHandler<HTMLDivElement>
    closable?: boolean
    showInstructor?: boolean
}

type BlockerType = {
    showBlocker: boolean
    children?: React.ReactNode
}

type SubjectCardScheduleType = {
    timeRange: string;
    weeks: string;
}

const SubjectCard = (props: SubjectCardType) => {
    const {
        subject,
        onClose,
        onClick,
        closable,
        showInstructor
    } = props

    const { getUser } = useUsers()

    const [hoverElevate, setHoverElevate] = useState<number>(0)

    const MouseEnterHandler = () => {
        setHoverElevate(4)
    }

    const MouseLeaveHandler = () => {
        setHoverElevate(0)
    }

    const subjectName = `${subject.SUB_CODE} ${subject.SUB_DESCRIPTION}`
    const schedule: "No Schedule" | SubjectCardScheduleType = subject.SCHED_ID || subject.SCHED_ID !== null ? {
        timeRange: `${dayjs((subject.SCHED_ID as ISchedule).SCHED_STARTTIME).format("hh:mm A")} - ${dayjs((subject.SCHED_ID as ISchedule).SCHED_ENDTIME).format("hh:mm A")}`,
        weeks: (subject.SCHED_ID as ISchedule).SCHED_WEEKASSIGNED.reduce((prevValue, curValue) => {
            const currentValue = curValue == "Thursday" ? curValue.substring(0, 2) : curValue.charAt(0)
            return prevValue + currentValue
        }, "")
    } : "No Schedule"
    const instructor = getUser(subject.USER_ID as string)

    return (
        <Paper
        elevation={hoverElevate}
        onClick={onClick}
        onMouseEnter={MouseEnterHandler}
        onMouseLeave={MouseLeaveHandler}
        sx={{
            position: 'relative',
            borderRadius: 2,
            bgcolor: Color('primaryBlue', 100),
            paddingX: 2,
            paddingY: 1
        }}
        >
            <IconButton
            size="small"
            onClick={onClose}
            sx={{
                display: closable ? "block" : "none",
                position: 'absolute',
                top: 4,
                right: 4
            }}>
                <Close />
            </IconButton>
            <Grid
            container>
                <Grid item xs={12}>
                    <Typography variant="h6">{ subjectName }</Typography>
                </Grid>
            </Grid>
            <Grid
            container>
                { showInstructor && showInstructor === true ? <Grid
                item
                xs={7}
                display={'flex'}
                flexDirection={'row'}
                alignItems={'center'}
                gap={1}>
                    { instructor || instructor !== null ? (
                        <>
                            <Avatar src="/assets/profilepic.png"/>
                            <Typography variant="body1">{ instructor?.USER_FULLNAME }</Typography>
                        </>
                    ) : (
                        <>
                            <Avatar src="/assets/profilepic.png"/>
                            <Typography variant="body1">No Instructor</Typography>
                        </>
                    )}
                </Grid> : undefined }
                <Grid
                item
                xs={ showInstructor && showInstructor === true ? 5 : 12}
                display={'flex'}
                flexDirection={'row'}
                alignItems={'center'}
                gap={1}>
                    <Typography variant="body1">{typeof schedule === "object" ? `${schedule.timeRange} (${schedule.weeks})` : schedule as string}</Typography>
                </Grid>
            </Grid>
        </Paper>
    )
}

const Blocker = (props: BlockerType) => {
    const { showBlocker, children } = props

    return (
        <Box
        bgcolor={`rgba(209, 209, 209, 0.6)`}
        width={'100%'}
        height={354}
        zIndex={1}
        paddingY={2}
        position={'absolute'}
        display={ showBlocker ? 'flex' : 'none'}
        justifyContent={'center'}
        alignItems={'center'}>
            { children }
        </Box>
    )
}

const AddQRCodeForm = ({
    open,
    onCancel,
    onSubmit,
}: AddQRCodeFormType) => {
    const { control, handleSubmit, setValue, reset, getValues, setError, watch } = useForm<QRCodeType>({
        defaultValues: {
            ROOM_ID: '',
            SUB_ID: '',
        }
    })

    const { getDepartment } = useDepartment()
    const { getCurrentUser } = useUsers()
    const { getClassrooms, getRoom } = useRooms();
    const { getSubjects, getSubject, getSubjectsByRoom } = useSubject();

    useEffect(() => {
        const subjectAssignedToRoom = getSubjects().filter(subject => subject.ROOM_ID === watch('ROOM_ID'))
        setValue('SUB_ID', subjectAssignedToRoom as Array<ISubject>)
    }, [watch('ROOM_ID')])

    const addSubjectToRoomHandler = (data: QRCodeType) => {
        const room = getRoom(watch('ROOM_ID') as string)
        const subject = getSubject(data.SUB_ID as string)

        const subjectSchedules: Array<ISchedule> = getSubjectsByRoom(data.ROOM_ID as string).map(subject => subject.SCHED_ID as ISchedule)
        const subjectSchedule = {
            ...subject?.SCHED_ID as ISchedule,
            SCHED_STARTTIME: dayjs((subject?.SCHED_ID as ISchedule).SCHED_STARTTIME),
            SCHED_ENDTIME: dayjs((subject?.SCHED_ID as ISchedule).SCHED_ENDTIME)
        } as ISchedule

        const subjectInSameDay = subjectSchedules.find(subjectSched => subjectSched.SCHED_WEEKASSIGNED.some(week => subjectSchedule.SCHED_WEEKASSIGNED.includes(week)))

        if (!subjectInSameDay) {
            onSubmit(data)
            reset()
            return
        }
        
        const sameDaySchedule = {
            ...subjectInSameDay,
            SCHED_STARTTIME: dayjs(subjectInSameDay?.SCHED_STARTTIME),
            SCHED_ENDTIME: dayjs(subjectInSameDay?.SCHED_ENDTIME)
        } as ISchedule

        if ((subjectSchedule.SCHED_STARTTIME as Dayjs).isSame(sameDaySchedule.SCHED_STARTTIME, "minute") || (subjectSchedule.SCHED_ENDTIME as Dayjs).isSame(sameDaySchedule.SCHED_ENDTIME, "minute") || (subjectSchedule.SCHED_STARTTIME as Dayjs).isBetween(sameDaySchedule.SCHED_STARTTIME, sameDaySchedule.SCHED_ENDTIME, 'minute', "()") || (subjectSchedule.SCHED_ENDTIME as Dayjs).isBetween(sameDaySchedule.SCHED_STARTTIME, sameDaySchedule.SCHED_ENDTIME, 'minute', "()")) {
            setError('SUB_ID', { message: `${room?.ROOM_NAME} has subjects that will be overlapped by ${subject?.SUB_DESCRIPTION}` }) //set to react-hook-forms validate soon
            return
        }

        onSubmit(data)
        reset()
    }

    const role = getCurrentUser()?.ROLE_ID as UserRole

    const roomInputs = getClassrooms().map((el): { label: string; value: string; } => ({
        label: el.ROOM_NAME,
        value: el.ROOM_ID!,
    }))

    const filteredRoomInputs = getClassrooms().filter(room => {
        return (getDepartment(getCurrentUser()?.DEPT_ID as string)?.DEPT_FLOORSASSIGNED as Array<string>).includes((room.FLR_ID as IFloor).FLR_ID as string)
    }).map((el): { label: string; value: string; } => ({
        label: el.ROOM_NAME,
        value: el.ROOM_ID!,
    }))

    //Select subjects based on the creator
    const subjectInputs = getSubjects().map((el): { label: string; value: string; } => ({
        label: `${el.SUB_DESCRIPTION}${el.SUB_EDP_CODE ? ` (${el.SUB_EDP_CODE})` : ""}`,
        value: el.SUB_ID!,
    }))

    const filteredSubjectInputs = getSubjects().filter(subject => subject.SUB_CREATEDBY === getCurrentUser()?.USER_ID).map((el): { label: string; value: string; } => ({
        label: `${el.SUB_DESCRIPTION}${el.SUB_EDP_CODE ? ` (${el.SUB_EDP_CODE})` : ""}`,
        value: el.SUB_ID!,
    }))

    const noRoomSubjects = getSubjects().filter(subject => subject.ROOM_ID === null)

    const subjectsAssignedToRoom = watch('SUB_ID') as Array<ISubject>

    return(
        <DialogForm
        open={open}
        onSubmitForm={handleSubmit(addSubjectToRoomHandler)}
        onClose={() => {
            reset();
            onCancel();
        }}
        title="Add Room QR Code">
            <Grid
            container
            spacing={2}
            sx={{
                paddingTop: 1
            }}>
                <Grid
                item
                xs={12}>
                    <FormInputDropDown
                    name={"ROOM_ID"}
                    label={"Room"}
                    control={control}
                    rules={{}}
                    fullWidth
                    variant="standard"
                    options={role.admin ? roomInputs : filteredRoomInputs}
                    MenuProps={{
                        sx: { height: 296 }
                    }}/>

                    <FormInputDropDown
                    name={"SUB_ID"}
                    label={"Subject"}
                    control={control}
                    rules={{}}
                    fullWidth
                    variant="standard"
                    options={role.admin ? subjectInputs : filteredSubjectInputs}
                    MenuProps={{
                        sx: { height: 296 }
                    }}/>
                </Grid>
            </Grid>
        </DialogForm>
        // <DialogMessage
        // open={open}
        // maxWidth="lg"
        // PaperProps={{
        //     // component: 'form',
        //     // onSubmit: handleSubmit(submitHandler),
        //     // onReset: () => {
        //     //     closeModal()
        //     //     reset()
        //     // },
        //     sx: {
        //         height: 640
        //     }
        // }}
        // title="Assign Subject to Room">
        //     <DialogMessage.Body>
        //         <Grid
        //         container>
        //             <Grid
        //             paddingTop={1}
        //             item
        //             xs={12}>
        //                 <FormInputDropDown
        //                 name={"ROOM_ID"}
        //                 label={"Room"}
        //                 defaultValue={''}
        //                 control={control}
        //                 rules={{}}
        //                 size="small"
        //                 variant="standard"
        //                 fullWidth
        //                 options={role.admin ? roomInputs : filteredRoomInputs}
        //                 />
        //             </Grid>
        //             <Grid
        //             item
        //             position={'relative'}
        //             xs={12}
        //             md={6}>
        //                 <Typography variant="h6" marginBottom={1}>Unassigned Subjects</Typography>

        //                 <Blocker showBlocker={watch('ROOM_ID') === ""}/>

        //                 <Stack
        //                 paddingY={2}
        //                 overflow={'auto'}
        //                 height={354}
        //                 gap={1}>
        //                     {/* Show subjects that are not assigned to a room */}
        //                     { noRoomSubjects.map((el, ind) => {
        //                         return (
        //                             <SubjectCard
        //                             key={ind}
        //                             subject={el}
        //                             onClick={() => {
        //                                 addSubjectToRoomHandler(el)
        //                             }}/>
        //                         )
        //                     }) }
        //                 </Stack>
        //             </Grid>

        //             <Grid
        //             item
        //             position={'relative'}
        //             xs={12}
        //             height={'inherit'}
        //             md={6}>
        //                 <Typography variant="h6" marginBottom={1}>Assign Subjects</Typography>

        //                 <Blocker
        //                 showBlocker={watch('ROOM_ID') === ""}>
        //                     <Typography
        //                     variant="h6">
        //                         Select a Room First
        //                     </Typography>
        //                 </Blocker>

        //                 <Stack
        //                 paddingY={2}
        //                 overflow={'auto'}
        //                 height={354}
        //                 gap={1}>
        //                     { subjectsAssignedToRoom.map((el, ind) => {
        //                         return (
        //                             <SubjectCard
        //                             key={ind}
        //                             subject={el}/>
        //                         )
        //                     }) }
        //                 </Stack>
        //             </Grid>
        //         </Grid>
        //     </DialogMessage.Body>
        //     <DialogMessage.Footer>
        //         <Button
        //         color="error"
        //         variant="contained"
        //         onClick={() => {
        //             onCancel()
        //             reset()
        //         }}>
        //             CANCEL
        //         </Button>
        //         <Button
        //         type="submit"
        //         variant="contained"
        //         onClick={() => { 
        //             // onSubmit(addedSubjects)
        //         }}>
        //             SUBMIT
        //         </Button>
        //     </DialogMessage.Footer>
        // </DialogMessage>
    )
}

export default AddQRCodeForm