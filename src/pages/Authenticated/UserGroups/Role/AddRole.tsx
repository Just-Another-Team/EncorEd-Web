import React, {useEffect} from "react"
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
import { addRole } from "../../../../app/features/role/roleSlice"
import { RoleInput } from "../../../../app/api/encored-role-service"
import { useNavigate } from "react-router-dom"
import LoadingDialog from "../../../../components/Dialog/LoadingDialog/LoadingDialog"

type SwitchInputs = {
    key: string
    label: string
    inputs: Array<RegisterFormInput>
}

{/* NEEDS OPTIMIZATION */}
// IDK About that tho

const AddRole = () => {

    const navigate = useNavigate();

    const dispatch = useAppDispatch()
    const loading = useAppSelector(state => state.role.loading)
    const user = useAppSelector(state => state.authentication.data.email)
    const institution = useAppSelector(state => state.institution.data.name)

    const users = useAppSelector(state => state.users.data.map(user => ({
        label: `${user.firstName} ${user.lastName}`,
        value: user.id
    })))

    //default permission
    const defaultPermission: Permission = {
        viewMap: true,
        addMap: false,
        editMap: false,
        deleteMap: false,
        unlockMap: false,
    
        viewSubject: {
            value: true,
            schedule: false,
            participants: false,
            attendance: false,
            verify: {
                value: false,
                by: "" 
            },
        },
        addSubject: {
            value: false,
            schedule: false,
            participants: false,
            attendance: {
                value: false,
                verifyAttendance: {
                    value: false,
                    by: "" 
                },
            },
            verify: {
                value: false,
                by: "" 
            },
        },
        editSubject: {
            value: false,
            schedule: false,
            participants: false,
            attendance: {
                value: false,
                verifyAttendance: {
                    value: false,
                    by: "" 
                },
            },
            verify: {
                value: false,
                by: "" 
            },
        },
        deleteSubject: {
            value: false,
            schedule: false,
            participants: false,
            attendance: {
                value: false,
                verifyAttendance: {
                    value: false,
                    by: "" 
                },
            },
            verify: {
                value: false,
                by: "" 
            },
        },
    
        viewEvent: {
            value: true,
            schedule: false,
            participants: false,
            attendance: false,
            verify: {
                value: false,
                by: "" 
            },
        },
        addEvent: {
            value: false,
            schedule: false,
            participants: false,
            attendance: {
                value: false,
                verifyAttendance: {
                    value: false,
                    by: "" 
                },
            },
            verify: {
                value: false,
                by: "" 
            },
        },
        editEvent: {
            value: false,
            schedule: false,
            participants: false,
            attendance: {
                value: false,
                verifyAttendance: {
                    value: false,
                    by: "" 
                },
            },
            verify: {
                value: false,
                by: "" 
            },
        },
        deleteEvent: {
            value: false,
            schedule: false,
            participants: false,
            attendance: {
                value: false,
                verifyAttendance: {
                    value: false,
                    by: "" 
                },
            },
            verify: {
                value: false,
                by: "" 
            },
        },
    
        viewUser: true,
        addUser: false,
        editUser: false,
        deleteUser: false,
        verifyUser: {
            value: false,
            by: "" 
        },
    
        viewGroup: true,
        addGroup: false,
        editGroup: false,
        deleteGroup: false,
        verifyGroup: {
            value: false,
            by: "" 
        },
    
        viewRole: true,
        addRole: false,
        editRole: false,
        deleteRole: false,
        verifyRole: {
            value: false,
            by: "" 
        },
    
        viewInstitution: true,
    }

    //default student permission
    const defaultStudentPermission: Permission = {
        viewMap: true,
        addMap: false,
        editMap: false,
        deleteMap: false,
        unlockMap: false,
    
        viewSubject: {
            value: true,
            schedule: true,
            participants: false,
            attendance: false,
            verify: {
                value: false,
                by: "" 
            },
        },
        addSubject: {
            value: false,
            schedule: false,
            participants: false,
            attendance: {
                value: false,
                verifyAttendance: {
                    value: false,
                    by: "" 
                },
            },
            verify: {
                value: false,
                by: "" 
            },
        },
        editSubject: {
            value: false,
            schedule: false,
            participants: false,
            attendance: {
                value: false,
                verifyAttendance: {
                    value: false,
                    by: "" 
                },
            },
            verify: {
                value: false,
                by: "" 
            },
        },
        deleteSubject: {
            value: false,
            schedule: false,
            participants: false,
            attendance: {
                value: false,
                verifyAttendance: {
                    value: false,
                    by: "" 
                },
            },
            verify: {
                value: false,
                by: "" 
            },
        },
    
        viewEvent: {
            value: true,
            schedule: true,
            participants: false,
            attendance: false,
            verify: {
                value: false,
                by: "" 
            },
        },
        addEvent: {
            value: false,
            schedule: false,
            participants: false,
            attendance: {
                value: false,
                verifyAttendance: {
                    value: false,
                    by: "" 
                },
            },
            verify: {
                value: false,
                by: "" 
            },
        },
        editEvent: {
            value: false,
            schedule: false,
            participants: false,
            attendance: {
                value: false,
                verifyAttendance: {
                    value: false,
                    by: "" 
                },
            },
            verify: {
                value: false,
                by: "" 
            },
        },
        deleteEvent: {
            value: false,
            schedule: false,
            participants: false,
            attendance: {
                value: false,
                verifyAttendance: {
                    value: false,
                    by: "" 
                },
            },
            verify: {
                value: false,
                by: "" 
            },
        },
    
        viewUser: true,
        addUser: false,
        editUser: false,
        deleteUser: false,
        verifyUser: {
            value: false,
            by: "" 
        },
    
        viewGroup: true,
        addGroup: false,
        editGroup: false,
        deleteGroup: false,
        verifyGroup: {
            value: false,
            by: "" 
        },
    
        viewRole: true,
        addRole: false,
        editRole: false,
        deleteRole: false,
        verifyRole: {
            value: false,
            by: "" 
        },
    
        viewInstitution: true,
    }

   
    const {handleSubmit, reset, control, setValue, formState: {errors}} = useForm<RoleInput>({
        defaultValues: {
            name: "",
            desc: "",
            type: "",
            permission: defaultPermission,
            institution: institution,
            createdBy: user
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
        {key: "permission.addSubject.verify.value", label: "Requires Verification"},
        {key: "permission.addSubject.verify.by", label: "Verified By", type: "select"},
    ]
    const editSubjectInputs: Array<RegisterFormInput> = [
        {key: "permission.editSubject.value", label: "Details"},
        {key: "permission.editSubject.schedule", label: "Schedule"},
        {key: "permission.editSubject.participants", label: "Participants"},
        {key: "permission.editSubject.attendance.value", label: "Attendance"},
        {key: "permission.editSubject.verify.value", label: "Requires Verification"},
        {key: "permission.editSubject.verify.by", label: "Verified By", type: "select"},
    ]
    const deleteSubjectInputs: Array<RegisterFormInput> = [
        {key: "permission.deleteSubject.value", label: "Details"},
        {key: "permission.deleteSubject.schedule", label: "Schedule"},
        {key: "permission.deleteSubject.participants", label: "Participants"},
        {key: "permission.deleteSubject.attendance.value", label: "Attendance"},
        {key: "permission.deleteSubject.verify.value", label: "Requires Verification"},
        {key: "permission.deleteSubject.verify.by", label: "Verified By", type: "select"},
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
        {key: "permission.addEvent.verify.value", label: "Requires Verification"},
        {key: "permission.addEvent.verify.by", label: "Verified By", type: "select"},
    ]
    const editEventInputs: Array<RegisterFormInput> = [
        {key: "permission.editEvent.value", label: "Details"},
        {key: "permission.editEvent.schedule", label: "Schedule"},
        {key: "permission.editEvent.participants", label: "Participants"},
        {key: "permission.editEvent.attendance.value", label: "Attendance"},
        {key: "permission.editEvent.verify.value", label: "Requires Verification"},
        {key: "permission.editEvent.verify.by", label: "Verified By", type: "select"},
    ]
    const deleteEventInputs: Array<RegisterFormInput> = [
        {key: "permission.deleteEvent.value", label: "Details"},
        {key: "permission.deleteEvent.schedule", label: "Schedule"},
        {key: "permission.deleteEvent.participants", label: "Participants"},
        {key: "permission.deleteEvent.attendance.value", label: "Attendance"},
        {key: "permission.deleteEvent.verify.value", label: "Requires Verification"},
        {key: "permission.deleteEvent.verify.by", label: "Verified By", type: "select"},
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
        {key: "permission.verifyUser.value", label: "Requires Verification"},
        {key: "permission.verifyUser.by", label: "Verified By", type: "select"},
    ]

    const groupInputs: Array<RegisterFormInput> = [
        {key: "permission.viewGroup", label: "View Groups"},
        {key: "permission.addGroup", label: "Add Groups"},
        {key: "permission.editGroup", label: "Edit Groups"},
        {key: "permission.deleteGroup", label: "Delete Groups"},
        {key: "permission.verifyGroup.value", label: "Requires Verification"},
        {key: "permission.verifyGroup.by", label: "Verified By", type: "select"},
    ]

    const roleInputs: Array<RegisterFormInput> = [
        {key: "permission.viewRole", label: "View Roles"},
        {key: "permission.addRole", label: "Add Roles"},
        {key: "permission.editRole", label: "Edit Roles"},
        {key: "permission.deleteRole", label: "Delete Roles"},
        {key: "permission.verifyRole.value", label: "Requires Verification"},
        {key: "permission.verifyRole.by", label: "Verified By", type: "select"},
    ]

    const detailsInput: Array<RegisterFormInput> = [
        {key: "name", label: "Name", type: "text", rules: { required: "Role name is required" }},
        {key: "desc", label: "Description", type: "text", rules: { required: "Role description is required" }, rows: 4},
        {key: "type", label: "Role Type", rules: { required: "Role type is required" }},
    ]

    const options = [
        {label: "", value: ""},
        {label: "Student", value: "student"},
        {label: "Teacher", value: "teacher"},
        {label: "Employee", value: "employee"},
        {label: "Custom", value: "custom"},
    ]

    const handleInput = (data: RoleInput) => {
        console.log(data)
        // dispatch(addRole(data)).unwrap()
        //     .then(() => {
        //         alert("Role added successfully!")
        //         reset();

        //         navigate("/dashboard/list/roles/u/encored")
        //     })
        //     .catch((error) => {
        //         alert(`Error Occured:\n${error.response.data.message}`)
        //     }) 
    }

    return(
        <>
            <Typography variant="h4" color={"#296EB4"} fontWeight={700} className="mb-2">
                ADD ROLE
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
                                formControlProps={{flex: 1}}
                                />
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
                                    <Grid key={el.key} xs={12} md={6} item display={'flex'} alignItems={"center"}>
                                        <FormInputSwitch name={el.key} control={control}/>
                                        <Typography>{el.label}</Typography>
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
                                        <Grid xs={12} item marginTop={ind !== 0 ? 2 : 0}>
                                            <Typography variant="body2" color="#747474" sx={{textDecoration: "underline"}}>{el.label}</Typography>
                                        </Grid>
                                        {el.inputs.map((el, ind) => (
                                            <Grid key={el.key} xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'} marginTop={ind === 4 || ind === 5 ? 2 : 0}>
                                                {
                                                    el.type === "select" ? 
                                                    <>
                                                        <Typography sx={{flex: 0.5}}>{el.label}</Typography>
                                                        <FormInputDropDown name={el.key} control={control} options={users} formControlProps={{flex: 1}} /> 
                                                    </>
                                                     :
                                                    <>
                                                        <FormInputSwitch name={el.key} control={control}/>
                                                        <Typography sx={{flex: 1}}>{el.label}</Typography>
                                                    </>
                                                }
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
                                        <Grid xs={12} item marginTop={ind !== 0 ? 2 : 0}>
                                            <Typography variant="body2" color="#747474" sx={{textDecoration: "underline"}}>{el.label}</Typography>
                                        </Grid>
                                        {el.inputs.map((el, ind) => (
                                            <Grid key={el.key} xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'} marginTop={ind === 4 || ind === 5 ? 2 : 0}>
                                                {
                                                    el.type === "select" ? 
                                                    <>
                                                        <Typography sx={{flex: 0.5}}>{el.label}</Typography>
                                                        <FormInputDropDown name={el.key} control={control} options={users} formControlProps={{flex: 1}} /> 
                                                    </>
                                                     :
                                                    <>
                                                        <FormInputSwitch name={el.key} control={control}/>
                                                        <Typography sx={{flex: 1}}>{el.label}</Typography>
                                                    </>
                                                }
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
                                {userInputs.map((el, ind) => (
                                    <Grid key={el.key} xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'} marginTop={ind === 4 || ind === 5 ? 2 : 0}>
                                        {
                                            el.type === "select" ? 
                                            <>
                                                <Typography sx={{flex: 0.5}}>{el.label}</Typography>
                                                <FormInputDropDown name={el.key} control={control} options={users} formControlProps={{flex: 1}} /> 
                                            </>
                                                :
                                            <>
                                                <FormInputSwitch name={el.key} control={control}/>
                                                <Typography sx={{flex: 1}}>{el.label}</Typography>
                                            </>
                                        }
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
                                {groupInputs.map((el, ind) => (
                                    <Grid key={el.key} xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'} marginTop={ind === 4 || ind === 5 ? 2 : 0}>
                                        {
                                            el.type === "select" ? 
                                            <>
                                                <Typography sx={{flex: 0.5}}>{el.label}</Typography>
                                                <FormInputDropDown name={el.key} control={control} options={users} formControlProps={{flex: 1}} /> 
                                            </>
                                                :
                                            <>
                                                <FormInputSwitch name={el.key} control={control}/>
                                                <Typography sx={{flex: 1}}>{el.label}</Typography>
                                            </>
                                        }
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
                                        {
                                            el.type === "select" ? 
                                            <>
                                                <Typography sx={{flex: 0.5}}>{el.label}</Typography>
                                                <FormInputDropDown name={el.key} control={control} options={users} formControlProps={{flex: 1}} /> 
                                            </>
                                                :
                                            <>
                                                <FormInputSwitch name={el.key} control={control}/>
                                                <Typography sx={{flex: 1}}>{el.label}</Typography>
                                            </>
                                        }
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

            <LoadingDialog open={loading} text={"Please wait until we updated the role. Thank you"}/>
        </>
    )
}

export default AddRole