import { Button, CircularProgress, Grid, Stack } from "@mui/material"
import DialogMessage from "../../components/DialogMessage"
import { RegisterOptions, useForm } from "react-hook-form";
import IUser from "../../data/IUser";
import ControlledTextField from "../../components/TextFieldControlled/input";
import DropDown from "../../components/DropDown";
import useDepartment from "../../hooks/useDepartment";
import useRole from "../../hooks/useRole";
import { useEffect } from "react";
import IDepartment from "../../data/IDepartment";
import IRole from "../../data/IRole";

type AddUserType = {
    selectedUser?: IUser | undefined;
    onSubmit: (data: IUser) => void
    openModal: boolean;
    loading: boolean;
    closeModal: () => void
}

type InputUser = {
    USER_CONFIRMPASSWORD: string | null
} & IUser

type InputType = {
    name: "USER_ID" | "USER_FULLNAME" | "USER_FNAME" | "USER_LNAME" | "USER_MNAME" | "USER_EMAIL" | "USER_USERNAME" | "USER_PASSWORD" | "USER_CONFIRMPASSWORD" | "ROLE_ID" | "DEPT_ID" | "USER_ISDELETED"
    label: string
    rules: Omit<RegisterOptions<InputUser, any>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled">
    type: 'text' | 'dropdown' | 'password' | 'email'
}

const UserForm = ({
    selectedUser,
    loading,
    onSubmit,
    openModal,
    closeModal
}: AddUserType) => {
    const { departments } = useDepartment();
    const { roles } = useRole();

    const { control, handleSubmit, reset, watch, setValue } = useForm<InputUser>({
        defaultValues: {
            USER_FNAME: null,
            USER_LNAME: null,
            USER_MNAME: null,
            USER_EMAIL: null,
            USER_USERNAME: null,
            USER_PASSWORD: null,
            USER_CONFIRMPASSWORD: null,
            DEPT_ID: undefined,
            ROLE_ID: undefined,
        }
    });

    const inputs: Array<InputType> = [
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
                required: "Password is required",
                minLength: {
                    value: 8,
                    message: "Password must have at least 8 characters"
                }
            },
            type: "password"
        },
        {
            name: 'USER_CONFIRMPASSWORD',
            label: "Confirm Password",
            rules: {
                validate: (value) => watch('USER_PASSWORD') === value || "Passwords do not match",
            },
            type: "password"
        },
        {
            name: 'DEPT_ID',
            label: "Department",
            rules: {
                required: "Department is required",
            },
            type: "dropdown"
        },
        {
            name: 'ROLE_ID',
            label: "Role",
            rules: {
                required: "Role is required",
            },
            type: "dropdown"
        }
    ]

    useEffect(() => {
        if (selectedUser) {
            setValue('USER_FNAME', selectedUser?.USER_FNAME)
            setValue('USER_MNAME', selectedUser?.USER_MNAME)
            setValue('USER_LNAME', selectedUser?.USER_LNAME)
            setValue('USER_EMAIL', selectedUser?.USER_EMAIL)
            setValue('USER_USERNAME', selectedUser?.USER_USERNAME)
            setValue('USER_PASSWORD', selectedUser?.USER_PASSWORD)
            setValue('DEPT_ID', (selectedUser?.DEPT_ID as IDepartment).DEPT_ID!)
            // setValue('ROLE_ID', (selectedUser?.ROLE_ID as IRole).ROLE_ID!)
        }
    }, [selectedUser])

    const roleOptions = roles?.map((role) => ({
        value: role.ROLE_ID!,
        label: role.ROLE_LABEL!
    }))

    const departmentOptions = departments?.map((department) => ({
        value: department.DEPT_ID!,
        label: department.DEPT_NAME!
    }))

    const submitHandler = (data: InputUser) => {
        reset()
        onSubmit(data as IUser)
    }

    return (
        <DialogMessage
        open={openModal}
        PaperProps={{
            component: 'form',
            onSubmit: handleSubmit(submitHandler),
            onReset: () => {
                closeModal()
                reset()
            },
        }}
        maxWidth="md"
        title="Add Staff">
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
                    {inputs.map((input, ind) => (
                        input.type === "dropdown" ?
                        <Grid
                        key={input.name}
                        item
                        xs={12}>
                            <DropDown
                            variant="standard"
                            name={input.name}
                            control={control}
                            label={input.label}
                            defaultValue={undefined}
                            fullWidth
                            size="small"
                            rules={input.rules}
                            options={input.name === "ROLE_ID" ? roleOptions : input.name === "DEPT_ID" ? departmentOptions : undefined }/>
                        </Grid> :
                        <Grid
                        key={input.name}
                        item
                        xs={ input.type === "password" ? 3 : 6}>
                            <ControlledTextField
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
                color="error"
                type="reset">
                    CANCEL
                </Button>
                <Button
                type="submit">
                    SUBMIT
                </Button>
            </DialogMessage.Footer>
        </DialogMessage>
    )
}

export default UserForm