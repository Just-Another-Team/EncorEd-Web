import React, { useEffect } from "react"
import {
    Tabs,
    Tab,
    Typography,
    Box,
    TabProps
} from '@mui/material'
import { Outlet, useLocation, Link, } from 'react-router-dom'
import { FixMeLater } from "../../../types/FixMeLater";
import { useAppSelector } from "../../../app/encored-store-hooks";
import CustomTab from "../../../components/Tab/CustomTab";

type TabType = {
    key: string,
    label: string,
    to: string
}

const UserGroups = () => {
    const location = useLocation();

    const institution = useAppSelector(state => state.institution.data.id)

    const userGroupsTabs: Array<TabType> = [
        {key: "user", label: "User", to: `users/u/${institution}`},
        {key: "groups", label: "Groups", to: `groups/u/${institution}`},
        {key: "roles", label: "Roles", to: `roles/u/${institution}`}
    ]

    const [page, setPage] = React.useState(userGroupsTabs.findIndex(tab => {return tab.to === location.pathname.replace('/dashboard/list/', '')}));

    const handleChange = (event: FixMeLater, newValue: FixMeLater) => {
        setPage(newValue)
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