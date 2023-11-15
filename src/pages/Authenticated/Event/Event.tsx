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
import EventTabPanel from "./EventTabPanel";
import EventSummary from "./tabs/Summary";
import EventList from "./tabs/EventList";
import EventSchedList from "./tabs/EventSchedList";
import EventRequest from "./tabs/EventRequestList";
import { FixMeLater } from "../../../types/FixMeLater";
import { Outlet } from "react-router-dom";
import CustomTab from "../../../components/Tab/CustomTab";
import { Link } from "react-router-dom";

const Event = () => {
    const [page, setPage] = React.useState(0);

    const handleChange = (event: FixMeLater, newValue: FixMeLater) => {
        setPage(newValue);
    };

    return(
        <>
            <Typography variant="h4" fontWeight={700} marginBottom={1}>
                Events
            </Typography>
            
            {/* Add and Search Subject */}
            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} marginBottom={1}>
                <Button variant="contained" size="large">ADD EVENT</Button>
                <Grid container xs={4}>
                    <TextField label="Search Event" fullWidth/>
                </Grid>
            </Box>

            {/* Tabs */}
            <Box marginBottom={2} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={page} onChange={handleChange} aria-label="basic tabs example">
                    <CustomTab label="Summary" component={Link} to=""/>
                    <CustomTab label="Event List" component={Link} to="list"/>
                    <CustomTab label="Scheduled Events" component={Link} to="schedule"/>
                    <CustomTab label="Awaiting Approval" component={Link} to="request"/>
                    {/* <Tab label="Summary" />
                    <Tab label="Event List" />
                    <Tab label="Scheduled Events" />
                    <Tab label="Awaiting Approval" /> */}
                </Tabs>
            </Box>

            {/* <EventTabPanel value={page} index={0}>
                <EventSummary />
            </EventTabPanel>
            <EventTabPanel value={page} index={1}>
                <EventList />
            </EventTabPanel>
            <EventTabPanel value={page} index={2}>
                <EventSchedList />
            </EventTabPanel>
            <EventTabPanel value={page} index={3}>
                <EventRequest />
            </EventTabPanel> */}

            <Outlet />
        </>
    )
}

export default Event