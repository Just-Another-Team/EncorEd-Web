import React, { useEffect } from "react";
import { 
    Box,
    Tabs,
    Typography,
    Tab,
    Button,
    TextField,
    Grid,
    Stack,
    PaginationItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    IconButton
} from "@mui/material";
import { useAppSelector } from "../../../../app/encored-store-hooks";
import { useLocation, useParams } from "react-router-dom";
import CustomTab from "../../../../components/Tab/CustomTab";
import DeleteForeverOutlined from "@mui/icons-material/DeleteForeverOutlined";
import UpdateOutlined from "@mui/icons-material/UpdateOutlined";
import { useForm } from "react-hook-form";
import { SubjectInput } from "../../../../app/features/subject/subjectSlice";
import FormInputTextField from "../../../../components/TextField/FormInputTextField";
import FormInputDropDown from "../../../../components/DropDown/FormInputDropDown";
import { RegisterFormInput } from "../../../../types/RegisterFormInput";
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import dayjs from "dayjs";
import { FixMeLater } from "../../../../types/FixMeLater";
import InputTimePicker from "../../../../components/Timepicker/Timepicker";
import FormInputMultiCheckbox from "../../../../components/Checkbox/FormInputMultiCheckbox";
import { ErrorMessage } from "@hookform/error-message";

const SelectedSubject = () => {
    const src = "/assets/SubjectTestPic.png"

    const { id } = useParams();

    const subjects = useAppSelector(state => state.subject.data)
    const selectedSubject = subjects.find(subject => subject.details!.id === id)

    const [showSchedule, setShowSchedule] = React.useState<boolean>(!!selectedSubject?.schedule);
    const [ subjectList, setSubjectList ] = React.useState<any>([])

    const [ updateDialogSwitch, setUpdateDialog ] = React.useState(false);
    const [ dialogTarget, setDialogTarget ] = React.useState<any>();

    const {handleSubmit, reset, resetField, getValues, control, setValue, formState: {errors}, unregister} = useForm<SubjectInput>({
        defaultValues: {
            details: {
                name: selectedSubject?.details!.name,
                edpCode: selectedSubject?.details!.edpCode,
                units: selectedSubject?.details!.units,
                type: selectedSubject?.details!.type
            },
            schedule: selectedSubject?.schedule,
            createdBy: selectedSubject?.details!.createdBy,
            institution: selectedSubject?.details!.institution
        }
    })

    const subjectInputs: Array<RegisterFormInput> = [
        {key: "details.name", label: "Description", type: "text", rules: { required: "Subject Description is required" }},
        {key: "details.edpCode", label: "EDP Code", type: "text", rules: { required: "EDP Code is required" }},
        {key: "details.units", label: "Units", type: "text", rules: { required: "Unit is required" }},
        {key: "details.type", label: "Type", rules: { required: "Role type is required" }},
    ]

    const subjectTypes = [
        {label: "Subject type", value: ""},
        {label: "Lecture", value: "lecture"},
        {label: "Laboratory", value: "laboratory"},
    ]

    const weeks: Array<{ label: string; value: string; }> = [
        { label: "Su", value: "sunday", },
        { label: "Mo", value: "monday", },
        { label: "Tu", value: "tuesday", },
        { label: "We", value: "wednesday", },
        { label: "Th", value: "thursday", },
        { label: "Fr", value: "friday", },
        { label: "Sa", value: "saturday", },
    ]

    const openUpdateDialog = (e: FixMeLater) => {
        setUpdateDialog(true);
    }
    const closeUpdateDialog = (e: FixMeLater) => {
        setUpdateDialog(false);
    }

    const openSchedule = (e: FixMeLater) => {
        setShowSchedule(true)

        // setValue('schedule.startTime', dayjs());
        // setValue('schedule.endTime', dayjs());
    }

    const closeSchedule = (e: FixMeLater) => {
        setShowSchedule(false)

        resetField('schedule');
    }

    const handleUpdate = (data: SubjectInput) => {
        //console.log("Schedule", !!selectedSubject?.schedule)
        console.log(data)
    }

    return(
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={5}>
                    <img style={{width: "100%", borderRadius: 12}} src={src}/>

                    <Box padding={2} marginTop={2} bgcolor={"#F6F5FF"} borderRadius={4}>
                        <Stack direction={'row'} alignItems={"center"} marginBottom={2} gap={1}>
                            <Typography color={"#1789FC"} fontWeight={700} variant="h5" flex={1}>
                                {selectedSubject?.details?.name}
                            </Typography>
                            <Button onClick={openUpdateDialog} startIcon={<UpdateOutlined />} size="small" variant="text" color="secondary">
                                Update
                            </Button>
                            <Button startIcon={<DeleteForeverOutlined />} size="small" variant="text" color="error">
                                Delete
                            </Button>
                        </Stack>

                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <Typography>Units</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography color={"#548BC3"}>{selectedSubject?.details?.units}</Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography>EDP Code</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography color={"#548BC3"}>{selectedSubject?.details?.edpCode}</Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography>Type</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography color={"#548BC3"}>{`${selectedSubject?.details?.type?.charAt(0).toLocaleUpperCase()}${selectedSubject?.details?.type?.slice(1)}`}</Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography>Room</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography color={"#548BC3"}>TBA</Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography>Scheduled Time</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                {selectedSubject?.schedule !== undefined ? (
                                    <Typography color={"#548BC3"}>{`${selectedSubject?.schedule?.startTime} - ${selectedSubject?.schedule?.endTime}`}</Typography>
                                ) : (
                                    <Typography color={"#548BC3"}>TBA</Typography>
                                )}
                            </Grid>

                            <Grid item xs={12}>
                                <Typography marginBottom={1}>Assigned Days per Week</Typography>
                                <Stack sx={{pointerEvents: "none"}} direction={"row"} justifyContent={"space-around"}>
                                    {weeks.map((day) => (
                                        <PaginationItem
                                        selected={selectedSubject?.schedule?.assignDays.includes(day.value)}
                                        color="primary"
                                        size="large"
                                        page={<Typography>{day.label}</Typography>} />
                                    ))}
                                </Stack>
                            </Grid> 

                            <Grid item>
                                
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>

                <Grid item xs={12} lg={7} >
                    <Box marginBottom={2} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={0} variant="scrollable">
                            <Tab label="Participants"  />
                            <Tab label="Teachers" />
                        </Tabs>
                    </Box>
                </Grid>
            </Grid>

            <Dialog
            open={updateDialogSwitch}
            //onClose={handleClose}
            maxWidth="md"
            fullWidth
            onSubmit={handleSubmit(handleUpdate)}
            component='form'>
                <DialogTitle>Update Subject</DialogTitle>
                <DialogContent>
                    
                    <Grid rowSpacing={1} columnSpacing={4} container marginBottom={2}   >
                            <Grid xs={12} item>
                                <Typography variant="h6" color={"#296EB4"} fontWeight={700}>Details</Typography>
                            </Grid>

                            {subjectInputs.map(el => (
                                <Grid key={el.key} xs={12} lg={6} item>
                                    <Typography variant="body1" marginBottom={1}>{el.label}</Typography>
                                    {
                                    el.key !== "details.type" ? 
                                    <FormInputTextField name={el.key} control={control} type={el.type} rules={el.rules} fullWidth/> :
                                    <FormInputDropDown name={el.key} control={control} options={subjectTypes} rules={el.rules} fullWidth />
                                    }
                                </Grid>             
                            ))}

                            <Grid xs={12} item>
                                <Grid container marginBottom={2} justifyContent={"space-between"}>
                                    {showSchedule ? 
                                    <>
                                        <Grid xs={11} item marginBottom={1}>
                                            <Typography variant="h6" color={"#296EB4"} fontWeight={700}>Schedule</Typography>
                                        </Grid>
                                        <Grid display={"flex"} xs={1} item justifyContent={"center"} alignItems={"center"} marginBottom={1}>
                                            <IconButton size="small" onClick={closeSchedule}>
                                                <CloseOutlinedIcon fontSize="inherit" />
                                            </IconButton>
                                        </Grid>

                                        <Grid xs={12} item marginBottom={2}>
                                            <Stack direction={"row"} alignItems={"center"} gap={2}>
                                                <InputTimePicker
                                                name="schedule.startTime"
                                                control={control}
                                                rules={{
                                                    validate: value => (!value.isAfter(getValues("schedule.endTime")) && !value.isSame(getValues("schedule.endTime")))
                                                }}
                                                label="Start"/>

                                                <ArrowForwardIosOutlinedIcon />

                                                <InputTimePicker
                                                name="schedule.endTime"
                                                control={control}
                                                rules={{
                                                    validate: value => (!value.isBefore(getValues("schedule.startTime")) && !value.isSame(getValues("schedule.startTime"))) || "Start time must not be greater than or equal to End time!"
                                                }}
                                                label="End"/>
                                            </Stack>
                                            <ErrorMessage
                                            errors={errors}
                                            name="schedule.endTime"
                                            render={({message}) => <Typography variant="caption" color={"error"}>{message}</Typography>}/>
                                        </Grid>

                                        <Grid xs={12} item>
                                            <FormInputMultiCheckbox
                                            name="schedule.assignDays"
                                            control={control}
                                            label="Weekly Schedule"
                                            options={weeks}
                                            setValue={setValue}/>
                                        </Grid>
                                    </> : 
                                    <Grid xs={12} item>
                                        <Button onClick={openSchedule} variant="outlined">Add Schedule</Button>
                                    </Grid>}
                                </Grid>

                            </Grid>
                        </Grid>

                </DialogContent>
                <DialogActions>
                    <Button onClick={closeUpdateDialog} color="error" variant="outlined">CANCEL</Button>
                    <Button type="submit" variant="contained">SUBMIT</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default SelectedSubject