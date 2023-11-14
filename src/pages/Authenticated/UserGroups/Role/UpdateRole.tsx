import React from "react"
import {
    Box,
    Button,
    Divider,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    Switch,
    TextField,
    Typography,
    useMediaQuery,
    CircularProgress,
} from '@mui/material'
import {useForm, Controller} from 'react-hook-form'
import FormInputDropDown from "../../../../components/DropDown/FormInputDropDown"
import FormInputTextField from "../../../../components/TextField/FormInputTextField"
import FormInputSwitch from "../../../../components/Switch/FormInputSwitch"
import { useTheme } from "@emotion/react"
import { FixMeLater } from "../../../../types/FixMeLater"
import { Permission } from "../../../../types/RoleTypes/Permission"
import { RegisterFormInput } from "../../../../types/RegisterFormInput"
import { useAppDispatch, useAppSelector } from "../../../../app/encored-store-hooks"
import { addRole, updateRole } from "../../../../app/features/role/roleSlice"
import { RoleInput } from "../../../../app/api/encored-role-service"
import { useNavigate, useParams } from "react-router-dom"
import { Role } from "../../../../app/features/role/authRoleSlice"
import { VerificationPermission } from "../../../../types/RoleTypes/VerificationPermission"
import { AttendancePermissions } from "../../../../types/RoleTypes/AttendancePermission"

type SwitchInputs = {
    key: string
    label: string
    inputs: Array<RegisterFormInput>
}

{/* NEEDS OPTIMIZATION */}

const UpdateRole = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const dispatch = useAppDispatch()
    const loading = useAppSelector(state => state.role.loading)
    const user = useAppSelector(state => state.authentication.data.email)
    const institutionData = useAppSelector(state => state.institution.data)
    const role = useAppSelector(state => state.role.data.find(role => role.id === id) as Role)

    const rolePermissions: Permission = typeof role?.employee !== 'boolean' ? role?.employee as Permission : 
                            typeof role?.teacher !== 'boolean' ? role?.teacher as Permission :
                            typeof role?.student !== 'boolean' ? role?.student  as Permission: 
                            role?.visitor as Permission;

    const defaultPermission: Permission = {
        viewMap: rolePermissions.viewMap,
        addMap: rolePermissions.addMap,
        editMap: rolePermissions.editMap,
        deleteMap: rolePermissions.deleteMap,
        unlockMap: rolePermissions.unlockMap,
    
        viewSubject: {
            value: rolePermissions.viewSubject?.value,
            schedule: rolePermissions.viewSubject?.schedule,
            participants: rolePermissions.viewSubject?.participants,
            attendance: rolePermissions.viewSubject?.attendance,
            verify: {
                value: (rolePermissions.viewSubject?.verify as VerificationPermission).value,
                by: (rolePermissions.viewSubject?.verify as VerificationPermission).by 
            },
        },
        addSubject: {
            value: rolePermissions.addSubject?.value,
            schedule: rolePermissions.addSubject?.schedule,
            participants: rolePermissions.addSubject?.participants,
            attendance: {
                value: (rolePermissions.addSubject?.attendance as AttendancePermissions).value,
                verifyAttendance: {
                    value: (rolePermissions.addSubject?.attendance as AttendancePermissions).verifyAttendance?.value,
                    by: (rolePermissions.addSubject?.attendance as AttendancePermissions).verifyAttendance?.by 
                },
            },
            verify: {
                value: (rolePermissions.addSubject?.verify as VerificationPermission).value,
                by: (rolePermissions.addSubject?.verify as VerificationPermission).by 
            },
        },
        editSubject: {
            value: rolePermissions.editSubject?.value,
            schedule: rolePermissions.editSubject?.schedule,
            participants: rolePermissions.editSubject?.participants,
            attendance: {
                value: (rolePermissions.editSubject?.attendance as AttendancePermissions).value,
                verifyAttendance: {
                    value: (rolePermissions.editSubject?.attendance as AttendancePermissions).verifyAttendance?.value,
                    by: (rolePermissions.editSubject?.attendance as AttendancePermissions).verifyAttendance?.by 
                },
            },
            verify: {
                value: (rolePermissions.editSubject?.verify as VerificationPermission).value,
                by: (rolePermissions.editSubject?.verify as VerificationPermission).by 
            },
        },
        deleteSubject: {
            value: rolePermissions.deleteSubject?.value,
            schedule: rolePermissions.deleteSubject?.schedule,
            participants: rolePermissions.deleteSubject?.participants,
            attendance: {
                value: (rolePermissions.deleteSubject?.attendance as AttendancePermissions).value,
                verifyAttendance: {
                    value: (rolePermissions.deleteSubject?.attendance as AttendancePermissions).verifyAttendance?.value,
                    by: (rolePermissions.deleteSubject?.attendance as AttendancePermissions).verifyAttendance?.by 
                },
            },
            verify: {
                value: (rolePermissions.deleteSubject?.verify as VerificationPermission).value,
                by: (rolePermissions.deleteSubject?.verify as VerificationPermission).by 
            },
        },
    
        viewEvent: {
            value: rolePermissions.viewEvent?.value,
            schedule: rolePermissions.viewEvent?.schedule,
            participants: rolePermissions.viewEvent?.participants,
            attendance: rolePermissions.viewEvent?.attendance,
            verify: {
                value: (rolePermissions.viewEvent?.verify as VerificationPermission).value,
                by: (rolePermissions.viewEvent?.verify as VerificationPermission).by 
            },
        },
        addEvent: {
            value: rolePermissions.addEvent?.value,
            schedule: rolePermissions.addEvent?.schedule,
            participants: rolePermissions.addEvent?.participants,
            attendance: {
                value: (rolePermissions.addEvent?.attendance as AttendancePermissions).value,
                verifyAttendance: {
                    value: (rolePermissions.addEvent?.attendance as AttendancePermissions).verifyAttendance?.value,
                    by: (rolePermissions.addEvent?.attendance as AttendancePermissions).verifyAttendance?.by 
                },
            },
            verify: {
                value: (rolePermissions.addEvent?.verify as VerificationPermission).value,
                by: (rolePermissions.addEvent?.verify as VerificationPermission).by 
            },
        },
        editEvent: {
            value: rolePermissions.editEvent?.value,
            schedule: rolePermissions.editEvent?.schedule,
            participants: rolePermissions.editEvent?.participants,
            attendance: {
                value: (rolePermissions.editEvent?.attendance as AttendancePermissions).value,
                verifyAttendance: {
                    value: (rolePermissions.editEvent?.attendance as AttendancePermissions).verifyAttendance?.value,
                    by: (rolePermissions.editEvent?.attendance as AttendancePermissions).verifyAttendance?.by 
                },
            },
            verify: {
                value: (rolePermissions.editEvent?.verify as VerificationPermission).value,
                by: (rolePermissions.editEvent?.verify as VerificationPermission).by 
            },
        },
        deleteEvent: {
            value: rolePermissions.deleteEvent?.value,
            schedule: rolePermissions.deleteEvent?.schedule,
            participants: rolePermissions.deleteEvent?.participants,
            attendance: {
                value: (rolePermissions.deleteEvent?.attendance as AttendancePermissions).value,
                verifyAttendance: {
                    value: (rolePermissions.deleteEvent?.attendance as AttendancePermissions).verifyAttendance?.value,
                    by: (rolePermissions.deleteEvent?.attendance as AttendancePermissions).verifyAttendance?.by 
                },
            },
            verify: {
                value: (rolePermissions.deleteEvent?.verify as VerificationPermission).value,
                by: (rolePermissions.deleteEvent?.verify as VerificationPermission).by 
            },
        },
    
        viewUser: rolePermissions.viewUser,
        addUser: rolePermissions.addUser,
        editUser: rolePermissions.editUser,
        deleteUser: rolePermissions.deleteUser,
        verifyUser: {
            value: rolePermissions.verifyUser?.value,
            by: rolePermissions.verifyUser?.by 
        },
    
        viewGroup: rolePermissions.viewGroup,
        addGroup: rolePermissions.addGroup,
        editGroup: rolePermissions.editGroup,
        deleteGroup: rolePermissions.deleteGroup,
        verifyGroup: {
            value: rolePermissions.verifyGroup?.value,
            by: rolePermissions.verifyGroup?.by 
        },
    
        viewRole: rolePermissions.viewGroup,
        addRole: rolePermissions.addGroup,
        editRole: rolePermissions.editGroup,
        deleteRole: rolePermissions.deleteGroup,
        verifyRole: {
            value: rolePermissions.verifyRole?.value,
            by: rolePermissions.verifyRole?.by 
        },
    
        viewInstitution: rolePermissions.viewInstitution,
    }

    const {handleSubmit, reset, control, setValue, formState: {errors}} = useForm<RoleInput>({
        defaultValues: {
            name: role.name,
            desc: role.desc,
            type:   typeof role?.employee !== 'boolean' ? "employee" : 
                    typeof role?.teacher !== 'boolean' ? "teacher" :
                    typeof role?.student !== 'boolean' ? "student" : 
                    "visitor",
            permission: defaultPermission,
            institution: institutionData.name,
            updatedBy: user
        }
    })

    const viewSubjectInputs: Array<RegisterFormInput> = [
        {key: "permission.viewSubject.value", label: "Details"},
        {key: "permission.viewSubject.schedule", label: "Schedule"},
        {key: "permission.viewSubject.participants", label: "Participants"},
        {key: "permission.viewSubject.attendance", label: "Attendance"},
    ]
    const addSubjectInputs: Array<RegisterFormInput> = [
        {key: "permission.addSubject.value", label: "Details"},
        {key: "permission.addSubject.schedule", label: "Schedule"},
        {key: "permission.addSubject.participants", label: "Participants"},
        {key: "permission.addSubject.attendance.value", label: "Attendance"},
    ]
    const editSubjectInputs: Array<RegisterFormInput> = [
        {key: "permission.editSubject.value", label: "Details"},
        {key: "permission.editSubject.schedule", label: "Schedule"},
        {key: "permission.editSubject.participants", label: "Participants"},
        {key: "permission.editSubject.attendance.value", label: "Attendance"},
    ]
    const deleteSubjectInputs: Array<RegisterFormInput> = [
        {key: "permission.deleteSubject.value", label: "Details"},
        {key: "permission.deleteSubject.schedule", label: "Schedule"},
        {key: "permission.deleteSubject.participants", label: "Participants"},
        {key: "permission.deleteSubject.attendance.value", label: "Attendance"},
    ]
    const subjectInputs: Array<SwitchInputs> = [
        {key: "view", label: "View", inputs: viewSubjectInputs},
        {key: "add", label: "Add", inputs: addSubjectInputs},
        {key: "edit", label: "Edit", inputs: editSubjectInputs},
        {key: "delete", label: "Delete", inputs: deleteSubjectInputs},
    ]

    const viewEventInputs: Array<RegisterFormInput> = [
        {key: "permission.viewEvent.value", label: "Details"},
        {key: "permission.viewEvent.schedule", label: "Schedule"},
        {key: "permission.viewEvent.participants", label: "Participants"},
        {key: "permission.viewEvent.attendance", label: "Attendance"},
    ]
    const addEventInputs: Array<RegisterFormInput> = [
        {key: "permission.addEvent.value", label: "Details"},
        {key: "permission.addEvent.schedule", label: "Schedule"},
        {key: "permission.addEvent.participants", label: "Participants"},
        {key: "permission.addEvent.attendance.value", label: "Attendance"},
    ]
    const editEventInputs: Array<RegisterFormInput> = [
        {key: "permission.editEvent.value", label: "Details"},
        {key: "permission.editEvent.schedule", label: "Schedule"},
        {key: "permission.editEvent.participants", label: "Participants"},
        {key: "permission.editEvent.attendance.value", label: "Attendance"},
    ]
    const deleteEventInputs: Array<RegisterFormInput> = [
        {key: "permission.deleteEvent.value", label: "Details"},
        {key: "permission.deleteEvent.schedule", label: "Schedule"},
        {key: "permission.deleteEvent.participants", label: "Participants"},
        {key: "permission.deleteEvent.attendance.value", label: "Attendance"},
    ]
    const eventInputs: Array<SwitchInputs> = [
        {key: "view", label: "View", inputs: viewEventInputs},
        {key: "add", label: "Add", inputs: addEventInputs},
        {key: "edit", label: "Edit", inputs: editEventInputs},
        {key: "delete", label: "Delete", inputs: deleteEventInputs},
    ]

    const mapInputs: Array<RegisterFormInput> = [
        {key: "permission.viewMap", label: "View Floor Plan"},
        {key: "permission.addMap", label: "Add Floor Plan"},
        {key: "permission.editMap", label: "Edit Floor Plan"},
        {key: "permission.deleteMap", label: "Delete Floor Plan"},
    ]

    const userInputs: Array<RegisterFormInput> = [
        {key: "permission.viewUser", label: "View Users"},
        {key: "permission.addUser", label: "Add Users"},
        {key: "permission.editUser", label: "Edit Users"},
        {key: "permission.deleteUser", label: "Delete Users"},
    ]

    const groupInputs: Array<RegisterFormInput> = [
        {key: "permission.viewGroup", label: "View Groups"},
        {key: "permission.addGroup", label: "Add Groups"},
        {key: "permission.editGroup", label: "Edit Groups"},
        {key: "permission.deleteGroup", label: "Delete Groups"},
    ]

    const roleInputs: Array<RegisterFormInput> = [
        {key: "permission.viewRole", label: "View Roles"},
        {key: "permission.addRole", label: "Add Roles"},
        {key: "permission.editRole", label: "Edit Roles"},
        {key: "permission.deleteRole", label: "Delete Roles"},
    ]

    const detailsInput: Array<RegisterFormInput> = [
        {key: "name", label: "Name", type: "text", rules: { required: "Role name is required" }},
        {key: "desc", label: "Description", type: "text", rules: { required: "Role description is required" }, rows: 4},
        {key: "type", label: "Role Type", rules: { required: "Role type is required" }},
    ]

    const options = [
        //{label: "Admin", value: "admin"},
        {label: "Employee", value: "employee"},
        {label: "Teacher", value: "teacher"},
        {label: "Student", value: "student"},
        {label: "Visitor", value: "visitor"},
    ]

    const handleInput = (data: RoleInput) => {
        dispatch(updateRole({roleId: id!, roleInput: data})).unwrap()
            .then(() => {
                alert("Role Updated successfully!")
                reset();

                navigate("/dashboard/list/roles/u/encored")
            })
            .catch((error) => {
                alert(`Error Occured:\n${error.response.data.message}`)
            })
    }

    return(
        <>
            <Typography variant="h4" color={"#296EB4"} fontWeight={700} className="mb-2">
                UPDATE ROLE
            </Typography>

            <Box onSubmit={handleSubmit(handleInput)} component="form">
                <Grid container>
                    <Grid xs={12} item className="mb-1">
                        <Typography variant="h6" color={"#296EB4"} fontWeight={700}>Details</Typography>
                    </Grid>
                    {detailsInput.map(el => (
                        el.key !== "type" ?
                        <Grid key={el.key} xs={12} item className="mb-3">
                            <Typography variant={"body1"} className="mb-1">{el.label}</Typography>
                            <FormInputTextField fullWidth name={el.key} rules={el.rules} control={control} rows={el.rows}/>
                        </Grid> :
                        <Grid key={el.key} xs={12} item className="mb-3">
                            <Stack direction="row" alignItems="center">
                                <Typography
                                variant={"body1"}
                                className="mb-1"
                                flex={1}>
                                    {el.label}
                                </Typography>

                                <FormInputDropDown
                                name={el.key}
                                defaultValue=""
                                label={"Choose a role type"}
                                control={control}
                                options={options}
                                rules={el.rules}
                                formControlProps={{flex: 1}}/>
                            </Stack>
                        </Grid>
                    ))}
                </Grid>

                <Grid container>
                    <Grid xs={12} item className="mb-1">
                        <Typography variant="h6" color={"#296EB4"} fontWeight={700}>Permissions</Typography>
                    </Grid>

                    {/* Map */}
                    <Grid item xs={12}>
                        <Box display={'flex'} padding={2}>
                            <Typography flex={0.5} variant="h6" color={"#4D4D4D"} fontWeight={300} marginBottom={2}>Map</Typography>
                            <Grid flex={1} container>
                                {mapInputs.map(el => (
                                    <Grid key={el.key} xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                        <Typography>{el.label}</Typography>
                                        <FormInputSwitch name={el.key} control={control}/>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                        <Divider />
                    </Grid>

                    {/* Subject */}
                    <Grid item xs={12}>
                        <Box display={'flex'} padding={2}>
                            <Typography flex={0.5} variant="h6" color={"#4D4D4D"} fontWeight={300} marginBottom={2}>Subject</Typography>

                            <Grid flex={1} container>
                                {subjectInputs.map((el, ind) => (
                                    <>
                                        <Grid key={el.key} xs={12} item marginTop={ind !== 0 ? 2 : 0}>
                                            <Typography variant="body2" color="#747474" sx={{textDecoration: "underline"}}>{el.label}</Typography>
                                        </Grid>
                                        {el.inputs.map(el => (
                                            <Grid key={el.key} xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                                <Typography>{el.label}</Typography>
                                                <FormInputSwitch name={el.key} control={control}/>
                                            </Grid>
                                        ))}
                                    </>
                                ))}
                            </Grid>

                        </Box>
                        <Divider />
                    </Grid>

                    {/* Event */}
                    <Grid item xs={12}>
                        <Box display={'flex'} padding={2}>
                            <Typography flex={0.5} variant="h6" color={"#4D4D4D"} fontWeight={300} marginBottom={2}>Event</Typography>

                            <Grid flex={1} container>
                                {eventInputs.map((el, ind) => (
                                    <>
                                        <Grid key={el.key} xs={12} item marginTop={ind !== 0 ? 2 : 0}>
                                            <Typography variant="body2" color="#747474" sx={{textDecoration: "underline"}}>{el.label}</Typography>
                                        </Grid>
                                        {el.inputs.map(el => (
                                            <Grid key={el.key} xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                                <Typography>{el.label}</Typography>
                                                <FormInputSwitch name={el.key} control={control}/>
                                            </Grid>
                                        ))}
                                    </>
                                ))}
                            </Grid>

                        </Box>
                        <Divider />
                    </Grid>

                    {/* User */}
                    <Grid item xs={12}>
                        <Box display={'flex'} padding={2}>
                            <Typography flex={0.5} variant="h6" color={"#4D4D4D"} fontWeight={300} marginBottom={2}>User</Typography>
                            <Grid flex={1} container>
                                {userInputs.map(el => (
                                    <Grid key={el.key} xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                        <Typography>{el.label}</Typography>
                                        <FormInputSwitch name={el.key} control={control}/>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                        <Divider />
                    </Grid>

                    {/* Group */}
                    <Grid item xs={12}>
                        <Box display={'flex'} padding={2}>
                            <Typography flex={0.5} variant="h6" color={"#4D4D4D"} fontWeight={300} marginBottom={2}>Groups</Typography>
                            <Grid flex={1} container>
                                {groupInputs.map(el => (
                                    <Grid key={el.key} xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                        <Typography>{el.label}</Typography>
                                        <FormInputSwitch name={el.key} control={control}/>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                        <Divider />
                    </Grid>

                    {/* Roles */}
                    <Grid item xs={12}>
                        <Box display={'flex'} padding={2}>
                            <Typography flex={0.5} variant="h6" color={"#4D4D4D"} fontWeight={300} marginBottom={2}>Roles</Typography>
                            <Grid flex={1} container>
                                {roleInputs.map(el => (
                                    <Grid key={el.key} xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                        <Typography>{el.label}</Typography>
                                        <FormInputSwitch name={el.key} control={control}/>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                        <Divider />
                    </Grid>
                </Grid>

                <Grid display={"flex"} gap={2} flexDirection={"row-reverse"} item xs={12} marginTop={4}>
                    <Button disabled={loading} variant="contained" type="submit">
                        {loading ? <CircularProgress size={26}/> : "SUBMIT"}
                    </Button>
                    <Button disabled={loading} variant="outlined" type="button" color="error" onClick={() => {navigate(-1)}}>
                        {loading ? <CircularProgress size={26}/> : "Cancel"}
                    </Button>
                </Grid>
            </Box>
        </>
    )
}

export default UpdateRole