import { 
    Typography,
    Grid,
    TextField,
    Button,
    Checkbox,
    FormControlLabel
} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const UserForm = ({title, type, submitName = "SUBMIT", inputs, errors, control, onSubmit, handleSubmit}) => {
    return (
        <Grid
        onSubmit={handleSubmit(onSubmit)}
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
                    }} //-Give each controller the error
                    render={({field}) => (
                        <TextField
                        fullWidth
                        label={el.label}
                        type={el.type}
                        error={el.error ? true : false}
                        helperText={el.error ? el.error.message : null}
                        {...field}/>
                    )}/>
                </Grid>
            ))}

            {type === "register" && (
            <Grid item xs={12} marginBottom={1}>
                <FormControlLabel control={
                    <Controller 
                    name={"agree"}
                    control={control}
                    render={({field: {value, onBlur, onChange}}) => <Checkbox checked={value} onChange={onChange} onBlur={onBlur}/>}/>
                }
                label="Agree with Terms and Conditions" />
            </Grid>
            )}
            
            <Grid item xs={12} marginTop={3}>
                <Button fullWidth type="submit" size="large" variant="contained">{submitName}</Button>
            </Grid> 
        </Grid>
    )
}

export default UserForm