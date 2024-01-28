import React from "react";
import { 
    Box,
    Tabs,
    Typography,
    Tab,
    Button,
    TextField,
    Grid,
    Container
} from "@mui/material";
import { Outlet, useLocation, Link, } from 'react-router-dom'
import { FixMeLater } from "../../../types/FixMeLater";
import { useAppSelector } from "../../../app/encored-store-hooks";
import CustomTab from "../../../components/Tab/CustomTab";


type TabType = {
    key: string,
    label: string,
    to: string
}

const Report = () => {
    const location = useLocation();

    const institution = useAppSelector(state => state.institution.data.id)

    const reportTabs: Array<TabType> = [
        {key: "attendance", label: "Attendance", to: `attendance/${institution}`},
        {key: "events", label: "Events", to: ``},
        {key: "subjects", label: "Roles", to: ``}
    ]

    const [page, setPage] = React.useState(reportTabs.findIndex(tab => {return tab.to === location.pathname.replace('/dashboard/report/', '')}));

    const handleChange = (event: FixMeLater, newValue: FixMeLater) => {
        setPage(newValue)
    };

    return(
        <>
            <Typography variant="h4" fontWeight={700} marginBottom={1}>
                Report
            </Typography>

            {/* Tabs */}
            <Box marginBottom={2} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={page} onChange={handleChange} aria-label="basic tabs example">
                    <CustomTab label="Summary" component={Link} to={`summary`}/>
                    <CustomTab label="Attendance" component={Link} to={`attendance`}/>
                    {/* <CustomTab label="Events" component={Link} to={`events/${institution}`}/> */}
                    {/* <CustomTab label="Subjects" component={Link} to={`subjects/${institution}`}/> */}
                </Tabs>
            </Box>

            <Outlet />
        </>
    )
}

export default Report