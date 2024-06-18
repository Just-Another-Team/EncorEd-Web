import { useEffect, useRef } from 'react'
import { Alert, Avatar, Box, Link, Button, Fade, Grid, IconButton, InputAdornment, Menu, MenuItem, Snackbar, Stack, TextField, Typography } from "@mui/material"
import { useParams } from "react-router-dom";
import { useSubject } from "../../hooks/useSubject";
import IUser, { UserRole } from "../../data/IUser";
import ISchedule from "../../data/ISchedule";
import dayjs, { Dayjs } from "dayjs";
import AttendanceChart from "../../components/AttendanceChart";
import { useAttendances } from "../../hooks/useAttendances";
import RecentlySubmittedAttendance from "./RecentlySubmittedAttendance";
import AttendanceList from "./AttendanceList";
import DeleteDialog from "../../components/DialogDelete";
import SubjectForm from "../Subjects/SubjectForm";
import { useModal } from "../../hooks/useModal";
import useLoading from "../../hooks/useLoading";
import ISubject from "../../data/ISubject";
import { useUsers } from "../../hooks/useUsers";
import { useState } from "react";
import { CalendarMonth, Delete, Download, Settings, Update } from "@mui/icons-material";
import DatePicker from "./DatePicker";
import { getDownloadURL, ref } from "firebase/storage";
import { FirebaseError } from "firebase/app";
import { storage } from "../../app/firebase/config";
import IAttendance from '../../data/IAttendance';
import { AttendanceSubmissionDate } from '../../data/AttendanceSubmissionDate';
import { Link as RouterLink } from 'react-router-dom';
import PrintAttendanceDialog from './PrintAttendanceDialog';
import PrintAttendance from './PrintAttendance';
import AttendanceBarChart from '../UserSelected/AttendanceBarChart';

type SubjectParams = {
    subjectId: string
}

const SelectedSubject = () => {
    const { getCurrentUser } = useUsers()
    const { getAttendancesBySubjectId, getAttendancesByReduction } = useAttendances()
    const { updateSubject, deleteSubject } = useSubject();
    const { getSubject } = useSubject()
    const { subjectId } = useParams<SubjectParams>();

    const divRef = useRef<HTMLDivElement>(null)

    const { 
        openModal: updateModal,
        handleOpenModal: openUpdateModal,
        handleCloseModal: closeUpdateModal
    } = useModal();
    const { 
        openModal: deleteModal,
        handleOpenModal: openDeleteModal,
        handleCloseModal: closeDeleteModal
    } = useModal();
    const { 
        openModal: printModal,
        handleOpenModal: openPrintModal,
        handleCloseModal: closePrintModal
    } = useModal();
    const { 
        openModal: successSnackbar,
        handleOpenModal: openSuccessSnackbar,
        handleCloseModal: closeSuccessSnackbar
    } = useModal();
    const { 
        openModal: errorSnackbar,
        handleOpenModal: openErrorSnackbar,
        handleCloseModal: closeErrorSnackbar
    } = useModal();
    const { loading, openLoading, closeLoading } = useLoading();

    const [ message, setMessage ] = useState<string>();
    const [profilePic, setProfilePic] = useState<string>("/assets/profilepic.png");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [dateRange, setDateRange] = useState<{ startValue: Dayjs | null; endValue: Dayjs | null; }>({
        startValue: dayjs(),
        endValue: null,
    })

    const getProfilePicture = async () => {
        try {
            const image = await getDownloadURL(ref(storage, `${(subject?.USER_ID as IUser).USER_ID}.jpg`)) //(subject?.USER_ID as IUser).USER_ID

            setProfilePic(image)
        } catch (error) {
            if (error instanceof FirebaseError) {
                console.log({
                    message: error.message,
                    code: error.code,
                })
            }
        }
    }

    useEffect(() => {
        getProfilePicture()
    }, [])
    
    const onMainDateChange = (value: dayjs.Dayjs | null) => {
        //If end date is not null and the date selected is equal or beyod end date, then set the end date to null and the start date to the valye
        if (value?.isAfter(dayjs(dateRange.endValue), 'date') || value?.isSame(dayjs(dateRange.endValue), 'date')) {
            setDateRange({ startValue: value, endValue: null })
            return
        }

        setDateRange((dateVal) => ({ ...dateVal, startValue: value }))
    }

    const onMainClick = () => {
         //         setDateRange({
        //             startValue: dayjs(ownerState.day).day(0),
        //             endValue: dayjs(ownerState.day).day(6),
        //         })
    }

    const onSecondDateChange = (value: dayjs.Dayjs | null) => {
        if (value?.isBefore(dayjs(dateRange.startValue), 'date') || value?.isSame(dayjs(dateRange.startValue), 'date')) {
            setDateRange({ startValue: null, endValue: value })
            return
        }

        setDateRange((dateVal) => ({ ...dateVal, endValue: value }))
    }

    const onSecondClick = () => {

    }


    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const updateData = async (data: ISubject) => {
        openLoading();

        // Update function
        await updateSubject({
            ...data as ISubject,
            SUB_ID: subject?.SUB_ID,
            SUB_UPDATEDBY: getCurrentUser()?.USER_ID
        })
            .then((result) => {
                console.log(result.data)
                setMessage(result.data)
                openSuccessSnackbar()
            })
            .catch((error) => {
                console.error(error)
                setMessage(error.response.data)
                openErrorSnackbar()
            })

        closeLoading();
        closeUpdateModal()
    }

    const handleDelete = async () => {
        await deleteSubject(subject?.SUB_ID as string)
            .then((result) => {
                console.log(result.data)
                setMessage(result.data)
                openSuccessSnackbar()

                //Move to subject list
            })
            .catch((error) => {
                console.error(error)
                setMessage(error.response.data)
                openErrorSnackbar()
            })
    }

    const handleOnClickUpdate = () => {
        openUpdateModal();
    }
    
    const handleOnClickDelete = () => {
        openDeleteModal();
    }

    const settings = [
        {
            icon: (<Update color="secondary"/>),
            label: "Update",
            onClick: handleOnClickUpdate,
        },
        {
            icon: (<Delete color="error"/>),
            label: "Delete",
            onClick: handleOnClickDelete
        },
        {
            icon: (<Download color="primary"/>),
            label: "Download",
            onClick: openPrintModal
        },
    ]

    const open = Boolean(anchorEl);

    const role = getCurrentUser()?.ROLE_ID as UserRole

    const subject = getSubject(subjectId!)
    const instructor = subject?.USER_ID as IUser
    const schedule = subject?.SCHED_ID as ISchedule
    const scheduledDays = schedule !== null ? schedule.SCHED_WEEKASSIGNED.reduce((prevValue, curValue) => {
        const currentValue = curValue == "Thursday" ? curValue.substring(0, 2) : curValue.charAt(0)
        return prevValue + currentValue
    }, "") : ""

    const attendances = (role: UserRole) => {
        return getAttendancesByReduction(getAttendancesBySubjectId(subject?.SUB_ID as string))
                .map((attendance) => {
                    return ({
                        ...attendance as IAttendance,
                        ATTD_SUBMISSIONDATE: typeof attendance.ATTD_SUBMISSIONDATE === "string" ? 
                            attendance.ATTD_SUBMISSIONDATE : 
                            (attendance.ATTD_SUBMISSIONDATE as AttendanceSubmissionDate).lastSubmission,
                    })
                })
                .filter(attendance => {
                    const attendanceChecker = attendance.USER_ID as IUser
                    return (
                        (attendance.ATTD_TEACHERSTATUS !== "not-in-room" && attendance.ATTD_TEACHERSTATUS !== "present") && 
                        (role.admin || role.campusDirector ? true : attendanceChecker.USER_CREATEDBY === getCurrentUser()?.USER_ID) && //&& //If attendances are submitted based on the filtered date
                        (dateRange.endValue === null ? dayjs(attendance.ATTD_SUBMISSIONDATE).isSame(dayjs(dateRange.startValue), 'date') : dateRange.startValue === null ? dayjs(attendance.ATTD_SUBMISSIONDATE).isSame(dayjs(dateRange.endValue), 'date') : dayjs(attendance.ATTD_SUBMISSIONDATE).isBetween(dayjs(dateRange.startValue), dayjs(dateRange.endValue), 'dates', "[]"))
                    )
                })
    }

    return (
        <Box>
            <Grid
            container
            spacing={1}>
                <Grid
                item
                xs={12}
                md={8}
                marginBottom={2}>
                    <Typography
                    variant="h4"
                    flex={1}
                    fontWeight={700}>
                        {`${subject?.SUB_EDP_CODE}-${subject?.SUB_CODE} ${subject?.SUB_DESCRIPTION}`}
                    </Typography>
                </Grid>

                <Grid
                item
                xs={12}
                md={4}
                marginBottom={2}>
                    <Box
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"end"}
                    gap={1}>
                        <DatePicker
                        dateRange={dateRange}
                        onMainDateChange={onMainDateChange}
                        onSecondDateChange={onSecondDateChange}
                        direction='right'/>

                        <IconButton
                        onClick={handleClick}
                        color="primary">
                            <Settings />
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>

            <Box
            display={"flex"}
            flexDirection={"row"}
            gap={1}
            bgcolor={"#f4f4f4"}
            padding={2}
            borderRadius={4}
            marginBottom={2}>
                <Box
                flex={1}>
                    <Typography
                    marginBottom={1}
                    variant="body2">
                        Instructor Assigned:
                    </Typography>
                    <Box
                    display={'flex'}
                    alignItems={'center'}
                    gap={2}>
                        <Avatar 
                        src={profilePic}/>
                        { instructor !== null ? (
                            <Link
                            component={RouterLink}
                            underline='none'
                            to={`/${role.admin ? "admin" : role.campusDirector ? "campusDirector" : "dean" }/users/${instructor.USER_ID}`}>
                                <Typography variant="h6">
                                    { instructor.USER_FULLNAME }
                                </Typography>
                            </Link>
                        ) : (
                            <Typography variant="h6">
                                No instructor
                            </Typography>
                        )}
                    </Box>
                </Box>

                <Box
                flex={1}>
                    <Typography variant="body2" marginBottom={1}>Schedule:</Typography>
                    <Typography variant="h6">{ schedule !== null ? `${dayjs(schedule.SCHED_STARTTIME).format("hh:mm A")} - ${dayjs(schedule.SCHED_ENDTIME).format("hh:mm A")} (${scheduledDays})` : ""}</Typography>
                </Box>
            </Box>  

            <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={12} md={6}>
                    <AttendanceChart
                    //title="There were no attendances submitted in this subject"
                    title={`No attendance submitted in this subject ${dateRange.endValue === null ? `in ${dayjs(dateRange.startValue).format("MMMM DD, YYYY")}` : dateRange.startValue === null ? `in ${dayjs(dateRange.endValue).format("MMMM DD, YYYY")}` : `between ${dayjs(dateRange.startValue).format("MMMM DD, YYYY")} - ${dayjs(dateRange.endValue).format("MMMM DD, YYYY")}`}`}
                    attendanceData={attendances(role)}/>
                </Grid>

                <Grid
                item
                xs={12}
                md={6}>
                    <AttendanceBarChart />
                </Grid>
            </Grid>

            <Box
            height={592}>
                <AttendanceList
                attendances={attendances(role)}/>
            </Box>

            <SubjectForm
            loading={loading}
            title={`Update ${subject?.SUB_CODE}`}
            selectedSubject={subject!}
            openModal={updateModal}
            onSubmit={updateData}
            closeModal={closeUpdateModal}/>

            <DeleteDialog
            selectedObject={subject!}
            title={subject?.SUB_DESCRIPTION!}
            onDelete={handleDelete}
            deleteModal={deleteModal}
            closeDeleteModal={closeDeleteModal}
            handleClear={() => {}}/>

            <PrintAttendanceDialog
            ref={divRef}
            date={dateRange}
            onClose={closePrintModal}
            open={printModal}/>

            <Snackbar
            open={successSnackbar}
            autoHideDuration={3000}
            TransitionComponent={Fade}
            onClose={closeSuccessSnackbar}>
                <Alert
                variant="filled"
                severity="success"
                onClose={closeSuccessSnackbar}>
                    { message }
                </Alert>
            </Snackbar>

            <Snackbar
            open={errorSnackbar}
            autoHideDuration={3000}
            TransitionComponent={Fade}
            onClose={closeErrorSnackbar}>
                <Alert
                variant="filled"
                severity="error"
                onClose={closeErrorSnackbar}>
                    { message }
                </Alert>
            </Snackbar>

            <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorReference="anchorEl"
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}>
                {settings.map(setting => (
                    <MenuItem onClick={() => {
                        handleClose();
                        setting.onClick();
                    }}>
                        <Stack direction={"row"} gap={1}>
                            { setting.icon }
                            <Typography>{setting.label}</Typography>
                        </Stack>
                    </MenuItem>
                ))}
                
            </Menu>

            {/* Print Layout here */}
            <PrintAttendance
            subjectId={subject?.SUB_ID as string}
            attendances={attendances(role)}
            ref={divRef}/>
        </Box>
    )
}

export default SelectedSubject