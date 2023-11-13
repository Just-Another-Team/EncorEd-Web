import { 
    Typography,
    Grid,
    TextField,
    Button,
    Checkbox,
    FormControlLabel
} from "@mui/material";
import React from "react";

const InstitutionForm = () => {
    return(
        <Grid
        component="form"
        container
        maxWidth="sm"
        sx={{
            backgroundColor: "#FFFFFF",
            borderRadius: 4,
            padding: 3
        }}>
            {/* In array */}
            <Grid item xs={12} marginBottom={2}>
                <Typography variant="h5" component="h5" textAlign={"center"}>Create Institution</Typography>
            </Grid>
            <Grid item xs={12} marginBottom={1}>
                <TextField fullWidth label="Institution name" helperText="Error"/>
            </Grid>
            <Grid item xs={12} marginBottom={3}>
                <TextField fullWidth multiline label="Description" helperText="Error" rows={4}/>
            </Grid>
            <Grid item xs={12}>
                <Button fullWidth size="large" variant="contained">SUBMIT</Button>
            </Grid>
        </Grid>
    )
}

export default InstitutionForm