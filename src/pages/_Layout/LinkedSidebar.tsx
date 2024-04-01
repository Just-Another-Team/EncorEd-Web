
import HomeOutline from '@mui/icons-material/HomeOutlined'
import BookOutline from '@mui/icons-material/ClassOutlined'
import MapOutline from '@mui/icons-material/MapOutlined'
import EventOutline from '@mui/icons-material/CalendarTodayOutlined'
import GroupsOutline from '@mui/icons-material/GroupsOutlined'
import OrganizationOutline from '@mui/icons-material/PieChartOutlined'
import ReportOutline from '@mui/icons-material/AssessmentOutlined';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import LanOutlinedIcon from '@mui/icons-material/LanOutlined';
import Sidebar from '../../components/NavSidebar'
import { DesktopWindowsOutlined, HowToReg, QrCode } from '@mui/icons-material'

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
            key: "attendances",
            name: "Attendances",
            icon: <HowToReg />,
            href: "/dashboard/attendances"//`/dashboard/report/attendance`
        },
        {
            key: "rooms",
            name: "Room QR Code",
            icon: <QrCode />,
            href: "/dashboard/rooms"//`/dashboard/report/attendance`
        },
        {
            key: "subject",
            name: "Subject",
            icon: <BookOutline />,
            href: "/dashboard/subject"//`/dashboard/subject/`
        },
        {
            key: "departments",
            name: "Departments",
            icon: <LanOutlinedIcon />,
            href: "/dashboard/department"//`/dashboard/subject/`
        },
        {
            key: "users",
            name: "Employees",
            icon: <PersonOutlinedIcon />,
            href: "/dashboard/users"//`/dashboard/list/users/u/`
        },
        {
            key: "kiosk",
            name: "Kiosks",
            icon: <DesktopWindowsOutlined />,
            href: "/dashboard/kiosk"//"/dashboard/institution"
        }

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