import Sidebar from "../Sidebar"

import HomeOutline from '@mui/icons-material/HomeOutlined'
import BookOutline from '@mui/icons-material/ClassOutlined'
import MapOutline from '@mui/icons-material/MapOutlined'
import EventOutline from '@mui/icons-material/CalendarTodayOutlined'
import GroupsOutline from '@mui/icons-material/GroupsOutlined'
import OrganizationOutline from '@mui/icons-material/PieChartOutlined'
import ReportOutline from '@mui/icons-material/AssessmentOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PostAddIcon from '@mui/icons-material/PostAdd';

import { useAppDispatch, useAppSelector } from "../../../app/encored-store-hooks"
import { useCallback, useEffect, useMemo } from "react"
import { Permission } from "../../../types/RoleTypes/Permission"

export type LinkType = {
    key: string
    name: string,
    icon?: JSX.Element,
    href: string
}

const ConnectedSideBar = () => {
    const select = useAppDispatch()

    const roles = useAppSelector(state => state.assignRole.data)
    const institution = useAppSelector(state => state.institution.data.id)
    const selectedPage = useAppSelector(state => state.navigation.page)

    const navigations: Array<LinkType> = [
        {key: "home", name: "Home", icon: <HomeOutline />, href: "/dashboard/home"},
        {key: "reports", name: "Reports", icon: <ReportOutline />, href: "/dashboard/report"},
        {key: "subject", name: "Subject", icon: <BookOutline />, href: `/dashboard/subject/${institution}`},
        {key: "maps", name: "Maps", icon: <MapOutline />, href: "/dashboard/map/list"},
        {key: "events", name: "Events", icon: <EventOutline />, href: `/dashboard/event/${institution}`},
        
        {key: "userGroups", name: "User and Groups", icon: <GroupsOutline />, href: `/dashboard/list/users/u/${institution}`},
        {key: "institution", name: "Institution", icon: <OrganizationOutline />, href: "/dashboard/institution"},
        {key: "request", name: "Request", icon: <PostAddIcon />, href: "/dashboard/request"},
    ]

    const adminNavigations: Array<LinkType> = [
        {key: "home", name: "Home", icon: <HomeOutline />, href: "/admin/dashboard/home"},
        {key: "users", name: "Users", icon: <PersonOutlineOutlinedIcon />, href: `/admin/dashboard/users/`},
        {key: "institution", name: "Institutions", icon: <OrganizationOutline />, href: "/admin/dashboard/institutions"},
    ]

    // const selectNavigations = useMemo(() => {
    //     const roleType = roles.filter(role => typeof role?.employee !== 'boolean')
    //     const employeePermissions = roleType.map(role => role.employee)
    
    //     return navigations.filter(navigation => {
    //         return employeePermissions.find(permission => (permission as Permission).viewUser || (permission as Permission).viewGroup || (permission as Permission).viewRole) == undefined ? navigation.key != "userGroups" : navigation
    //     })
    // },[])

    // useEffect(() => {
    //     const roleType = roles.filter(role => typeof role?.employee !== 'boolean')
    //     const employeePermissions = roleType.map(role => role.employee)

    //     console.log(employeePermissions.find(permission => (permission as Permission).viewUser || (permission as Permission).viewGroup || (permission as Permission).viewRole))
    // }, [])

    return (
        <Sidebar 
        //navigations={(userRole.find(data => data._systemRole._employee) && navigations) || (userRole.find(data => data._systemRole._superAdmin) && adminNavigations)}
        navigations={
            roles.find(role => role.admin || role.employee) && navigations ||
            roles.find(role => role.appAdmin) && adminNavigations
        }
        select={select}
        selectedPage={selectedPage}
        />
    )
}

export default ConnectedSideBar