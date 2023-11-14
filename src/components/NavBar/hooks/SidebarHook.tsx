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

export type LinkType = {
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
        {name: "Home", icon: <HomeOutline />, href: "/dashboard/home"},
        {name: "Reports", icon: <ReportOutline />, href: "/dashboard/home"},
        {name: "Subject", icon: <BookOutline />, href: `/dashboard/subject/${institution}`},
        {name: "Maps", icon: <MapOutline />, href: "/dashboard/map/list"},
        {name: "Events", icon: <EventOutline />, href: `/dashboard/event/${institution}`},
        
        {name: "User and Groups", icon: <GroupsOutline />, href: `/dashboard/list/users/u/${institution}`},
        {name: "Institution", icon: <OrganizationOutline />, href: "/dashboard/institution"},
        {name: "Request", icon: <PostAddIcon />, href: "/dashboard/request"},
    ]

    const adminNavigations: Array<LinkType> = [
        {name: "Home", icon: <HomeOutline />, href: "/admin/dashboard/home"},
        {name: "Users", icon: <PersonOutlineOutlinedIcon />, href: `/admin/dashboard/users/`},
        {name: "Institutions", icon: <OrganizationOutline />, href: "/admin/dashboard/institutions"},
    ]

    return (
        <Sidebar 
        //navigations={(userRole.find(data => data._systemRole._employee) && navigations) || (userRole.find(data => data._systemRole._superAdmin) && adminNavigations)}
        navigations={roles.find(role => role.admin) && navigations || roles.find(role => role.appAdmin) && adminNavigations}
        select={select}
        selectedPage={selectedPage}
        />
    )
}

export default ConnectedSideBar