import React, { useState } from "react"
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    FormGroup,
    Grid,
    IconButton,
    Stack,
    Tab,
    Tabs,
    TextField,
    Typography,
    useTheme,
} from '@mui/material'
import { TimePicker } from '@mui/x-date-pickers'
import { Controller, useForm } from 'react-hook-form'
import { FixMeLater } from "../../../../types/FixMeLater"
import { useAppDispatch, useAppSelector } from "../../../../app/encored-store-hooks"
import { useNavigate } from "react-router-dom"
import FormInputTextField from "../../../../components/TextField/FormInputTextField"
import FormInputDropDown from "../../../../components/DropDown/FormInputDropDown"
import { RegisterFormInput } from "../../../../types/RegisterFormInput"
import SubjectEventCard from "../../../../components/Cards/SubjectEventCard"
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { SubjectInput, addAllSubjects } from "../../../../app/features/subject/subjectSlice"
import dayjs from "dayjs"
import { ErrorMessage } from '@hookform/error-message';
import InputTimePicker from "../../../../components/Timepicker/Timepicker"
import FormInputMultiCheckbox from "../../../../components/Checkbox/FormInputMultiCheckbox"
import CloseIcon from '@mui/icons-material/Close';

const AddSubject = () => {
    const theme = useTheme();

    const navigate = useNavigate();

    const dispatch = useAppDispatch()
    const loading = useAppSelector(state => state.role.loading)
    const user = useAppSelector(state => state.authentication.data.email)
    const institution = useAppSelector(state => state.institution.data.name)

    const [showSchedule, setShowSchedule] = useState(false);
    const [subjects, setSubjects] = useState<Array<SubjectInput>>([])

    const {handleSubmit, reset, resetField, control, getValues, setValue, formState: {errors}, unregister} = useForm<SubjectInput>({
        defaultValues: {
            details: {
                name: "",
                edpCode: "",
                units: 0,
                type: ""
            },
            schedule: {
                startTime: dayjs(),
                endTime: dayjs(),
                assignDays: [],
            },
            createdBy: user,
            institution: institution
        }
    })

    const handleInput = (data: SubjectInput) => {
        if (data.schedule !== undefined)
            Object.assign(data, {schedule: {
                startTime: data.schedule?.startTime,
                endTime: data.schedule?.endTime,
                assignDays: data.schedule.assignDays
            }});
        setSubjects(prev => [...prev, data])

        reset();
    }
    const removeInput = (index: number) => {
        setSubjects(prev => prev.filter((_, i) => i !== index))
    }
    
    const submitSubjects = () => {
        console.log(subjects)
        dispatch(addAllSubjects(subjects)).unwrap()
            .then(() => {
                alert("Subjects added successfully!")
                setSubjects([])
            })
            .catch((error) => {
                console.error(error)
                alert("Something is wrong")
            })
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

    const subjectInputs: Array<RegisterFormInput> = [
        {key: "details.edpCode", label: "Subject Code", type: "text", rules: { required: "Subject Code is required" }},
        {key: "details.name", label: "Subject Description", type: "text", rules: { required: "Subject description is required" }},
        {key: "details.units", label: "Units", type: "text", rules: { required: "Unit is required" }},
        {key: "details.type", label: "Type", rules: { required: "Role type is required" }},
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

    const subjectTypes = [
        {label: "Subject type", value: ""},
        {label: "Lecture", value: "lecture"},
        {label: "Laboratory", value: "laboratory"},
    ]

    return(
        <>
            <Typography variant="h4" color={"#296EB4"} fontWeight={700} marginBottom={2}>
                ADD SUBJECT
            </Typography>

            <Grid container>
                <Grid xs={12} md={6} item>

                    <Box marginBottom={2} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={0} onChange={() => {}} aria-label="basic tabs example">
                            <Tab label="Single Subject"/>
                            <Tab label="Multiple Subject"/>
                        </Tabs>
                    </Box>

                    <Box onSubmit={handleSubmit(handleInput)} component="form">
                        {/* Move this thing in another component */}
                        <Grid container columnSpacing={2} marginBottom={2}>
                            <Grid xs={12} item>
                                <Typography variant="h6" color={"#296EB4"} fontWeight={700}>Details</Typography>
                            </Grid>

                            {subjectInputs.map(el => (
                                <Grid key={el.key} xs={12} lg={6} item>
                                    <Typography variant="body1" marginBottom={1}>{el.label}</Typography>
                                    {el.key !== "details.type" ? <FormInputTextField name={el.key} control={control} type={el.type} rules={el.rules} fullWidth/> : <FormInputDropDown name={el.key} control={control} options={subjectTypes} rules={el.rules} fullWidth />}
                                </Grid>             
                            ))}
                        </Grid>

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

                        <Grid container marginBottom={2}>
                            <Grid xs={12} item>
                                <Button variant="outlined">Assign Subject to Room</Button>
                            </Grid>
                        </Grid>

                        <Grid justifyContent={"flex-end"} container marginBottom={2}>
                            <Grid xs={12} sm={4} md={12} lg={4} item>
                                <Button type="submit" fullWidth variant="contained">Add Subject</Button>
                            </Grid>
                        </Grid>
                    </Box>

                </Grid>
                <Grid position={"relative"} minHeight={480} xs={12} md={6} item padding={2}>
                    <Stack padding={2} gap={2} position={"absolute"} top={0} right={0} left={0} bottom={0} overflow={'auto'}>
                        {subjects.map((el, ind) => (
                            // Change this please
                            <SubjectEventCard display="block" height={"auto"} key={ind} sx={{paddingY: 1, paddingX: 2}}>
                                <Box display={'flex'} flexDirection={'row'} justifyContent={"space-between"}>
                                    <Typography variant="h6">{el.details?.name}</Typography>
                                    <IconButton size="small" onClick={(e) => { removeInput(ind) }}>
                                        <CloseIcon fontSize="small"/>
                                    </IconButton>
                                </Box>
                                <Grid container marginBottom={1}>
                                    <Grid xs={6} item>
                                        <Typography variant="body1">EDP Code: {el.details?.edpCode}</Typography>
                                    </Grid>
                                    <Grid xs={6} item>
                                        <Typography variant="body1">Units: {el.details?.units}</Typography>
                                    </Grid>
                                    <Grid xs={12} item>
                                        <Typography variant="body1">Type: {`${el.details?.type?.charAt(0).toUpperCase()}${el.details?.type?.slice(1)}`}</Typography>
                                    </Grid>
                                </Grid>
                                {el.schedule !== undefined && (
                                    <Grid container>
                                        <Grid xs={12} item marginBottom={0.4}>
                                            <Typography variant="body1" fontWeight={700}>Schedule</Typography>
                                        </Grid>
                                        <Grid xs={12} item marginBottom={0.6}>
                                            <Box display={"flex"} gap={1}>
                                                {weeks.map((day) => (
                                                    <Box
                                                    display={"flex"}
                                                    width={36}
                                                    height={36}
                                                    borderRadius={"50%"}
                                                    justifyContent={"center"}
                                                    bgcolor={el.schedule?.assignDays.includes(day.value) ? theme.palette.primary.main : "transparent"}
                                                    color={el.schedule?.assignDays.includes(day.value) ? "#FFFFFF" : theme.palette.text.primary}
                                                    alignItems={"center"}>
                                                        <Typography variant="body2">
                                                            {day.label}
                                                        </Typography>
                                                    </Box>
                                                ))}
                                            </Box>
                                        </Grid>
                                        <Grid xs={12} item>
                                            <Typography variant="body1">{el.schedule!.startTime.format("hh:mm A")} - {el.schedule!.endTime.format("hh:mm A")}</Typography>
                                        </Grid>
                                    </Grid>
                                )}
                            </SubjectEventCard>
                        ))}
                    </Stack>
                </Grid>
            </Grid>

            <Grid justifyContent={"flex-end"} marginY={1} spacing={1} container>
                <Grid xs={12} sm={2} lg={1} item>
                    <Button onClick={submitSubjects} fullWidth variant="contained">Submit</Button>
                </Grid>
                <Grid xs={12} sm={2} lg={1} item>
                    <Button
                    fullWidth
                    onClick={() => {
                        navigate('/dashboard/subject/encored/list')
                        reset();
                    }}
                    color="error"
                    variant="outlined">
                        Cancel
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}

export default AddSubject