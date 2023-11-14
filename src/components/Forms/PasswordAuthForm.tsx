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
import { Controller, Control, FieldValues } from "react-hook-form";
import { LoginFormInput } from "../../types/LoginFormInput";
import { FixMeLater } from "../../types/FixMeLater";
import FormInputTextField from "../TextField/FormInputTextField";

type PasswordAuthProps = {
    title: string | null,
    type: "verifypassword",
    submitName?: string,
    inputs: FixMeLater,
    control: string | any,
    onSubmit: React.FormEventHandler<HTMLFormElement> | undefined,
    loading?: boolean | undefined,
}

const PasswordAuthForm = ({
    title,
    type, 
    submitName = "Confirm", 
    inputs,
    control,
    onSubmit,
    loading,
}: PasswordAuthProps) => {
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
                {inputs.map((el: FixMeLater, ind: FixMeLater) => (
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
            
            
            <Grid item xs={12} marginTop={2}>
                <Button fullWidth type="submit" size="large" variant="contained" disabled={loading}>
                    {loading ? <CircularProgress size={26}/> : submitName}
                </Button>
            </Grid> 
        </Grid>
    )
}

export default PasswordAuthForm