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
import { useSelector } from "react-redux";
import { useAppSelector } from "../../../app/encored-store-hooks";
import { FixMeLater } from "../../../types/FixMeLater";

const Institution = () => {
    const [page, setPage] = React.useState(0);

    const handleChange = (event: FixMeLater, newValue: FixMeLater) => {
        setPage(newValue);
    };

    return(
        <>
            <Typography variant="h4" fontWeight={700} marginBottom={1}>
                Institution
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