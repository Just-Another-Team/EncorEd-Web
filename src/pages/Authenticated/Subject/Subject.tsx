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
import SubjectTabPanel from "./SubjectPanelTab";
import SubSummary from "./pages/Summary";
import SubList from "./pages/SubjectList";
import SchedSubList from "./pages/ScheduledSubject";
import SubRequest from "./pages/Request";
import { FixMeLater } from "../../../types/FixMeLater";
import { Outlet } from "react-router-dom";
import CustomTab from "../../../components/Tab/CustomTab";
import { Link } from "react-router-dom";

const Subject = () => {
    const [page, setPage] = React.useState(0);

    const handleChange = (event: FixMeLater, newValue: FixMeLater) => {
        setPage(newValue);
    };

    return(
        <>
            <Typography variant="h4" fontWeight={700} marginBottom={1}>
                Subjects
            </Typography>
            
            {/* Add and Search Subject */}
            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} marginBottom={1}>
                <Button variant="contained" size="large">ADD SUBJECT</Button>
                <Grid container xs={4}>
                    <TextField label="Search Subject" fullWidth/>
                </Grid>
            </Box>

            {/* Tabs */}
            <Box marginBottom={2} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={page} onChange={handleChange} aria-label="basic tabs example">
                    <CustomTab label="Summary" component={Link} to=""/>
                    <CustomTab label="Subject List" component={Link} to="list"/>
                    <CustomTab label="Scheduled Subject" component={Link} to="schedule"/>
                    <CustomTab label="Request" component={Link} to="request"/>
                </Tabs>
            </Box>

            <Outlet />
        </>
    )
}

export default Subject