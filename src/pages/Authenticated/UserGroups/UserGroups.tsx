import React from "react"
import {
    Tabs,
    Tab,
    Typography,
    Box,
    TabProps
} from '@mui/material'
import { Outlet } from 'react-router-dom'
import { FixMeLater } from "../../../types/FixMeLater";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../app/encored-store-hooks";
import CustomTab from "../../../components/Tab/CustomTab";

const UserGroups = () => {
    const institution = useAppSelector(state => state.institution.data.id)

    const [page, setPage] = React.useState(0);

    const handleChange = (event: FixMeLater, newValue: FixMeLater) => {
        setPage(newValue);
    };

    return(
        <>
            <Typography variant="h4" fontWeight={700}>
                User and Groups
            </Typography>
            
            <Box marginBottom={2} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={page} onChange={handleChange} aria-label="basic tabs example">
                    <CustomTab label="User" component={Link} to={`users/u/${institution}`}/>
                    <CustomTab label="Groups" component={Link} to={`groups/u/${institution}`}/>
                    <CustomTab label="Roles" component={Link} to={`roles/u/${institution}`}/>
                </Tabs>
            </Box>

            <Outlet />
        </>
    )
}

export default UserGroups