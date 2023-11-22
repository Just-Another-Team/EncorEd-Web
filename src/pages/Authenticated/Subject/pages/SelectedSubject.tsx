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
    DialogContentText
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

const SelectedSubject = () => {
    const src = "/assets/SubjectTestPic.png"

    const { id } = useParams();

    const selectedSubject = useAppSelector(state => state.subject.data.find(subject => subject.details!.id === id))

    const {handleSubmit, reset, control, setValue, formState: {errors}, unregister} = useForm<SubjectInput>({
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
        {key: "details.name", label: "Name", type: "text", rules: { required: "Subject name is required" }},
        {key: "details.edpCode", label: "EDP Code", type: "text", rules: { required: "EDP Code is required" }},
        {key: "details.units", label: "Units", type: "text", rules: { required: "Unit is required" }},
        {key: "details.type", label: "Type", rules: { required: "Role type is required" }},
    ]
    const subjectTypes = [
        {label: "Subject type", value: ""},
        {label: "Lecture", value: "lecture"},
        {label: "Laboratory", value: "laboratory"},
    ]

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
                            <Button startIcon={<UpdateOutlined />} size="small" variant="text" color="secondary">
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
                                <Typography color={"#548BC3"}>TBA</Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography marginBottom={1}>Assigned Days per Week</Typography>
                                {/* <Stack direction={"row"} justifyContent={"space-around"}>
                                    <Button variant="contained">Su</Button>
                                    <Button >Mo</Button>
                                    <Button >Tu</Button>
                                    <Button >We</Button>
                                    <Button >Th</Button>
                                    <Button >Fr</Button>
                                    <Button >Sa</Button>
                                </Stack> */}
                                <Stack sx={{pointerEvents: "none"}} direction={"row"} justifyContent={"space-around"}>
                                    <PaginationItem color="primary" size="large" page={<Typography>Su</Typography>} />
                                    <PaginationItem color="primary" size="large" page={<Typography>Mo</Typography>} />
                                    <PaginationItem color="primary" size="large" page={<Typography>Tu</Typography>} />
                                    <PaginationItem color="primary" size="large" page={<Typography>We</Typography>} />
                                    <PaginationItem color="primary" size="large" page={<Typography>Th</Typography>} />
                                    <PaginationItem color="primary" size="large" page={<Typography>Fr</Typography>} />
                                    <PaginationItem color="primary" size="large" page={<Typography>Sa</Typography>} />
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
            open={true}
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

                        </Grid>

                </DialogContent>
                <DialogActions>
                    <Button color="error" variant="outlined">CANCEL</Button>
                    <Button type="submit" variant="contained">SUBMIT</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default SelectedSubject