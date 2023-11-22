import { 
    Typography,
    Grid,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    CircularProgress,
    Box,
} from "@mui/material";
import React from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import { FixMeLater } from "../../types/FixMeLater";
import FormInputTextField from "../TextField/FormInputTextField";
import { FilledInputProps, InputProps, OutlinedInputProps } from "@mui/material"
import { LoginFormCredential } from "../../types/LoginFormCredential";
import { LoginFormInput } from "../../types/LoginFormInput";
import { RegisterFormInput } from "../../types/RegisterFormInput";

type UserFormProps = {
    title: string | null
    type: "register" | "login" | "institution"
    submitName?: string
    children?: React.ReactNode
    inputs: Array<LoginFormInput | RegisterFormInput>
    control?: Control<FieldValues> | undefined
    onSubmit: React.FormEventHandler<HTMLFormElement> | undefined
    loading?: boolean | undefined
}

const UserForm = ({
    title,
    type,
    submitName = "Submit",
    children,
    inputs,
    onSubmit,
    loading,
    control, //Prop drilled
}: UserFormProps) => {

    return (
        <Box
        sx={{
            backgroundColor: "#FFFFFF",
            borderRadius: 4,
            paddingLeft: 6,
            paddingRight: 6,
            paddingTop: 4,
            paddingBottom: 4
        }}>
            <Grid
            onSubmit={onSubmit}
            component="form"
            container
            maxWidth="sm"
            spacing={1}
            noValidate>
                {title !== "" && (
                    <Grid item xs={12} marginBottom={2}>
                        <Typography variant="h5" component="h5" textAlign={"center"} fontWeight={600}>{title}</Typography>
                    </Grid>
                )}

                {inputs.map((el, ind: FixMeLater) => (
                    <Grid key={ind} item xs={type === "register" && (el.key === "firstName" || el.key === "lastName") ? 6 : 12}>
                        <FormInputTextField
                        name={el.key}
                        control={control}
                        rules={el.rules}
                        label={el.label}
                        rows={el.rows}
                        variant='outlined'
                        type={el.type}
                        InputProps={el.icon}
                        fullWidth/>
                    </Grid>
                ))}

                {type === "register" && (
                <Grid item xs={12} marginBottom={0}>
                    <FormControlLabel control={
                        <Controller 
                        name={"agree"}
                        control={control}
                        render={({field: {value, onBlur, onChange}}) => <Checkbox checked={value} onChange={onChange} onBlur={onBlur}/>}/>
                    }
                    label="Agree with Terms and Conditions" />
                </Grid>
                )}
                
                <Grid item xs={12} marginTop={2}>
                    <Button fullWidth type="submit" size="large" variant="contained" disabled={loading}>
                        {loading ? <CircularProgress size={26}/> : submitName}
                    </Button>
                </Grid>

                {children}
            </Grid>
        </Box>
    )
}

export default UserForm