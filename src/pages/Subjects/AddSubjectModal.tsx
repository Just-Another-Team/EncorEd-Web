import { Avatar, Box, Button, Card, FormControl, FormLabel, Grid, IconButton, Stack, styled, Tab, Tabs, Typography } from "@mui/material";
import DialogMessage from "../../components/DialogMessage"
import ISubject from "../../data/ISubject";
import Color from "../../assets/Color";
import { ArrowForwardOutlined, Close, ExitToApp } from "@mui/icons-material";
import ControlledTextField from "../../components/TextFieldControlled/input";
import { FieldValues, RegisterOptions, useForm } from "react-hook-form";
import { MouseEventHandler, useState, ChangeEvent, MouseEvent, useMemo, useEffect } from "react";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat'
import ISchedule from "../../data/ISchedule";
import IUser, { UserRole } from "../../data/IUser";
import DropDown from "../../components/DropDown";
import { useUsers } from "../../hooks/useUsers";
import TimePickerControlled from "../../components/TimePickerControlled";
import Week from "./Week";
import AddSubjectModalDataGrid from "./AddSubjectModalDataGrid";
import { useSubject } from "../../hooks/useSubject";
import Papa from 'papaparse'
import ISubjectCSV from "../../data/ISubjectCSV";
import { useModal } from "../../hooks/useModal";
import SnackBar from "../../components/Snackbar/SnackBar";
import { FixMeLater } from "../../types/FixMeLater";

dayjs.extend(customParseFormat)

type AddedSubjectType = {
    valid: boolean
    SUB_INDEX?: number
} & ISubject

type AddSubjectModalType = {
    openModal: boolean;
    closeModal: () => void
    loading: boolean;
    title: string;
    onSubmit: (data: Array<AddedSubjectType>) => void
}

type SubjectCardType = {
    subject: ISubject,
    onClose: MouseEventHandler<HTMLButtonElement>
}

type SubjectCardScheduleType = {
    timeRange: string;
    weeks: string;
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const SubjectCard = (props: SubjectCardType) => {
    const { getUser } = useUsers()

    const {
        subject,
        onClose
    } = props

    const subjectName = `${subject.SUB_CODE} ${subject.SUB_DESCRIPTION}`
    const schedule: "No Schedule" | SubjectCardScheduleType = subject.SCHED_ID || subject.SCHED_ID !== null ? {
        timeRange: `${dayjs((subject.SCHED_ID as ISchedule).SCHED_STARTTIME).format("hh:mm A")} - ${dayjs((subject.SCHED_ID as ISchedule).SCHED_ENDTIME).format("hh:mm A")}`,
        weeks: (subject.SCHED_ID as ISchedule).SCHED_WEEKASSIGNED.reduce((prevValue, curValue) => {
            const currentValue = curValue == "Thursday" ? curValue.substring(0, 2) : curValue.charAt(0)
            return prevValue + currentValue
        }, "")
    } : "No Schedule"
    const instructor = getUser(subject.USER_ID as string)

    return (
        <Box
        position={'relative'}
        borderRadius={2}
        bgcolor={Color('primaryBlue', 100)}
        paddingX={2}
        paddingY={1}>
            <IconButton
            size="small"
            onClick={onClose}
            sx={{
                position: 'absolute',
                top: 4,
                right: 4
            }}>
                <Close />
            </IconButton>
            <Grid
            container>
                <Grid item xs={12}>
                    <Typography variant="h6">{ subjectName }</Typography>
                </Grid>
            </Grid>
            <Grid
            container>
                <Grid
                item
                xs={7}
                display={'flex'}
                flexDirection={'row'}
                alignItems={'center'}
                gap={1}>
                    { instructor || instructor !== null ? (
                        <>
                            <Avatar src="/assets/profilepic.png"/>
                            <Typography variant="body1">{ instructor?.USER_FULLNAME }</Typography>
                        </>
                    ) : (
                        <>
                            <Avatar src="/assets/profilepic.png"/>
                            <Typography variant="body1">No Instructor</Typography>
                        </>
                    )}
                </Grid>
                <Grid
                item
                xs={5}
                display={'flex'}
                flexDirection={'row'}
                alignItems={'center'}
                gap={1}>
                    <Typography variant="body1">{typeof schedule === "object" ? `${schedule.timeRange} (${schedule.weeks})` : schedule as string}</Typography>
                </Grid>
            </Grid>
        </Box>
    )
}

const AddSubjectModal = (props: AddSubjectModalType) => {
    const { openModal, closeModal, loading, title, onSubmit } = props
 
    const { 
        openModal: verifySubmission,
        handleOpenModal: openVerifySubmission,
        handleCloseModal: closeVerifySubmission
    } = useModal();

    const { getSubjects } = useSubject()
    const { getTeachers, getUsersByCreator, getCurrentUser, getUser } = useUsers();
    const { control, handleSubmit, setValue, reset, watch, setError, formState: { isSubmitSuccessful } } = useForm<ISubject>({
        defaultValues: {
            SUB_EDP_CODE: null,
            SUB_CODE: null,
            SUB_DESCRIPTION: null,
            USER_ID: "",
            SCHED_ID: undefined,
        }
    });

    const { 
        openModal: errorSnackbar,
        handleOpenModal: openErrorSnackbar,
        handleCloseModal: closeErrorSnackbar
    } = useModal();
    
    const [ message, setMessage ] = useState<string>()

    const [updateSubjectIndex, setUpdateSubjectIndex] = useState<number>(0)
    const [updateWeeks, setUpdateWeeks] = useState<Array<string>>([])
    const [subjectsToBeDeleted, setSubjectsToBeDeleted] = useState<Array<number>>([])
    const [addedSubjects, setAddedSubjects] = useState<Array<AddedSubjectType>>([])
    const [activateCheckbox, setActivateCheckbox] = useState<boolean>(false)
    const [updateSubject, setUpdateSubject] = useState<boolean>(false)
    const [uploadType, setUploadType] = useState<string>("single")
    const [isValid, setIsValid] = useState<string>('valid')

    const addSubjectsToBeDeleted = (row: Array<number>) => {
        console.log(row)
        setSubjectsToBeDeleted(row)
    }

    const removeSubjectsToBeDeleted = () => {
        closeCheckbox()
        setAddedSubjects(addedSubject => addedSubject.filter(subject => !subjectsToBeDeleted.includes(subject.SUB_INDEX as number) ))
    }

    const uploadTypeHandler = (event: React.SyntheticEvent, newValue: string) => {
        setUploadType(newValue)
    }

    const validSubjectHandler = (event: React.SyntheticEvent, newValue: string) => {
        console.log(newValue)
        setIsValid(newValue)
    }

    const openCheckbox = () => {
        if (updateSubject) {
            reset()
            setValue('SUB_CODE', "")
            setValue('SUB_DESCRIPTION', "")
            setUpdateWeeks([])
            setUpdateSubject(false)
        }
        
        setActivateCheckbox(true)
    }

    const closeCheckbox = () => {
        setActivateCheckbox(false)
    }

    const updateSelectedSubject = (row: ISubject) => {
        if (activateCheckbox) {
            setActivateCheckbox(false)
        }

        setUpdateSubjectIndex((row as FixMeLater).SUB_INDEX)
        setUpdateSubject(true)
        const schedule = row.SCHED_ID as ISchedule

        //set Value
        setValue('SUB_EDP_CODE', row.SUB_EDP_CODE)
        setValue('SUB_CODE', row.SUB_CODE)
        setValue('SUB_DESCRIPTION', row.SUB_DESCRIPTION)
        setValue('USER_ID', row.USER_ID === "error/invalid-user-id" ? "" : row.USER_ID)    
        setValue('SCHED_ID.SCHED_STARTTIME', schedule.SCHED_STARTTIME)
        setValue('SCHED_ID.SCHED_ENDTIME', schedule.SCHED_ENDTIME)
        //setValue('SCHED_ID.SCHED_WEEKASSIGNED', schedule.SCHED_WEEKASSIGNED)
        setUpdateWeeks(schedule.SCHED_WEEKASSIGNED.find(week => week === "error/no-days-assigned") ? [] : schedule.SCHED_WEEKASSIGNED)
    }

    const updateSubjectHandler = (data: ISubject) => {
        console.log("Updating subject")

        const newSubject: AddedSubjectType = {
            ...addedSubjects.find(addedSubject => addedSubject.SUB_INDEX === updateSubjectIndex)!,
            ...data,
            valid: true
        }

        setAddedSubjects(addedSubject => {
            return addedSubject.map(subject => {
                if (subject.SUB_INDEX === updateSubjectIndex) {
                    return newSubject
                }

                return subject
            })
        })

        reset()
        setUpdateWeeks([])
        
        setUpdateSubject(false)
    }

    const addSubject = (data: ISubject) => {
        console.log("Adding subject")

        if (addedSubjects.find(subject => subject.SUB_EDP_CODE === data.SUB_EDP_CODE) || getSubjects().find(subject => subject.SUB_EDP_CODE === data.SUB_EDP_CODE)) {
            setError("SUB_EDP_CODE", { message: "EDP Code already exists!" })
            return
        }

        const subject: ISubject = {
            ...data,
            SUB_EDP_CODE: data.SUB_EDP_CODE,
            USER_ID: data.USER_ID ? data.USER_ID : null,
            SCHED_ID: {
                ...data.SCHED_ID as ISchedule,
                SCHED_STARTTIME: dayjs((data.SCHED_ID as ISchedule).SCHED_STARTTIME).toISOString(),
                SCHED_ENDTIME: dayjs((data.SCHED_ID as ISchedule).SCHED_ENDTIME).toISOString()
            }
        }

        const addedSubject: AddedSubjectType = {
            ...subject,
            SUB_INDEX: addedSubjects.length,
            valid: true,
        }


        setAddedSubjects(addSubject => ([
            ...addSubject,
            addedSubject
        ]))

        // reset() //Reset after submit through useEffect
        setValue('SUB_CODE', "")
        setValue('SUB_DESCRIPTION', "")
        setValue('SUB_EDP_CODE', "")
        setUpdateWeeks([])
    }

    const uploadOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files === null) return 

        Papa.parse(e.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: (result) => {
                setUploadType("single")
                try {
                    const subjectInputs = result.data as Array<ISubjectCSV>
                    //If the subjectInput column are incorrect

                    console.log(subjectInputs)

                    const subject: Array<AddedSubjectType> = subjectInputs.map((subjectInput, ind) => {

                        // On the map, check individually if subject is valid or invalid
                        let errors: Array<"error/code-exists" | "error/invalid-user-id" | "error/user-not-teacher" | "error/invalid-date/start-time" | "error/invalid-date/end-time" | "error/no-days-assigned" | "error/invalid-days"> = [];

                        //If subject added exist in the database or list
                        if ([...getSubjects(), ...addedSubjects,].find(subject => subject.SUB_EDP_CODE === subjectInput.EDP_Code)) {
                            errors.push("error/code-exists")
                        }

                        // // If user input does not provide a user
                        if ((subjectInput.Instructor_Id.trim() !== "" && subjectInput.Instructor_Id !== "N/A") && getUser(subjectInput.Instructor_Id) === undefined) { //If userId does not exist in the database
                            errors.push("error/invalid-user-id")
                        }
                        else if (getUser(subjectInput.Instructor_Id) && !(getUser(subjectInput.Instructor_Id)?.ROLE_ID as UserRole).teacher) {
                            errors.push("error/user-not-teacher")
                        }

                        if (!dayjs(subjectInput.Start_Time, "hh:mm:ss A", true).isValid()) {
                            errors.push("error/invalid-date/start-time")
                        }

                        if (!dayjs(subjectInput.End_Time, "hh:mm:ss A", true).isValid()) {
                            errors.push("error/invalid-date/end-time")
                        }

                        //If week days input is an invalid input
                        console.log(subjectInput.Weekdays_Assigned === "")
                        if (subjectInput.Weekdays_Assigned === "" || subjectInput.Weekdays_Assigned.split(/[,\s]\s*/).length === 0) {
                            errors.push("error/no-days-assigned")
                        }

                        const transformedSubject: AddedSubjectType = {
                            SUB_INDEX: addedSubjects.length + ind,
                            SUB_EDP_CODE: errors.some(error => error === "error/code-exists") ? "error/code-exists" : subjectInput.EDP_Code, // error/code-exists
                            SUB_CODE: subjectInput.Course_Code,
                            SUB_DESCRIPTION: subjectInput.Descriptive_Title,
                            USER_ID: errors.some(error => error === "error/invalid-user-id") ? "error/invalid-user-id" : errors.some(error => error === "error/user-not-teacher") ? "error/user-not-teacher" : subjectInput.Instructor_Id.trim() !== "" && subjectInput.Instructor_Id !== "N/A" ? subjectInput.Instructor_Id : null, // error/invalid-user-id or error/user-not-teacher
                            SCHED_ID: {
                                SCHED_STARTTIME: errors.some(error => error === "error/invalid-date/start-time") ? "error/invalid-date/start-time" : dayjs(subjectInput.Start_Time, "HH:mm:ss A").toISOString(), // error/invalid-date
                                SCHED_ENDTIME: errors.some(error => error === "error/invalid-date/end-time") ? "error/invalid-date/end-time" : dayjs(subjectInput.End_Time, "HH:mm:ss A").toISOString(), // error/invalid-time 
                                SCHED_WEEKASSIGNED: errors.some(error => error === "error/no-days-assigned") ? ["error/no-days-assigned"] : subjectInput.Weekdays_Assigned.split(/[,\s]\s*/), // error/no-days-assigned
                            } as ISchedule,
                            valid: errors.length === 0,
                        }

                        console.log(transformedSubject)

                        return transformedSubject
                    })

                    //console.log(subject)

                    setAddedSubjects((prevSubject) => [
                        ...prevSubject,
                        ...subject
                    ])
                } catch (error) {
                    console.error(error)
                }
            }
        })
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset()
        }
    }, [isSubmitSuccessful])

    const role = getCurrentUser()?.ROLE_ID as UserRole

    const filteredSubjects = addedSubjects.filter(subject => isValid === "valid" ? subject.valid : !subject.valid)

    const instructors = (instructorArray: Array<IUser>) => {
        const optionArray = instructorArray.map((el): {label: string; value: string} => ({
            label: el.USER_FULLNAME!,
            value: el.USER_ID!
        }))

        optionArray.push({
            label: "No instructor",
            value: ""
        })

        return optionArray
    }

    const inputsArray: Array<{
        name: string,
        label: string,
        rules: Omit<RegisterOptions<ISubject, any>, "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"> | undefined,
        type: 'text' | 'number' | 'dropdown' | 'range' | 'week',
        options?: Array<{label: string; value: string;}>
    }> = [
        {
            name: "SUB_EDP_CODE",
            label: "EDP Code",
            rules: {
                required: "Subject EDP Code is required!",
                pattern:{
                    value: /^(0|[1-9]\d*)(\.\d+)?$/,
                    message: "Subject EDP Code must be a number!"
                },
            },
            type: 'text'
        },
        {
            name: "SUB_CODE",
            label: "Course Code",
            rules: {
                required: "Subject Course Code is required!",
            },
            type: 'text'
        },
        {
            name: "SUB_DESCRIPTION",
            label: "Description",
            rules: {
                required: "Subject description is required!",
            },
            type: 'text'
        },
        {
            name: "USER_ID",
            label: "Instructor",
            rules: undefined,
            type: 'dropdown',
            options: instructors(role.admin ? getTeachers() : getUsersByCreator(getCurrentUser()?.USER_ID as string).filter(user => (user.ROLE_ID as UserRole).teacher)),
        },
    ]

    return (
        <DialogMessage
        open={openModal}
        PaperProps={{
            sx: {
                height: 720
            }
        }}
        maxWidth="lg"
        title={title}>
            <DialogMessage.Body>
                <Grid
                // height={'98%'}
                spacing={2}
                container>
                    <Grid
                    item
                    xs={12}
                    md={6}>
                        <Typography variant="h6" marginBottom={1}>Subject Input</Typography>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }} marginBottom={1}>
                            <Tabs
                            variant="scrollable"
                            scrollButtons="auto"
                            value={uploadType}
                            onChange={uploadTypeHandler}>
                                <Tab
                                value={"single"}
                                label={"Subject Form"}
                                wrapped/>
                                <Tab
                                value={"multiple"}
                                label={"Batch Upload"}
                                wrapped/>
                            </Tabs>
                        </Box>

                        {/* Make a div tab for form and batch upload */}
                        <Box
                        hidden={uploadType !== "single"}
                        component="form"
                        onSubmit={handleSubmit(updateSubject ? updateSubjectHandler : addSubject)}
                        onReset={() => {
                            if (updateSubject) {
                                setUpdateSubject(false)
                            }

                            reset()
                            setUpdateWeeks([])
                        }}>
                            {inputsArray.map(input => {

                                return (
                                    input.type === "dropdown" ? <>
                                        <DropDown
                                        placeholderLabel={input.label}
                                        name="USER_ID"
                                        control={control}
                                        rules={input.rules}
                                        fullWidth
                                        size="small"
                                        variant="standard"
                                        options={input.options}/>
                                    </> : <>
                                        <ControlledTextField
                                        type={input.type}
                                        name={input.name}
                                        control={control}
                                        size="small"
                                        fullWidth
                                        rules={input.rules}
                                        placeholder={input.label}
                                        variant="standard"/>
                                    </>
                                )
                            })}

                            <FormControl
                            fullWidth>
                            <FormLabel component="legend">Schedule</FormLabel>
                            <Box
                            display='flex'
                            paddingY={1}
                            gap={2}
                            alignItems='center'>
                                <TimePickerControlled
                                name="SCHED_ID.SCHED_STARTTIME"
                                label={"Start Time"}
                                rules={{
                                    required: "Set a starting hour of the subject",
                                }}
                                fullWidth
                                control={control}/>

                                <ArrowForwardOutlined />

                                <TimePickerControlled
                                name="SCHED_ID.SCHED_ENDTIME"
                                label={"End Time"}
                                rules={{
                                    required: "Set an ending hour of the subject",
                                    validate: (value) => {
                                        const endTime = dayjs(value as Date)
                                        const startTime = dayjs(watch('SCHED_ID.SCHED_STARTTIME') as Date)

                                        return endTime.isAfter(startTime) || "Ending hour must be after start hour"
                                    }
                                }}
                                fullWidth
                                control={control}/>
                            </Box>
                            </FormControl>

                            <Week
                            updateWeeks={updateWeeks}
                            name="SCHED_ID.SCHED_WEEKASSIGNED"
                            control={control}
                            setValue={setValue}/>

                            <Box
                            display={'flex'}
                            gap={2}
                            flexDirection={'row'}
                            justifyContent={'flex-end'}
                            marginTop={2}>
                                {updateSubject ? (
                                    <>
                                        <Button
                                        type="reset"
                                        color="error"
                                        variant="outlined">
                                            Cancel
                                        </Button>
                                        <Button
                                        type="submit"
                                        variant="outlined"
                                        color="secondary">
                                            Update
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button
                                        type="reset"
                                        color="error"
                                        variant="outlined">
                                            Reset
                                        </Button>
                                        <Button
                                        type="submit"
                                        variant="outlined">
                                            Add
                                        </Button>
                                    </>
                                )}
                            </Box>
                        </Box>

                        <Box
                        hidden={uploadType !== "multiple"}>
                            <Button
                            LinkComponent={'a'}
                            href={process.env.PUBLIC_URL + '/subjectTemplate.csv'}
                            download={"Subject_CSV_Template.csv"}
                            variant="outlined">
                                Download CSV Template
                            </Button>
                            <Button
                            component="label"
                            role={undefined}
                            variant="contained">
                                Upload a CSV File
                                <VisuallyHiddenInput
                                onChange={uploadOnChangeHandler}
                                type='file'
                                accept=".csv"/>
                            </Button>
                        </Box>
                    </Grid>
                    <Grid
                    item
                    xs={12}
                    height={'inherit'}
                    md={6}>
                        <Typography variant="h6" marginBottom={1}>Added Subjects</Typography>
                        {/* Tab */}
                        <Box
                        display={'flex'}
                        borderBottom={1}
                        borderColor={'divider'}
                        marginBottom={1}>
                            <Tabs
                            variant="scrollable"
                            scrollButtons="auto"
                            value={isValid}
                            onChange={validSubjectHandler}>
                                <Tab
                                value={'valid'}
                                label={"Valid Inputs"}
                                wrapped/>
                                <Tab
                                value={'invalid'}
                                label={"Invalid Inputs"}
                                wrapped/>
                            </Tabs>
                            <Box
                            display={'flex'}
                            alignItems={'center'}
                            justifyContent={'right'}
                            gap={1}
                            flex={1}>
                                { activateCheckbox ? (
                                    <>
                                        <Button
                                        onClick={removeSubjectsToBeDeleted}
                                        size="small"
                                        color="primary">
                                            {`Delete ${subjectsToBeDeleted.length} Subjects`}
                                        </Button>
                                        <Button
                                        onClick={closeCheckbox}
                                        size="small"
                                        color="error">
                                            Cancel
                                        </Button>
                                    </>
                                ) : (
                                    <Button
                                    onClick={openCheckbox}
                                    size="small"
                                    color="error">
                                        Remove Subjects
                                    </Button>
                                ) }
                            </Box>
                        </Box>

                        <Box
                        height={400}>
                            <AddSubjectModalDataGrid
                            updateSubject={updateSelectedSubject}
                            addSubjectsToBeDeleted={addSubjectsToBeDeleted}
                            activateCheckBox={activateCheckbox}
                            addedSubjects={filteredSubjects}/> 
                        </Box>

                        {/* <Stack
                        overflow={'auto'}
                        height={'inherit'}
                        gap={1}>
                            {addedSubjects.map((el, ind) => {
                                return (
                                    <SubjectCard
                                    key={ind}
                                    subject={el}
                                    onClose={() => {
                                        removeAddedSubjectHandler(el)
                                    }}/>
                                )
                            })}
                        </Stack> */}
                    </Grid>
                </Grid>
            </DialogMessage.Body>
            <DialogMessage.Footer>
                <Button
                color="error"
                variant="contained"
                onClick={() => {
                    closeModal()
                    reset()
                    setActivateCheckbox(false)
                    setUpdateSubject(false)
                    setUpdateWeeks([])
                    setAddedSubjects([])
                }}>
                    CANCEL
                </Button>
                <Button
                type="submit"
                variant="contained"
                onClick={() => { 
                    //onSubmit(addedSubjects)
                    if (addedSubjects.filter(subject => subject.valid).length === 0) {
                        setMessage('Submission requires at least one valid subject')
                        openErrorSnackbar()
                        return
                    }

                    openVerifySubmission()
                }}>
                    SUBMIT
                </Button>
            </DialogMessage.Footer>

            <DialogMessage
            open={verifySubmission}
            title="Are you want to submit the subjects?">
                <DialogMessage.Body>
                    <Typography variant="body1"  marginBottom={1}>
                        {`You have ${addedSubjects.filter(subject => subject.valid).length} of valid subjects to be submitted and ${addedSubjects.filter(subject => !subject.valid).length} of invalid subjects.`}
                    </Typography>
                    <Typography variant="body1">
                        Once submitted, all invalid subjects will be discarded. Do you wish to continue?
                    </Typography>
                </DialogMessage.Body>
                <DialogMessage.Footer>
                    <Button
                    color="error"
                    onClick={() => {
                        closeVerifySubmission()
                    }}>
                        No
                    </Button>
                    <Button
                    color="primary"
                    onClick={() => {
                        closeVerifySubmission()
                        setAddedSubjects([])
                        onSubmit(addedSubjects.filter(subject => subject.valid))
                    }}>
                        Yes
                    </Button>
                </DialogMessage.Footer>
            </DialogMessage>

            <SnackBar
            message={message}
            onClose={closeErrorSnackbar}
            open={errorSnackbar}
            severity="error"/>

        </DialogMessage>
    )
}

export default AddSubjectModal