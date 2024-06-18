import { Box, Button, CircularProgress, Grid, Stack, Typography } from "@mui/material"
import DialogMessage from "../../components/DialogMessage"
import { Controller, RegisterOptions, useForm } from "react-hook-form";
import IUser, { UserRole } from "../../data/IUser";
import ControlledTextField from "../../components/TextFieldControlled/input";
import DropDown from "../../components/DropDown";
import useDepartment from "../../hooks/useDepartment";
import useRole from "../../hooks/useRole";
import { ChangeEvent, useEffect, useState } from "react";
import IDepartment from "../../data/IDepartment";
import IRole from "../../data/IRole";
import { useUsers } from "../../hooks/useUsers";
import Cropper, { Area } from "react-easy-crop";
import { cropImage } from "../../helper/cropUtils";
import { useModal } from "../../hooks/useModal";
import Color from "../../assets/Color";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../app/firebase/config";
import { FixMeLater } from "../../types/FixMeLater";
import { useSubject } from "../../hooks/useSubject";

type AddUserType = {
    selectedUser?: IUser | undefined;
    onSubmit: (data: IUser) => void
    openModal: boolean;
    loading: boolean;
    title: string;
    closeModal: () => void
}

type InputUser = {
    USER_CONFIRMPASSWORD: string | null,
} & IUser

type InputType = {
    name: "USER_ID" | "USER_FULLNAME" | "USER_FNAME" | "USER_LNAME" | "USER_MNAME" | "USER_EMAIL" | "USER_USERNAME" | "USER_PASSWORD" | "USER_CONFIRMPASSWORD" | "ROLE_ID" | "DEPT_ID" | "USER_ISDELETED" | "USER_ATTENDANCECHECKERSCHEDULE" | "USER_IMAGE"
    label: string
    rules: Omit<RegisterOptions<InputUser, any>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"> | undefined
    type: 'text' | 'dropdown' | 'password' | 'email' | 'image',
    options?: Array<{ value: string; label: string }>,
    disabled?: boolean
    defaultValue?: string | undefined
}

const UserForm = ({
    selectedUser,
    loading,
    onSubmit,
    openModal,
    title,
    closeModal
}: AddUserType) => {
    const { departments } = useDepartment();
    const { getCurrentUser } = useUsers()
    const { removeAssignedTeacher } = useSubject()

    const role = getCurrentUser()?.ROLE_ID as UserRole

    const { control, handleSubmit, reset, watch, setValue, setError, resetField } = useForm<InputUser>({
        defaultValues: {
            USER_FNAME: null,
            USER_LNAME: null,
            USER_MNAME: null,
            USER_EMAIL: null,
            USER_USERNAME: null,
            USER_PASSWORD: null,
            USER_CONFIRMPASSWORD: null,
            DEPT_ID: role.admin ? "" : getCurrentUser()?.DEPT_ID as string,
            ROLE_ID: "",
            USER_ATTENDANCECHECKERSCHEDULE: "",
            USER_IMAGE: "",
        }
    });

    const {
        openModal: isCropperOpen,
        handleOpenModal: openCropper,
        handleCloseModal: closeCropper
    } = useModal()

    const [oldImage, setOldImage] = useState<string>("");
    const [crop, setCrop] = useState({x: 0, y: 0})
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

    useEffect(() => {
        if (selectedUser) {
            const role = selectedUser?.ROLE_ID as UserRole
            const department = selectedUser?.DEPT_ID as IDepartment

            setValue('USER_FNAME', selectedUser?.USER_FNAME)
            setValue('USER_MNAME', selectedUser?.USER_MNAME)
            setValue('USER_LNAME', selectedUser?.USER_LNAME)
            setValue('USER_EMAIL', selectedUser?.USER_EMAIL)
            setValue('USER_USERNAME', selectedUser?.USER_USERNAME)
            setValue('USER_PASSWORD', selectedUser?.USER_PASSWORD)
            setValue('DEPT_ID', department !== null ? department.DEPT_ID as string : "")
            setValue('ROLE_ID', role.campusDirector ? "campusDirector" : role.dean ? "dean"  : role.attendanceChecker ? "attendanceChecker" : role.teacher ? "teacher" : "" )
            setValue('USER_ATTENDANCECHECKERSCHEDULE', selectedUser?.USER_ATTENDANCECHECKERSCHEDULE)
            //setValue('ROLE_ID', role.campusDirector ? "campusDirector" : role.dean ? "dean"  : role.attendanceChecker ? "attendanceChecker" : role.teacher ? "teacher" : "" )
        
            getDownloadURL(ref(storage, `${selectedUser.USER_ID!}.jpg`))
                .then((result) => {
                    setValue('USER_IMAGE', result)
                    setOldImage(result)
                })
                .catch((error) => {
                    console.log("No image")
                })
        }
    }, [selectedUser])

    const roleOptions = [
        {
            value: "campusDirector",
            label: "Campus Director"
        },
        {
            value: "dean",
            label: "Dean"
        },
        {
            value: "teacher",
            label: "Teacher"
        },
        {
            value: "attendanceChecker",
            label: "Attendance Checker"
        },
    ]

    const campusDirectorRoleOptions = [
        {
            value: "dean",
            label: "Dean"
        },
        {
            value: "teacher",
            label: "Teacher"
        },
        {
            value: "attendanceChecker",
            label: "Attendance Checker"
        },
    ]

    const deanRoleOptions = [
        {
            value: "teacher",
            label: "Teacher"
        },
        {
            value: "attendanceChecker",
            label: "Attendance Checker"
        },
    ]

    const attendanceSchedule = [
        {
            value: "morning",
            label: "Morning",
        },
        {
            value: "afternoon",
            label: "Afternoon",
        },
        {
            value: "fullDay",
            label: "Whole day",
        }
    ]

    const departmentOptions = departments?.map((department) => ({
        value: department.DEPT_ID!,
        label: department.DEPT_NAME!
    }))

    const inputs = (): Array<InputType> => {
        return  [
            // Image
            {
                name: 'USER_IMAGE',
                label: "User Profile Picture",
                rules: undefined,
                type: "image"
            },
            {
                name: 'USER_FNAME',
                label: "First name",
                rules: {
                    required: "First name is required",
                },
                type: "text"
            },
            {
                name: 'USER_EMAIL',
                label: "Email",
                rules: {
                    required: "Email is required",
                },
                type: "email"
            },
            {
                name: 'USER_LNAME',
                label: "Last name",
                rules: {
                    required: "Last name is required",
                },
                type: "text"
            },
            {
                name: 'USER_USERNAME',
                label: "Username",
                rules: {
                    required: "Username is required",
                },
                type: "text"
            },
            {
                name: 'USER_MNAME',
                label: "Middle name",
                rules: {},
                type: "text"
            },
            {
                name: 'USER_PASSWORD',
                label: "Password",
                rules: {
                    required: watch("ROLE_ID") !== "teacher" ? "Password is required" : undefined,
                    minLength: watch("ROLE_ID") !== "teacher" ? {
                        value: 8,
                        message: "Password must have at least 8 characters"
                    } : undefined
                },
                type: "password",
                disabled: watch("ROLE_ID") === "teacher" ? true : false
            },
            {
                name: 'USER_CONFIRMPASSWORD',
                label: "Confirm Password",
                rules: {
                    validate: (value) => {
                        const password = watch('USER_PASSWORD') ? watch('USER_PASSWORD') : null
                        return password === value || "Passwords do not match"
                    },
                },
                type: "password",
                disabled: watch("ROLE_ID") === "teacher" ? true : false
            },
            {
                name: 'DEPT_ID',
                label: "Department",
                rules: {
                    required: "Department is required",
                },
                type: "dropdown",
                options: departmentOptions,
                disabled: !(role.admin || role.campusDirector) ? true : false,
                defaultValue: "",
            },
            {
                name: 'ROLE_ID',
                label: "Role",
                rules: {
                    required: "Role is required",
                },
                type: "dropdown",
                options: role.admin ? roleOptions : role.campusDirector ? campusDirectorRoleOptions : deanRoleOptions,
                defaultValue: "",
            },
            // Morning or Afternoon Schedule
            {
                name: 'USER_ATTENDANCECHECKERSCHEDULE',
                label: "Attendance Checker Schedule Availability",
                rules: {
                    required: watch("ROLE_ID") !== "attendanceChecker" ? undefined : "Attendance Checker Schedule Availability is required",
                },
                type: "dropdown",
                options: attendanceSchedule,
                disabled: watch("ROLE_ID") !== "attendanceChecker" ? true : false,
                defaultValue: ""
            },
        ]
    }

    const imageHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files !== null) {
            setValue('USER_IMAGE', URL.createObjectURL(e.target.files[0]))
            openCropper()
        }
    }

    const submitHandler = (data: InputUser) => {
        const inputData: IUser = {
            ...data,
            USER_IMAGE: oldImage === data.USER_IMAGE ? "" : data.USER_IMAGE
        }

        reset()
        onSubmit(inputData)
    }

    const onError = () => {
        // if (watch('USER_IMAGE') === "") setError('USER_IMAGE', { message: "Profile Picture is required" })
    }

    return (
        <>
            <DialogMessage
            open={openModal}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit(submitHandler, onError),
                onReset: () => {
                    closeModal()
                    reset()
                },
            }}
            maxWidth="md"
            title={title}>
                <DialogMessage.Body>
                    { loading ? 
                    <Stack
                    justifyContent={"center"}
                    alignItems={"center"}
                    padding={17.5}>
                        <CircularProgress
                        size={"4rem"}/>
                    </Stack> :
                    <Grid
                    container
                    columnSpacing={2}>
                        {inputs().map((input, ind) => (
                            input.type === "dropdown" ?
                            <Grid
                            key={input.name}
                            item
                            xs={12}>
                                <DropDown
                                disabled={input.disabled} //!(role.admin || role.campusDirector) && input.name === "DEPT_ID" ? true : false
                                variant="standard"
                                name={input.name}
                                control={control}
                                label={input.label}
                                defaultValue={input.defaultValue}
                                fullWidth
                                size="small"
                                rules={input.rules}
                                options={input.options}/>
                            </Grid> :
                            input.type === "image" ? //This is way too dirty. Fix this soon
                            <Grid
                            key={input.name}
                            item
                            marginBottom={1}
                            xs={12}>
                                <Typography variant="body2">User Profile Picture</Typography>
                                { !isCropperOpen ? 
                                <Controller
                                name="USER_IMAGE"
                                control={control}
                                render={({ field: { value }, fieldState: { error } }) => (
                                    <Box
                                    display={'flex'}
                                    flexDirection={'column'}
                                    alignItems={'center'}>
                                        <Box
                                        component="img"
                                        display={'block'}
                                        sx={{
                                            height: 288,
                                            width: 288,
                                            maxHeight: { xs: 288 },
                                            maxWidth: { xs: 288 },
                                        }}
                                        border={`2px solid`}
                                        borderColor={error ? "error" : Color('darkBlue', 400)}
                                        borderRadius={'50%'}
                                        alt="User profile picture"
                                        src={value === "" ? "/assets/profilepic.png" : value}
                                        />
                                        <Typography
                                        color="error"
                                        variant="subtitle2">
                                            { !!error && error.message }
                                        </Typography>
                                        <Button
                                        component="label"
                                        variant="contained"
                                        sx={{
                                            marginTop: 1
                                        }}>
                                            { watch('USER_IMAGE') === "" ? "Upload Profile Picture" : "Change Profile Picture" }
                                            <input type="file" accept="image/*" hidden onChange={imageHandler}/>
                                        </Button>
                                    </Box>
                                )}/> : 
                                <Box>
                                    <Box
                                    zIndex={2}
                                    height={288}
                                    marginBottom={1}
                                    position={'relative'}>
                                        <Cropper
                                        restrictPosition={true}
                                        cropShape="round"
                                        image={watch('USER_IMAGE')}
                                        crop={crop}
                                        onCropChange={setCrop}
                                        onCropComplete={(_, croppedAreaPixels) => {
                                            setCroppedAreaPixels(croppedAreaPixels)
                                        }}
                                        aspect={1}/>
                                    </Box>
                                    <Stack
                                    justifyContent={'center'}
                                    flexDirection={'row'}
                                    gap={2}>
                                        <Button
                                        variant="outlined"
                                        size="small"
                                        color="primary"
                                        onClick={() => {
                                            cropImage(watch('USER_IMAGE'), croppedAreaPixels, console.log).then((image) => {
                                                setValue('USER_IMAGE', image)
                                                closeCropper()
                                            })
                                        }}>
                                            Set Profile Picture
                                        </Button>
                                        <Button
                                        variant="outlined"
                                        size="small"
                                        color="error"
                                        onClick={() => {
                                            resetField('USER_IMAGE')
                                        }}>
                                            Cancel
                                        </Button>
                                    </Stack>
                                </Box>}
                            </Grid>:
                            <Grid
                            key={input.name}
                            item
                            xs={ input.type === "password" ? 3 : 6}>
                                <ControlledTextField
                                disabled={input.disabled} //watch("ROLE_ID") === "teacher" && input.type === "password" ? true : false
                                variant="standard"
                                key={input.name}
                                fullWidth
                                size="small"
                                control={control}
                                name={input.name}
                                label={input.label}
                                rules={input.rules}
                                type={input.type}/>
                            </Grid>
                        ))}
                    </Grid> }
                </DialogMessage.Body>
                <DialogMessage.Footer>
                    <Button
                    disabled={isCropperOpen}
                    color="error"
                    type="reset">
                        CANCEL
                    </Button>
                    <Button
                    disabled={isCropperOpen}
                    type="submit">
                        SUBMIT
                    </Button>
                </DialogMessage.Footer>
            </DialogMessage>
        </>
    )
}

export default UserForm