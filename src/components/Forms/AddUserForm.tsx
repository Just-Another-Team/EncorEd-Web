import { 
    Typography,
    Grid,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Box
} from "@mui/material";
import React from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import { FixMeLater } from "../../types/FixMeLater";
import { LoginFormInput } from "../../types/LoginFormInput";
import { RegisterFormInput } from "../../types/RegisterFormInput";

type UserFormProps = {
    title: string | null,
    type: "register" | "login" | "institution" | "usercreation",
    submitName?: string,
    inputs: Array<LoginFormInput | RegisterFormInput | any>,
    control?: Control<FieldValues> | undefined,
    onSubmit: React.FormEventHandler<HTMLFormElement> | undefined,
    loading?: boolean | undefined,
}

const AddUserForm = ({
    title,
    type,
    submitName = "CREATE",
    inputs,
    control,
    onSubmit,
}: UserFormProps) => {
    return (
        <Grid
        onSubmit={onSubmit}
        component="form"
        container
        maxWidth="sm"
        sx={{
            backgroundColor: "white",
            borderRadius: 4,
            paddingLeft: 6,
            paddingRight: 6,
            paddingTop: 4,
            paddingBottom: 4
        }}>
            {title !== "" && (
                <Grid item xs={12} marginBottom={2}>
                    <Typography variant="h5" component="h5" textAlign={"center"}>{title}</Typography>
                </Grid>
            )}

            
            {inputs.map((el, ind) => (
                <Grid key={ind} item xs={12} marginBottom={2}>
                    <Controller
                    name={el.key}
                    control={control}
                    rules={{
                        required: `${el.label} is required`
                    }}
                    render={({field}) => (
                        <TextField
                        fullWidth
                        label={el.label}
                        type={el.type}
                        sx={{backgroundColor:"white"}}
                        error={el.error ? true : false}
                        helperText={el.error ? el.error.message : null}
                        {...field}/>
                    )}/>
                </Grid>
            ))}
            
            <Grid item xs={12} marginTop={3}>
                <Button fullWidth type="submit" size="large" variant="contained">{submitName}</Button>
            </Grid> 
        </Grid>
    )
}

export default AddUserForm