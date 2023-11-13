import { 
    Typography,
    Grid,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    CircularProgress,
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
    title: string | null,
    type: "register" | "login" | "institution",
    submitName?: string,
    inputs: Array<LoginFormInput | RegisterFormInput>,
    control?: Control<FieldValues> | undefined,
    onSubmit: React.FormEventHandler<HTMLFormElement> | undefined,
    loading?: boolean | undefined,
}

const UserForm = ({
    title,
    type,
    submitName = "Submit",
    inputs,
    onSubmit,
    loading,
    control, //Prop drilled
}: UserFormProps) => {

    return (
        <Grid
        onSubmit={onSubmit}
        component="form"
        container
        maxWidth="sm"
        sx={{
            backgroundColor: "#FFFFFF",
            borderRadius: 4,
            paddingLeft: 6,
            paddingRight: 6,
            paddingTop: 4,
            paddingBottom: 4
        }}
        noValidate>
            {title !== "" && (
                <Grid item xs={12} marginBottom={2}>
                    <Typography variant="h5" component="h5" textAlign={"center"} fontWeight={600}>{title}</Typography>
                </Grid>
            )}

            {inputs.map((el, ind: FixMeLater) => (
                <Grid key={ind} item xs={12} marginBottom={2}>

                    {/* Must be in a component */}
                    {/* <Controller
                    name={el.key}
                    control={control}
                    rules={el.rules} //-Give each controller the error
                    render={({field}) => (
                        <TextField
                        fullWidth
                        label={el.label}
                        type={el.type}
                        error={el.error ? true : false}
                        multiline={el.rows > 0 ? true : false}
                        rows={el.rows}
                        helperText={el.error ? el.error.message : null}
                        {...field}/>
                    )}/> */}

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
        </Grid>
    )
}

export default UserForm