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
} from '@mui/material'
import {useForm, Controller} from 'react-hook-form'
import FormInputDropDown from "../../../../components/DropDown/FormInputDropDown"
// import FormInputTextField from "../../../../components/TextField/FormInputTextField"
import FormInputSwitch from "../../../../components/Switch/FormInputSwitch"
import { useTheme } from "@emotion/react"
import { FixMeLater } from "../../../../types/FixMeLater"

const AddRole = () => {

    const theme = useTheme();
    // const browserMd = useMediaQuery(theme.);
    // const browserSm = useMediaQuery(theme.breakpoints.down('sm'));

    const {handleSubmit, reset, control, setValue, formState: {errors}} = useForm({
        defaultValues: {
            name: null,
            desc: null,
            roleType: null,
            maps: {
                view: false,
                add: false,
                update: false,
                delete: false,
            },
            subject: {
                view: {
                    details: false,
                    schedule: false,
                    participants: false,
                    attendances: false
                },
                add: {
                    details: false,
                    schedule: false,
                    participants: false,
                    attendances: false,
                    verify: {
                        value: false,
                        by: null,
                    },
                },
                update: {
                    details: false,
                    schedule: false,
                    participants: false,
                    attendances: false,
                    verify: {
                        value: false,
                        by: null,
                    },
                },
                delete: {
                    details: false,
                    schedule: false,
                    participants: false,
                    attendances: false,
                    verify: {
                        value: false,
                        by: null,
                    },
                }
            },
            event: {
                view: {
                    details: false,
                    schedule: false,
                    participants: false,
                    attendances: false
                },
                add: {
                    details: false,
                    schedule: false,
                    participants: false,
                    attendances: false,
                    verify: {
                        value: false,
                        by: null,
                    },
                },
                update: {
                    details: false,
                    schedule: false,
                    participants: false,
                    attendances: false,
                    verify: {
                        value: false,
                        by: null,
                    },
                },
                delete: {
                    details: false,
                    schedule: false,
                    participants: false,
                    attendances: false,
                    verify: {
                        value: false,
                        by: null,
                    },
                }
            },
            users: {
                view: false,
                add: false,
                update: false,
                delete: false,
                verify: {
                    value: false,
                    by: null
                }
            },
            groups: {
                view: false,
                add: false,
                update: false,
                delete: false,
                verify: {
                    value: false,
                    by: null
                }
            },
            roles: {
                view: false,
                add: false,
                update: false,
                delete: false,
                verify: {
                    value: false,
                    by: null
                }
            },
        }
    })

    const options = [
        {label: "Admin", value: "admin"},
        {label: "Employee", value: "employee"},
        {label: "Teacher", value: "teacher"},
        {label: "Student", value: "student"},
        {label: "Visitor", value: "visitor"},
    ]

    const handleInput = (data: FixMeLater) => {
        console.log(data)
    }

    return(
        <>
            <Typography variant="h4" color={"#296EB4"} fontWeight={700} className="mb-2">
                ADD ROLE
            </Typography>

            <Box onSubmit={handleSubmit(handleInput)} component="form">
                {/* Details */}
                <Grid xs={12} lg={8} container>
                    
                    <Grid xs={12} item className="mb-1">
                        <Typography variant="h6" color={"#296EB4"} fontWeight={700}>Details</Typography>
                    </Grid>

                    <Grid xs={12} item className="mb-3">
                        <Typography variant={"body1"} className="mb-1">Name</Typography>
                        {/* <TextField fullWidth/> */}
                        {/* <FormInputTextField name={"name"} control={control}/> */}
                    </Grid>
                    <Grid xs={12} item className="mb-3">
                        <Typography variant={"body1"} className="mb-1">Description</Typography>
                        {/* <TextField multiline rows={4} fullWidth/> */}
                        {/* <FormInputTextField name={"desc"} control={control} rows={4}/> */}
                    </Grid>
                    <Grid xs={12} item className="mb-3">
                        {/* <Stack direction={browserMd ? "column" : "row"} alignItems={!browserMd && "center"}>
                            <Typography variant={"body1"} className="mb-1" flex={1}>Role Type</Typography>
                            <FormInputDropDown
                            name="roleType"
                            control={control}
                            label={"Choose a role type"}
                            options={options}
                            formControlProps={{flex: 1}}/>
                        </Stack> */}
                    </Grid>
                </Grid>

                {/* Permissions */}
                <Grid container>
                    <Grid xs={12} item className="mb-1">
                        <Typography variant="h6" color={"#296EB4"} fontWeight={700}>Permissions</Typography>
                    </Grid>

                    {/* Map */}
                    <Grid item xs={12}>
                        <Box
                        display={'flex'}
                        //flexDirection={browserMd ? 'column' : 'row'}
                        padding={2}>
                            <Typography flex={0.5} variant="h6" color={"#4D4D4D"} fontWeight={300} marginBottom={2}>Map</Typography>

                            <Grid flex={1} container>
                                {/* Controls for Map */}
                                <Grid xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>View Floor Plan</Typography>
                                    {/* <FormInputSwitch name="maps.view" control={control}/> */}
                                </Grid>
                                <Grid xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>Edit Floor Plan</Typography>
                                    {/* <FormInputSwitch name="maps.update" control={control}/> */}
                                </Grid>
                                <Grid xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>Delete Floor Plan</Typography>
                                    {/* <FormInputSwitch name="maps.delete" control={control}/> */}
                                </Grid>
                                <Grid xs={12} md={6} display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>Add Floor Plan</Typography>
                                    {/* <FormInputSwitch name="maps.add" control={control}/> */}
                                </Grid>
                            </Grid>
                        </Box>

                        <Divider />
                    </Grid>

                    {/* Subject */}
                    <Grid item xs={12}>
                        <Box
                        display={'flex'}
                        // flexDirection={browserMd ? 'column' : 'row'}
                        padding={2}>
                            <Typography flex={0.5} variant="h6" color={"#4D4D4D"} fontWeight={300} marginBottom={2}>Subject</Typography>

                            <Grid flex={1} container>
                                {/* View */}
                                <Grid xs={12} item>
                                    <Typography variant="body2" color="#747474" sx={{textDecoration: "underline"}}>View</Typography>
                                </Grid>
                                <Grid xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>Details</Typography>
                                    {/* <FormInputSwitch name={"subject.view.details"} control={control}/> */}
                                </Grid>
                                <Grid xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>Schedule</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>Participants</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={12} md={6} display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>Attendances</Typography>
                                    <Switch />
                                </Grid>

                                {/* Add */}
                                <Grid xs={12} item marginTop={3}>
                                    <Typography variant="body2" color="#747474" sx={{textDecoration: "underline"}}>Add</Typography>
                                </Grid>
                                <Grid xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>Details</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>Schedule</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>Participants</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={12} md={6} display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>Attendances</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'} marginTop={2}>
                                    <Typography>Require Verification</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={12} md={6} display={'flex'} alignItems={"center"} justifyContent={'space-between'}
                                // marginTop={browserMd ? 0 : 2}
                                >
                                    <Typography sx={{flex: 1}}>Verified By</Typography>
                                    <Select sx={{flex: 1}}></Select>
                                </Grid>

                                {/* Update */}
                                <Grid xs={12} item marginTop={3}>
                                    <Typography variant="body2" color="#747474" sx={{textDecoration: "underline"}}>Edit</Typography>
                                </Grid>
                                <Grid xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>Details</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>Schedule</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>Participants</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={12} md={6} display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>Attendances</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'} marginTop={2}>
                                    <Typography>Require Verification</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={12} md={6} display={'flex'} alignItems={"center"} justifyContent={'space-between'}
                                // marginTop={browserMd ? 0 : 2}
                                >
                                    <Typography sx={{flex: 1}}>Verified By</Typography>
                                    <Select sx={{flex: 1}}></Select>
                                </Grid>

                                {/* Delete */}
                                <Grid xs={12} item marginTop={3}>
                                    <Typography variant="body2" color="#747474" sx={{textDecoration: "underline"}}>Delete</Typography>
                                </Grid>
                                <Grid xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>Details</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>Schedule</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>Participants</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={12} md={6} display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>Attendances</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'} marginTop={2}>
                                    <Typography>Require Verification</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={12} md={6} display={'flex'} alignItems={"center"} justifyContent={'space-between'}
                                // marginTop={browserMd ? 0 : 2}
                                >
                                    <Typography sx={{flex: 1}}>Verified By</Typography>
                                    <Select sx={{flex: 1}}></Select>
                                </Grid>
                            </Grid>
                        </Box>

                        <Divider />
                    </Grid>

                    {/* Event */}
                    <Grid item xs={12}>
                        <Box display={'flex'}
                        // flexDirection={browserMd ? 'column' : 'row'}
                        padding={2}>
                            <Typography flex={0.5} variant="h6" color={"#4D4D4D"} fontWeight={300} marginBottom={2}>Event</Typography>

                            <Grid flex={1} container>
                                {/* View */}
                                <Grid xs={12} item>
                                    <Typography variant="body2" color="#747474" sx={{textDecoration: "underline"}}>View</Typography>
                                </Grid>
                                <Grid xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>Details</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>Schedule</Typography>
                                    
                                    <Switch />
                                </Grid>
                                <Grid xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>Participants</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={12} md={6} display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>Attendances</Typography>
                                    <Switch />
                                </Grid>

                                {/* Add */}
                                <Grid xs={12} item marginTop={3}>
                                    <Typography variant="body2" color="#747474" sx={{textDecoration: "underline"}}>Add</Typography>
                                </Grid>
                                <Grid xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>Details</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>Schedule</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>Participants</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={12} md={6} display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>Attendances</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'} marginTop={2}>
                                    <Typography>Require Verification</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={12} md={6} display={'flex'} alignItems={"center"} justifyContent={'space-between'}
                                // marginTop={browserMd ? 0 : 2}
                                >
                                    <Typography sx={{flex: 1}}>Verified By</Typography>
                                    <Select sx={{flex: 1}}></Select>
                                </Grid>

                                {/* Update */}
                                <Grid xs={12} item marginTop={3}>
                                    <Typography variant="body2" color="#747474" sx={{textDecoration: "underline"}}>Edit</Typography>
                                </Grid>
                                <Grid xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>Details</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>Schedule</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>Participants</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={12} md={6} display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>Attendances</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'} marginTop={2}>
                                    <Typography>Require Verification</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={12} md={6} display={'flex'} alignItems={"center"} justifyContent={'space-between'}
                                // marginTop={browserMd ? 0 : 2}
                                >
                                    <Typography sx={{flex: 1}}>Verified By</Typography>
                                    <Select sx={{flex: 1}}></Select>
                                </Grid>

                                {/* Delete */}
                                <Grid xs={12} item marginTop={3}>
                                    <Typography variant="body2" color="#747474" sx={{textDecoration: "underline"}}>Delete</Typography>
                                </Grid>
                                <Grid xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>Details</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>Schedule</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>Participants</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={12} md={6} display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>Attendances</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'} marginTop={2}>
                                    <Typography>Require Verification</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={12} md={6} display={'flex'} alignItems={"center"} justifyContent={'space-between'}
                                // marginTop={browserMd ? 0 : 2}
                                >
                                    <Typography sx={{flex: 1}}>Verified By</Typography>
                                    <Select sx={{flex: 1}}></Select>
                                </Grid>
                            </Grid>
                        </Box>
                        <Divider />
                    </Grid>

                    {/* Users */}
                    <Grid item xs={12}>
                        <Box display={'flex'}
                        // flexDirection={browserMd ? 'column' : 'row'}
                        padding={2}>
                            <Typography flex={0.5} variant="h6" color={"#4D4D4D"} fontWeight={300} marginBottom={2}>Users</Typography>

                            <Grid flex={1} container>
                                <Grid xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>View Users</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>Add Users</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>Delete Users</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={12} md={6} display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>Update Users</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'} marginTop={2}>
                                    <Typography>Require Verification</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={12} md={6} display={'flex'} alignItems={"center"} justifyContent={'space-between'}
                                // marginTop={browserMd ? 0 : 2}
                                >
                                    <Typography sx={{flex: 1}}>Verified By</Typography>
                                    <Select sx={{flex: 1}}></Select>
                                </Grid>
                            </Grid>
                        </Box>
                        <Divider />
                    </Grid>

                    {/* Groups */}
                    <Grid item xs={12}>
                        <Box display={'flex'}
                        // flexDirection={browserMd ? 'column' : 'row'}
                        padding={2}>
                            <Typography flex={0.5} variant="h6" color={"#4D4D4D"} fontWeight={300} marginBottom={2}>Groups</Typography>

                            <Grid flex={1} container>
                                <Grid xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>View Groups</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>Add Groups</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>Delete Groups</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={12} md={6} display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>Update Groups</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'} marginTop={2}>
                                    <Typography>Require Verification</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={12} md={6} display={'flex'} alignItems={"center"} justifyContent={'space-between'}
                                // marginTop={browserMd ? 0 : 2}
                                >
                                    <Typography sx={{flex: 1}}>Verified By</Typography>
                                    <Select sx={{flex: 1}}></Select>
                                </Grid>
                            </Grid>
                        </Box>
                        <Divider />
                    </Grid>

                    {/* Roles */}
                    <Grid item xs={12}>
                        <Box display={'flex'}
                        // flexDirection={browserMd ? 'column' : 'row'}
                        padding={2}>
                            <Typography flex={0.5} variant="h6" color={"#4D4D4D"} fontWeight={300} marginBottom={2}>Roles</Typography>

                            <Grid flex={1} container>
                                <Grid xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>View Roles</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>Add Roles</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>Delete Roles</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={12} md={6} display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>Update Roles</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={12} md={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'} marginTop={2}>
                                    <Typography>Require Verification</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={12} md={6} display={'flex'} alignItems={"center"} justifyContent={'space-between'}
                                // marginTop={browserMd ? 0 : 2}
                                >
                                    <Typography sx={{flex: 1}}>Verified By</Typography>
                                    <Select sx={{flex: 1}}></Select>
                                </Grid>
                            </Grid>
                        </Box>
                        <Divider />
                    </Grid>

                    <Grid display={"flex"} gap={2} flexDirection={"row-reverse"} item xs={12} marginTop={4}>
                        <Button variant="contained" type="submit">SUBMIT</Button>
                        <Button variant="outlined" type="reset" color="error">Cancel</Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default AddRole