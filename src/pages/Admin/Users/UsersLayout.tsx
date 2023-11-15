import React from "react"
import {
    Tabs,
    Tab,
    Typography,
    Box
} from '@mui/material'
import UsersLayoutTab from "./UsersLayoutTab";
import { FixMeLater } from "../../../types/FixMeLater";
import UserList from "./tabs/UsersList";
// import UserList from "./tabs/UsersList";

const UsersLayout = () => {
    const [page, setPage] = React.useState(0);

    const handleChange = (event: FixMeLater, newValue: FixMeLater) => {
        setPage(newValue);
    };

    return(
        <>
            <Typography variant="h4" fontWeight={700}>
                User
            </Typography>
            
            <Box marginBottom={2} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={page} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Summary" />
                    {/* <Tab label="Groups" />
                    <Tab label="Roles" /> */}
                </Tabs>
            </Box>

            <UsersLayoutTab value={page} index={0}>
                <UserList />
            </UsersLayoutTab>

            {/* 
            <UserGroupPanelTab value={page} index={1}>
                <GroupList />
            </UserGroupPanelTab>

            <UserGroupPanelTab value={page} index={2}>
                <RoleList />
            </UserGroupPanelTab> */}
        </>
    )
}

export default UsersLayout