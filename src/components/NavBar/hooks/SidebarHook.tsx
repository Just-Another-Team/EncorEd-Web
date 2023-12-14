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
import { FixMeLater } from "../../../types/FixMeLater"

export type LinkType = {
    key: string
    name: string,
    icon?: JSX.Element,
    href: string
}

const ConnectedSideBar = ({
    open,
    onClose
}: FixMeLater) => {
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

    return (
        <Sidebar 
        //navigations={(userRole.find(data => data._systemRole._employee) && navigations) || (userRole.find(data => data._systemRole._superAdmin) && adminNavigations)}
        navigations={ 
            roles.appAdmin ? 
            adminNavigations : 
            navigations.filter((el, ind) => {

                const permissions = roles.employee as Permission

                if (!roles.admin) {
                    if (!permissions.viewMap) return el.key !== "maps"
                    if (!permissions.viewSubject) return el.key !== "subject"
                    if (!permissions.viewEvent) return el.key !== "events"
                    if (!permissions.viewUser && !permissions.viewGroup && !permissions.viewRole) return el.key !== "userGroups"
                }

                return el;
            })
        }
        open={open}
        onClose={onClose}
        select={select}
        selectedPage={selectedPage}
        />
    )
}

export default ConnectedSideBar