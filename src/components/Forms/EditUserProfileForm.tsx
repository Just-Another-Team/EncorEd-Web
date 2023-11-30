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

type EditUserProfileProps = {
    title: string | null,
    type: "edituserprofile",
    submitName?: string,
    inputs: FixMeLater,
    control: string | any,
    onSubmit: React.FormEventHandler<HTMLFormElement> | undefined,
    loading?: boolean | undefined,
}

const EditUserProfileForm = ({
    title,
    type, 
    submitName = "Confirm", 
    inputs,
    control,
    onSubmit,
    loading,
}: EditUserProfileProps) => {
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

export default EditUserProfileForm