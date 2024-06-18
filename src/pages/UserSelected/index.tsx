import { Alert, Box, Button, Fade, Grid, MenuItem, Select, Snackbar, Stack, Tab, Tabs, Typography } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import { useUsers } from "../../hooks/useUsers"
import IUser, { UserRole } from "../../data/IUser"
import useDepartment from "../../hooks/useDepartment"
import { useSubject } from "../../hooks/useSubject"
import { useEffect, useMemo, useState } from "react"
import AttendanceList from "../SelectedSubject/AttendanceList"
import RecentlySubmittedAttendance from "../SelectedSubject/RecentlySubmittedAttendance"
import AttendanceChart from "../../components/AttendanceChart"
import { useAttendances } from "../../hooks/useAttendances"
import UserForm from "../Users/UserForm"
import DeleteDialog from "../../components/DialogDelete"
import { useModal } from "../../hooks/useModal"
import useLoading from "../../hooks/useLoading"
import { useAuth } from "../../hooks/useAuth"
import { Delete, Update } from "@mui/icons-material"
import { useTheme } from "@emotion/react"
import DatePicker from "../SelectedSubject/DatePicker"
import { getDownloadURL, ref } from "firebase/storage"
import { storage } from "../../app/firebase/config"
import { FirebaseError } from "firebase/app"
import IAttendance from "../../data/IAttendance"
import { AttendanceSubmissionDate } from "../../data/AttendanceSubmissionDate"
import dayjs, { Dayjs } from "dayjs"
import ISubject from "../../data/ISubject"
import DropDown from "../../components/DropDown"
import AttendanceBarChart from "./AttendanceBarChart"
import IDepartment from "../../data/IDepartment"

type UserParams = {
    userId: string
}

const SelectedUser = () => {
    const { getCredentials } = useAuth()

    const { getUser, updateUser, deleteUser, getCurrentUser } = useUsers()
    const { getDepartment } = useDepartment()
    const { getSubjects, getSubject, removeAssignedTeacher } = useSubject()
    const { getAttendancesBySubjectId, getAttendancesByReduction, getAttendancesByInstructor } = useAttendances()

    const { userId } = useParams<UserParams>();

    const navigate = useNavigate()

    const theme = useTheme()

    const role = getCurrentUser()?.ROLE_ID as UserRole

    const selectedUser = getUser(userId!)
    const subjectUserRole = selectedUser?.ROLE_ID as UserRole
    const department = getDepartment(selectedUser?.DEPT_ID as string)
    const subjects = getSubjects().filter(user => user.USER_ID !== null).filter(user => (user.USER_ID as IUser).USER_ID === selectedUser?.USER_ID)
    const subjectTabs: Array<{ label: string; value: string }> = [
        {
            label: "All Subjects",
            value: "all",
        },
        ...subjects.map(subject => ({ //How to filter them in similar SUB_CODE
            label: `(${subject.SUB_EDP_CODE}) ${subject.SUB_DESCRIPTION}`,
            value: subject.SUB_ID!
        }))
    ]

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

    const { loading, openLoading, closeLoading } = useLoading();

    const [profilePic, setProfilePic] = useState<string>("/assets/profilepic.png");
    const [updateSelectedUser, setUpdateSelectedUser ] = useState<IUser>();
    const [message, setMessage] = useState<string>();
    const [value, setValue] = useState<string>("all");
    const [dateRange, setDateRange] = useState<{ startValue: Dayjs | null; endValue: Dayjs | null; }>({
        startValue: dayjs(),
        endValue: null,
    })

    const onMainDateChange = (value: dayjs.Dayjs | null) => {
        //If end date is not null and the date selected is equal or beyod end date, then set the end date to null and the start date to the valye
        // console.log()

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

    const getProfilePicture = async () => {
        try {
            const image = await getDownloadURL(ref(storage, `${userId}.jpg`)) //(subject?.USER_ID as IUser).USER_ID

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

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const handleUpdate = async (userData: IUser) => {
        const data: IUser = {
            USER_ID: selectedUser?.USER_ID,
            USER_FNAME: userData.USER_FNAME,
            USER_LNAME: userData.USER_LNAME,
            USER_MNAME: userData.USER_MNAME,
            USER_EMAIL: userData.USER_EMAIL,
            USER_USERNAME: userData.USER_USERNAME,
            USER_PASSWORD: userData.USER_PASSWORD,
            USER_ATTENDANCECHECKERSCHEDULE: userData.USER_ATTENDANCECHECKERSCHEDULE ? userData.USER_ATTENDANCECHECKERSCHEDULE : null,
            ROLE_ID: {
                campusDirector: userData.ROLE_ID === "campusDirector" ? true : undefined,
                dean: userData.ROLE_ID === "dean" ? true : undefined,
                attendanceChecker: userData.ROLE_ID === "attendanceChecker" ? true : undefined,
                teacher: userData.ROLE_ID === "teacher" ? true : undefined,
            } as UserRole,
            DEPT_ID: userData.DEPT_ID,
            USER_UPDATEDBY: getCurrentUser()?.USER_ID,
            USER_IMAGE: userData.USER_IMAGE,
        }

        openLoading()

        await updateUser(data)
            .then((result) => {
                //Snack bar
                setMessage(result.data)
                openSuccessSnackbar()
                // navigate(`/${role.admin ? "admin" : role.campusDirector ? "campusDirector" : "dean"}/users`)
            })
            .catch((error) => {
                console.error(error)
                setMessage(error.data)
                openErrorSnackbar()
            })
        
        closeLoading()
        closeUpdateModal()
    }

    const handleDelete = async () => {
        const subjectIds = getSubjects().filter(subject => (subject.USER_ID as IUser).USER_ID === selectedUser?.USER_ID).map(subject => subject.SUB_ID as string)

        await removeAssignedTeacher(subjectIds)
            .then(() => deleteUser(selectedUser?.USER_ID!))
            .then((result) => {
                console.log(result.data)
                setMessage(result.data)
                openSuccessSnackbar()

                //move to user list
            })
            .catch((error) => {
                console.error(error.response.data)
                setMessage(error.response.data)
                openErrorSnackbar()
            })
    }

    const handleOnClickUpdate = async () => {
        openLoading()
        openUpdateModal();

        const credentials = await getCredentials(selectedUser?.USER_ID as string)
        const credentialData = credentials.data

        closeLoading()

        setUpdateSelectedUser({
            ...selectedUser!,
            DEPT_ID: department as IDepartment,
            USER_EMAIL: credentialData.email,
        });
    }
    
    const handleOnClickDelete = () => {
        openDeleteModal();
    }
    
    const subject: Array<ISubject> | ISubject | undefined = useMemo(() =>  value === "all" ? subjects : getSubject(value), [value])

    const attendances = (userRole: UserRole) => {
        if (value === "all") {
            return getAttendancesByReduction(getAttendancesByInstructor(userId!))
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
                            (userRole.admin || userRole.campusDirector ? true : attendanceChecker.USER_CREATEDBY === getCurrentUser()?.USER_ID) && 
                            (dateRange.endValue === null ? dayjs(attendance.ATTD_SUBMISSIONDATE).isSame(dayjs(dateRange.startValue), 'date') : dateRange.startValue === null ? dayjs(attendance.ATTD_SUBMISSIONDATE).isSame(dayjs(dateRange.endValue), 'date') : dayjs(attendance.ATTD_SUBMISSIONDATE).isBetween(dayjs(dateRange.startValue), dayjs(dateRange.endValue), 'dates', "[]"))
                        )
                    })
        }

        return getAttendancesByReduction(getAttendancesBySubjectId((subject as ISubject).SUB_ID as string))
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
                        (userRole.admin || userRole.campusDirector ? true : attendanceChecker.USER_CREATEDBY === getCurrentUser()?.USER_ID) && 
                        (dateRange.endValue === null ? dayjs(attendance.ATTD_SUBMISSIONDATE).isSame(dayjs(dateRange.startValue), 'date') : dateRange.startValue === null ? dayjs(attendance.ATTD_SUBMISSIONDATE).isSame(dayjs(dateRange.endValue), 'date') : dayjs(attendance.ATTD_SUBMISSIONDATE).isBetween(dayjs(dateRange.startValue), dayjs(dateRange.endValue), 'dates', "[]"))
                    )
                })
    }

    return (
        <Box>
            <Grid container>
                <Grid
                xs={12}
                lg={2}
                spacing={2}
                marginBottom={2}
                display={'flex'}
                justifyContent={'center'}
                alignContent={'center'}
                alignItems={'center'}>
                    {/* Profile Picture Here */}
                    <Box
                    component="img"
                    sx={{
                        height: 256,
                        width: 256,
                        maxHeight: { xs: 256, lg: 128 },
                        maxWidth: { xs: 256, lg: 128 },
                    }}
                    borderRadius={'50%'}
                    alt="Teacher Profile Picture"
                    src={profilePic}
                    />
                </Grid>

                <Grid xs={12} lg={10}>
                    <Box
                    display={"flex"}
                    flexDirection={"row"}
                    marginBottom={2}>
                        <Typography
                        variant="h4"
                        flex={1}
                        fontWeight={700}>
                            {selectedUser?.USER_FULLNAME}
                        </Typography>

                        <Box
                        display={"flex"}
                        flexDirection={"row"}
                        gap={1}>
                            <Button
                            size="large"
                            color="secondary"
                            onClick={handleOnClickUpdate}
                            variant="outlined"
                            startIcon={<Update />}>
                                Update
                            </Button>

                            <Button
                            size="large"
                            color="error"
                            onClick={handleOnClickDelete}
                            variant="outlined"
                            startIcon={<Delete />}>
                                Delete
                            </Button>
                        </Box>
                    </Box>

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
                            <Typography variant="body2">Department:</Typography>
                            <Typography variant="h6">{ department ? department.DEPT_NAME : "No Department" }</Typography>
                        </Box>

                        <Box
                        flex={1}>
                            <Typography variant="body2">Role:</Typography>
                            <Typography variant="h6">{subjectUserRole.admin ? "Admin" : subjectUserRole.campusDirector ? "Campus Director" : subjectUserRole.dean ? "Dean" : "Teacher" }</Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            
            {subjects.length === 0 ? 
            <Box>
                <Typography>{`${selectedUser?.USER_FULLNAME} does not have any subjects assigned`}</Typography>
            </Box> :
            <Box>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }} marginBottom={1}>
                    <Tabs
                    variant="scrollable"
                    scrollButtons="auto"
                    value={value}
                    onChange={handleChange} >
                        { subjectTabs.map(subjectTab => {
                            return (
                                <Tab
                                value={subjectTab.value}
                                label={subjectTab.label}
                                wrapped/>
                            )
                        }) }
                    </Tabs>
                </Box>

                <Box>
                    <Grid container spacing={2} marginBottom={2}>
                        <Grid item xs={12} md={6}>
                            <DatePicker
                            dateRange={dateRange}
                            onMainDateChange={onMainDateChange}
                            onSecondDateChange={onSecondDateChange}
                            direction='left'/>
                        </Grid>

                        <Grid
                        item
                        xs={12}
                        md={6}
                        display={'flex'}
                        justifyContent={'flex-end'}>
                            <Button
                            variant="contained">
                                Export
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} marginBottom={2}>
                        <Grid item xs={12} md={6}>
                            <AttendanceChart
                            title={`No attendance submitted to instructor in ${value === "all" ? "all subjects" : `(${(subject as ISubject).SUB_EDP_CODE}) ${(subject as ISubject).SUB_DESCRIPTION}` }\n${dateRange.endValue === null ? `in ${dayjs(dateRange.startValue).format("MMMM DD, YYYY")}` : dateRange.startValue === null ? `in ${dayjs(dateRange.endValue).format("MMMM DD, YYYY")}` : `between ${dayjs(dateRange.startValue).format("MMMM DD, YYYY")} - ${dayjs(dateRange.endValue).format("MMMM DD, YYYY")}`}`}
                            attendanceData={attendances(role)}/>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <AttendanceBarChart />
                        </Grid>
                    </Grid>

                    <Box
                    height={592}>
                        <AttendanceList
                        attendances={attendances(role)}
                        tabValue={value}
                        //userId={selectedUser?.USER_ID}
                        // subjectId={subject?.SUB_ID as string}
                        />
                    </Box>
                </Box>
            </Box>}

            <UserForm
            selectedUser={updateSelectedUser}
            loading={loading}
            title={`Update ${selectedUser?.USER_FULLNAME}`}
            onSubmit={handleUpdate}
            openModal={updateModal}
            closeModal={closeUpdateModal}/>

            <DeleteDialog
            selectedObject={selectedUser as IUser}
            title={selectedUser?.USER_FULLNAME as string}
            handleClear={() => {}}
            deleteModal={deleteModal}
            onDelete={handleDelete}
            closeDeleteModal={closeDeleteModal}/>

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
        </Box>
    )
}

export default SelectedUser