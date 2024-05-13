
import HomeOutline from '@mui/icons-material/HomeOutlined'
import BookOutline from '@mui/icons-material/ClassOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined';
import LanOutlinedIcon from '@mui/icons-material/LanOutlined';
import Sidebar from '../../components/NavSidebar'
import { DesktopWindowsOutlined, HowToReg, QrCode } from '@mui/icons-material'
import { useAuth } from '../../hooks/useAuth'
import { UserRole } from '../../data/IUser'
import { useUsers } from '../../hooks/useUsers'

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
    //const { user } = useAuth();
    const { getCurrentUser } = useUsers()

    const deanlinkCommon = '/dean'
    const campusDirectorCommon = '/campusDirector'
    const adminCommon = `/admin`

    //console.log(getCurrentUser())

    const adminlinks: Array<LinkType> = [
        {
            key: "home",
            name: "Home",
            icon: <HomeOutline />,
            href: `${adminCommon}/home`
        },
        {
            key: "attendances",
            name: "Attendances",
            icon: <HowToReg />,
            href: `${adminCommon}/attendances`
        },
        {
            key: "rooms",
            name: "Room QR Code",
            icon: <QrCode />,
            href: `${adminCommon}/rooms`
        },
        {
            key: "subject",
            name: "Subject",
            icon: <BookOutline />,
            href: `${adminCommon}/subject`
        },
        {
            key: "departments",
            name: "Departments",
            icon: <LanOutlinedIcon />,
            href: `${adminCommon}/department`
        },
        {
            key: "users",
            name: "Employees",
            icon: <PersonOutlinedIcon />,
            href: `${adminCommon}/users`
        },
        {
            key: "kiosk",
            name: "Kiosks",
            icon: <DesktopWindowsOutlined />,
            href: `${adminCommon}/kiosk`
        },
        {
            key: "room",
            name: "Rooms",
            icon: <MeetingRoomOutlinedIcon />,
            href: `${adminCommon}/roomMap`
        }
    ]
    const deanLinks: Array<LinkType> = [
        {
            key: "home",
            name: "Home",
            icon: <HomeOutline />,
            href: `${deanlinkCommon}/home`
        },
        {
            key: "attendances",
            name: "Attendances",
            icon: <HowToReg />,
            href: `${deanlinkCommon}/attendances`
        },
        {
            key: "rooms",
            name: "Room QR Code",
            icon: <QrCode />,
            href: `${deanlinkCommon}/rooms`
        },
        {
            key: "subject",
            name: "Subject",
            icon: <BookOutline />,
            href: `${deanlinkCommon}/subject`
        },
        {
            key: "users",
            name: "Employees",
            icon: <PersonOutlinedIcon />,
            href: `${deanlinkCommon}/users`
        },
        {
            key: "kiosk",
            name: "Kiosks",
            icon: <DesktopWindowsOutlined />,
            href: `${deanlinkCommon}/kiosk`
        }
    ]
    const campusDirectorLinks: Array<LinkType> = [
        {
            key: "home",
            name: "Home",
            icon: <HomeOutline />,
            href: `${campusDirectorCommon}/home`
        },
        {
            key: "attendances",
            name: "Attendances",
            icon: <HowToReg />,
            href: `${campusDirectorCommon}/attendances`
        },
        {
            key: "departments",
            name: "Departments",
            icon: <LanOutlinedIcon />,
            href: `${campusDirectorCommon}/department`
        },
        // {
        //     key: "subject",
        //     name: "Subject",
        //     icon: <BookOutline />,
        //     href: `${campusDirectorCommon}/subject`
        // },
        {
            key: "users",
            name: "Employees",
            icon: <PersonOutlinedIcon />,
            href: `${campusDirectorCommon}/users`
        },
        {
            key: "kiosk",
            name: "Kiosks",
            icon: <DesktopWindowsOutlined />,
            href: `${campusDirectorCommon}/kiosk`
        }
    ]

    return (
        <Sidebar
        isDrawerOpen={isDrawerOpen}
        onCloseDrawer={onCloseDrawer}>
            <Sidebar.ItemList
            links={getCurrentUser() !== null ? (getCurrentUser()?.ROLE_ID as UserRole).campusDirector ? campusDirectorLinks : (getCurrentUser()?.ROLE_ID as UserRole).dean ? deanLinks : (getCurrentUser()?.ROLE_ID as UserRole).admin ? adminlinks : [] : []}
            onCloseDrawer={onCloseDrawer}/>
        </Sidebar>
    )
}

export default LinkedSideBar