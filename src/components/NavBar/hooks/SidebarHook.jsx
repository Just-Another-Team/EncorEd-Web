import { useSelector, useDispatch } from "react-redux"
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

const ConnectedSideBar = ({selected}) => {
    const select = useDispatch()
    const userRole = useSelector(state => state.authentication)
    const userInstitution = useSelector(state => state.user.data.institution)
    const selectedPage = useSelector(state => state.pageSelect)

    const navigations = [
        {name: "Home", icon: <HomeOutline />, href: "/dashboard/home"},
        {name: "Reports", icon: <ReportOutline />, href: "/dashboard/home"},
        {name: "Subject", icon: <BookOutline />, href: "/dashboard/subject"},
        {name: "Maps", icon: <MapOutline />, href: "/dashboard/map/list"},
        {name: "Events", icon: <EventOutline />, href: "/dashboard/event"},
        {name: "User and Groups", icon: <GroupsOutline />, href: `/dashboard/users/list/u/${userInstitution}`},
        {name: "Institution", icon: <OrganizationOutline />, href: "/dashboard/institution"},
        {name: "Request", icon: <PostAddIcon />, href: "/dashboard/request"},
    ]

    const adminNavigations = [
        {name: "Home", icon: <HomeOutline />, href: "/admin/dashboard/home"},
        {name: "Users", icon: <PersonOutlineOutlinedIcon />, href: `/dashboard/users/list/u/${userInstitution}`},
        {name: "Institutions", icon: <OrganizationOutline />, href: "/admin/dashboard/institutions"},
    ]

    return (
        <Sidebar 
        //navigations={(userRole.find(data => data._systemRole._employee) && navigations) || (userRole.find(data => data._systemRole._superAdmin) && adminNavigations)}
        navigations={navigations}
        select={select}
        selectedPage={selectedPage}/>
    )
}

export default ConnectedSideBar