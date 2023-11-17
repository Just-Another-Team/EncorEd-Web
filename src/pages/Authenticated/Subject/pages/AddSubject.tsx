import React, { useState } from "react"
import {
    Box,
    Button,
    Divider,
    Grid,
    IconButton,
    Stack,
    Tab,
    Tabs,
    TextField,
    Typography,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { FixMeLater } from "../../../../types/FixMeLater"
import { useAppDispatch, useAppSelector } from "../../../../app/encored-store-hooks"
import { useNavigate } from "react-router-dom"
import FormInputTextField from "../../../../components/TextField/FormInputTextField"
import FormInputDropDown from "../../../../components/DropDown/FormInputDropDown"
import { RegisterFormInput } from "../../../../types/RegisterFormInput"
import SubjectEventCard from "../../../../components/Cards/SubjectEventCard"
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

type SubjectInput = {
    name?: string; 
    edpCode?: string; 
    type?: string; 
    units?: number;
    institution?: string;

    createdBy?: string; 
    //updatedDate
    //updatedBy
    verifiedBy?: string; 
}

const AddSubject = () => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch()
    const loading = useAppSelector(state => state.role.loading)
    const user = useAppSelector(state => state.authentication.data.email)
    const institution = useAppSelector(state => state.institution.data.name)

    const [showSchedule, setShowSchedule] = useState(false);

    const {handleSubmit, reset, control, setValue, formState: {errors}} = useForm<SubjectInput>({
        defaultValues: {
            name: "", 
            edpCode: "", 
            type: "", 
            units: 0,
            institution: institution,
            createdBy: user, 
        }
    })

    const handleInput = (data: FixMeLater) => {
        console.log(data)

        reset();
    }

    const openSchedule = (e: FixMeLater) => {
        setShowSchedule(true)
    }

    const closeSchedule = (e: FixMeLater) => {
        setShowSchedule(false)
    }

    const subjectInputs: Array<RegisterFormInput> = [
        {key: "name", label: "Name", type: "text", rules: { required: "Subject name is required" }},
        {key: "edpCode", label: "EDP Code", type: "text", rules: { required: "EDP Code is required" }},
        {key: "units", label: "Units", type: "text", rules: { required: "Unit is required" }},
        {key: "type", label: "Type", rules: { required: "Role type is required" }},
    ] 

    const subjectTypes = [
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
                        <Grid rowSpacing={1} columnSpacing={4} container marginBottom={2}   >
                            <Grid xs={12} item>
                                <Typography variant="h6" color={"#296EB4"} fontWeight={700}>Details</Typography>
                            </Grid>

                            {subjectInputs.map(el => (
                                <Grid key={el.key} xs={12} lg={6} item>
                                    <Typography variant="body1" marginBottom={1}>{el.label}</Typography>
                                    {el.key !== "type" ? <FormInputTextField name={el.key} control={control} type={el.type} rules={el.rules} fullWidth/> : <FormInputDropDown name={el.key} control={control} options={subjectTypes} rules={el.rules} fullWidth />}
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

                                <Grid xs={5} item>
                                    <TextField label="Start" fullWidth />
                                </Grid>
                                <Grid display={"flex"} xs={1} item justifyContent={"center"} alignItems={"center"}>
                                    <ArrowForwardIosOutlinedIcon />
                                </Grid>
                                <Grid xs={5} item>
                                    <TextField label="End" fullWidth/>
                                </Grid>
                            </> : 
                            <Grid xs={12} item>
                                <Button onClick={openSchedule} variant="outlined">Add Schedule</Button>
                            </Grid>}
                        </Grid>

                        <Grid rowSpacing={1} columnSpacing={4} container marginBottom={2}>
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
                        {Array.from({length: 4}).map(el => (
                            <SubjectEventCard />
                        ))}
                    </Stack>
                </Grid>
            </Grid>

            <Grid justifyContent={"flex-end"} marginY={1} spacing={1} container>
                <Grid xs={12} sm={2} lg={1} item>
                    <Button fullWidth variant="contained">Submit</Button>
                </Grid>
                <Grid xs={12} sm={2} lg={1} item>
                    <Button fullWidth color="error" variant="outlined">Cancel</Button>
                </Grid>
            </Grid>
        </>
    )
}

export default AddSubject