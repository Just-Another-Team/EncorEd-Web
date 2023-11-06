import React from "react"
import {
    Box,
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
} from '@mui/material'

const AddRole = () => {

    return(
        <>
            <Typography variant="h4" color={"#296EB4"} fontWeight={700} className="mb-2">
                ADD ROLE
            </Typography>

            <Box component="form">
                {/* Details */}
                <Grid xs={6} container>
                    
                    <Grid xs={12} item className="mb-1">
                        <Typography variant="h6" color={"#296EB4"} fontWeight={700}>Details</Typography>
                    </Grid>

                    <Grid xs={12} item className="mb-3">
                        <Typography variant={"body1"} className="mb-1">Name</Typography>
                        <TextField fullWidth/>
                    </Grid>
                    <Grid xs={12} item className="mb-3">
                        <Typography variant={"body1"} className="mb-1">Description</Typography>
                        <TextField multiline rows={4} fullWidth/>
                    </Grid>
                    <Grid xs={12} item className="mb-3">
                        <Stack direction={"row"} alignItems={"center"}>
                            <Typography variant={"body1"} className="mb-1" flex={1}>Role Type</Typography>

                            <FormControl sx={{flex: 1}}>
                                <InputLabel>Choose a role type</InputLabel>
                                <Select
                                value={''}
                                label="Choose a role type">
                                    <MenuItem value={"Admin"}>Admin</MenuItem>
                                    <MenuItem value={"Employee"}>Employee</MenuItem>
                                    <MenuItem value={"Student"}>Student</MenuItem>
                                    <MenuItem value={"Visitor"}>Visitor</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                    </Grid>

                    

                </Grid>

                {/* Permissions */}
                <Grid container>
                    <Grid xs={12} item className="mb-1">
                        <Typography variant="h6" color={"#296EB4"} fontWeight={700}>Permissions</Typography>
                    </Grid>

                    {/* Map */}
                    <Grid item xs={12}>
                        <Box display={'flex'} padding={2}>
                            <Typography flex={0.5} variant="h6" color={"#4D4D4D"} fontWeight={300}>Map</Typography>

                            <Grid flex={1} container>
                                {/* Controls for Map */}
                                <Grid xs={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>View Floor Plan</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>Edit Floor Plan</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>Delete Floor Plan</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={6} display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>Add Floor Plan</Typography>
                                    <Switch />
                                </Grid>
                            </Grid>
                        </Box>

                        <Divider />
                    </Grid>

                    {/* Subject */}
                    <Grid item xs={12}>
                        <Box display={'flex'} padding={2}>
                            <Typography flex={0.5} variant="h6" color={"#4D4D4D"} fontWeight={300}>Subject</Typography>

                            <Grid flex={1} container>
                                {/* Controls for Subject */}
                                <Grid xs={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>View Subject</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>Edit Subject</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>Delete Subject</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={6} display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>Add Floor Plan</Typography>
                                    <Switch />
                                </Grid>

                                {/* View Floor */}
                                <Grid xs={12} marginTop={2} marginBottom={1} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>
                                        View Floor
                                        <Divider sx={{backgroundColor: '#000000'}} />
                                    </Typography>
                                </Grid>
                                <Grid xs={12} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <TextField fullWidth/>
                                </Grid>
                                <Grid xs={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                </Grid>
                                <Grid xs={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>View All Floors</Typography>
                                    <Switch />
                                </Grid>

                                {/* View Room */}
                                <Grid xs={12} marginTop={2} marginBottom={1} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>
                                        View Room
                                        <Divider sx={{backgroundColor: '#000000'}} />
                                    </Typography>
                                </Grid>
                                <Grid xs={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>Show based on Assigned Groups</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>Show based on Assigned Subject</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={6} item display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>Show based on Events</Typography>
                                    <Switch />
                                </Grid>
                                <Grid xs={6} display={'flex'} alignItems={"center"} justifyContent={'space-between'}>
                                    <Typography>Show All Activities</Typography>
                                    <Switch />
                                </Grid>
                            </Grid>
                        </Box>

                        <Divider />
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default AddRole