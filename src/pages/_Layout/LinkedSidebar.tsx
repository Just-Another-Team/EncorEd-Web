
import HomeOutline from '@mui/icons-material/HomeOutlined'
import BookOutline from '@mui/icons-material/ClassOutlined'
import MapOutline from '@mui/icons-material/MapOutlined'
import EventOutline from '@mui/icons-material/CalendarTodayOutlined'
import GroupsOutline from '@mui/icons-material/GroupsOutlined'
import OrganizationOutline from '@mui/icons-material/PieChartOutlined'
import ReportOutline from '@mui/icons-material/AssessmentOutlined';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Sidebar from '../../components/NavSidebar'

//LinkListItemType
export type LinkType = {
    key: string
    name: string,
    icon?: JSX.Element,
    href: string
}

type LinkedSideBarProps = {
    isDrawerOpen: boolean;
    onCloseDrawer: () => void;
}

const LinkedSideBar = ({
    isDrawerOpen,
    onCloseDrawer
}: LinkedSideBarProps) => {
    const links: Array<LinkType> = [
        {
            key: "home",
            name: "Home",
            icon: <HomeOutline />,
            href: "/dashboard/home"//"/dashboard/home"
        },
        {
            key: "reports",
            name: "Reports",
            icon: <ReportOutline />,
            href: "/dashboard/report"//`/dashboard/report/attendance`
        },
        {
            key: "rooms",
            name: "Room QR Code",
            icon: <ReportOutline />,
            href: "/dashboard/rooms"//`/dashboard/report/attendance`
        },
        // {
        //     key: "subject",
        //     name: "Subject",
        //     icon: <BookOutline />,
        //     href: "/subject"//`/dashboard/subject/`
        // },
        // {
        //     key: "employees",
        //     name: "Employees",
        //     icon: <GroupsOutline />,
        //     href: "/users"//`/dashboard/list/users/u/`
        // },


        // {
        //     key: "institution",
        //     name: "Institution",
        //     icon: <OrganizationOutline />,
        //     href: "#"//"/dashboard/institution"
        // },
        // {
        //     key: "request",
        //     name: "Request",
        //     icon: <PostAddIcon />,
        //     href: "#"//"/dashboard/request"
        // },
    ]

    return (
        <Sidebar
        links={links}
        isDrawerOpen={isDrawerOpen}
        onCloseDrawer={onCloseDrawer}
        />
    )
}

export default LinkedSideBar