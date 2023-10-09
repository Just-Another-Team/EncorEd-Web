import React from "react"
import {
    Tabs,
    Tab,
    Typography,
    Box
} from '@mui/material'
import UserGroupPanelTab from "./UserGroupPanelTab";
import UserList from "./tabs/UserList";
import GroupList from "./tabs/GroupList";
import RoleList from "./tabs/RoleList";

const UserGroups = () => {
    const [page, setPage] = React.useState(0);

    const handleChange = (event, newValue) => {
        setPage(newValue);
    };

    return(
        <>
            <Typography variant="h4" fontWeight={700}>
                User and Groups
            </Typography>
            
            <Box marginBottom={2} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={page} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="User" />
                    <Tab label="Groups" />
                    <Tab label="Roles" />
                </Tabs>
            </Box>

            <UserGroupPanelTab value={page} index={0}>
                <UserList />
            </UserGroupPanelTab>
            
            <UserGroupPanelTab value={page} index={1}>
                <GroupList />
            </UserGroupPanelTab>

            <UserGroupPanelTab value={page} index={2}>
                <RoleList />
            </UserGroupPanelTab>
        </>
    )
}

export default UserGroups