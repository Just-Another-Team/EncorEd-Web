import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Stack, Typography } from "@mui/material"
import FormInputMultiCheckbox from "../../Checkbox/FormInputMultiCheckbox"
import { ErrorMessage } from "@hookform/error-message"
import FormInputTextField from "../../TextField/FormInputTextField"
import { RegisterFormInput } from "../../../types/RegisterFormInput"
import FormInputDropDown from "../../DropDown/FormInputDropDown"
import InputTimePicker from "../../Timepicker/Timepicker"
import { FixMeLater } from "../../../types/FixMeLater"
import { SubjectInput } from "../../../app/features/subject/subjectSlice"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import dayjs from "dayjs"

type UpdateSubjectDialogType = {
    selectedSubject: SubjectInput;
    updateDialogSwitch: boolean;
    closeUpdateDialog: (e: FixMeLater) => void;
    weeks: Array<{ label: string; value: string; }>;
}

const UpdateSubjectDialog = ({
    selectedSubject,
    updateDialogSwitch,
    closeUpdateDialog,
    weeks,
}: UpdateSubjectDialogType) => {

    const [selectedItems, setSelectedItems] = useState<Array<string>>([]);

    const [showSchedule, setShowSchedule] = useState<boolean>(!!selectedSubject?.schedule);

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

    const openSchedule = (e: FixMeLater) => {
        setShowSchedule(true)

        setValue('schedule', selectedSubject?.schedule)
    }

    const closeSchedule = (e: FixMeLater) => {
        setShowSchedule(false)

        setValue('schedule', undefined)
    }

    const handleUpdate = (data: SubjectInput) => {
        console.log(data)
    }

    useEffect(() => {
        setSelectedItems(getValues('schedule.assignDays'))
    }, [])

    return(
        <Dialog
        open={updateDialogSwitch}
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
                                            validate: value => (!dayjs(value).isAfter(getValues("schedule.endTime")) && !dayjs(value).isSame(getValues("schedule.endTime")))
                                        }}
                                        label="Start"/>

                                        <ArrowForwardIosOutlinedIcon />

                                        <InputTimePicker
                                        name="schedule.endTime"
                                        control={control}
                                        rules={{
                                            validate: value => (!dayjs(value).isBefore(getValues("schedule.startTime")) && !dayjs(value).isSame(getValues("schedule.startTime"))) || "Start time must not be greater than or equal to End time!"
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
                                    selectedItems={selectedItems}
                                    setSelectedItems={setSelectedItems}
                                    control={control}
                                    label="Weekly Schedule"
                                    options={weeks}
                                    defaultValue={selectedSubject?.schedule?.assignDays}
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
    )
}

export default UpdateSubjectDialog