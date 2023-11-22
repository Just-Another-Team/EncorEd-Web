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
import { Outlet, useNavigate, useParams } from "react-router-dom";
import CustomTab from "../../../components/Tab/CustomTab";
import { Link } from "react-router-dom";

const Subject = () => {
    const navigate = useNavigate();

    const { institution } = useParams();

    const [page, setPage] = React.useState(0);

    const handleChange = (event: FixMeLater, newValue: FixMeLater) => {
        setPage(newValue);
    };

    return(
        <>
            
            
            {/* Add and Search Subject */}
            {/* <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} marginBottom={1}>
                <Button variant="contained" size="large" onClick={() => {navigate(`/dashboard/subject/{institution}/add`)}}>ADD SUBJECT</Button>
                <Grid container xs={4}>
                    <TextField label="Search Subject" fullWidth/>
                </Grid>
            </Box> */}

            <Grid container alignItems={'center'} justifyContent={'space-between'} marginBottom={1}>
                <Grid item>
                    <Typography variant="h4" fontWeight={700} marginBottom={1}>
                        Subjects
                    </Typography>
                </Grid>
                <Grid item>
                    <Button variant="contained" size="large" onClick={() => {navigate(`/dashboard/subject/{institution}/add`)}}>ADD SUBJECT</Button>
                </Grid>
                {/* <Grid item xs={6} lg={4}>
                    <TextField label="Search Subject" fullWidth/>
                </Grid> */}
            </Grid>

            {/* Tabs */}
            <Box marginBottom={2} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={page} variant="scrollable" onChange={handleChange}>
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