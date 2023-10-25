import React from "react";
import { 
    Box,
    Tabs,
    Typography,
    Tab,
    Button,
    TextField,
    Grid
} from "@mui/material";
import InstitutionTabPanel from "./InstitutionPanelTab";
import { useSelector } from "react-redux";

const Institution = () => {
    const userInstitution = useSelector(state => state.institution.data)
    const [page, setPage] = React.useState(0);

    const handleChange = (event, newValue) => {
        setPage(newValue);
    };

    return(
        <>
            <Typography variant="h4" fontWeight={700} marginBottom={1}>
                {userInstitution ? userInstitution.name : "Institution"}
            </Typography>
            
            {/* Add and Search Subject */}
            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} marginBottom={1}>
                <Button variant="contained" size="large">CREATE INSTITUTION</Button>
                <Grid container xs={4}>
                    <TextField label="Search Institution" fullWidth/>
                </Grid>
            </Box>

            {/* Tabs */}
            <Box marginBottom={2} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={page} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Summary" />
                </Tabs>
            </Box>
        </>
    )
}

export default Institution