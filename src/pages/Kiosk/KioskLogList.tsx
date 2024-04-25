import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
    GridRowParams,
} from "@mui/x-data-grid"
import { useNavigate } from 'react-router-dom'
import IUser, { UserRole } from "../../data/IUser"
import { DeleteOutlineOutlined, UpdateOutlined } from "@mui/icons-material"
import { useState } from "react"
import { useModal } from "../../hooks/useModal"
import { useUsers } from "../../hooks/useUsers"
import DeleteDialog from "../../components/DialogDelete"
import useLoading from "../../hooks/useLoading"
import { useAuth } from "../../hooks/useAuth"
import { IKioskLog } from "../../data/IKioskLog"
import useKioskLogs from "../../hooks/useKioskLogs"
import IRoom from "../../data/IRoom"
import dayjs from "dayjs"

type KioskLogList = {
    kioskId: string | undefined
}

const KioskLogList = ({
    kioskId
}: KioskLogList) => {
    const { logs, getKioskLogs } = useKioskLogs()

    const KioskLogHeaders: Array<GridColDef<IKioskLog>> = [
        {
            field: "KILG_ID",
            headerName: "ID",
        },
        {
            field: "KILG_TYPE",
            headerName: "Type",
        },
        {
            field: "ROOM_ID",
            headerName: "Room Searched/Navigated",
            minWidth: 224,
            renderCell: (params) => {
                const room = params.row.ROOM_ID as IRoom
                return room.ROOM_NAME
            }
        },
        {
            field: "KILG_DATE",
            headerName: "Date",
            minWidth: 320,
            renderCell: (params) => {
                return dayjs(params.row.KILG_DATE as string).format("hh:mm A - MM/DD/YYYY")
            }
        }
        // {
        //     field: "USER_ID",
        //     headerName: "Kiosk",
        //     minWidth: 224,
        //     renderCell: (params) => {
        //         const user = params.row.USER_ID as IUser
        //         return user.USER_USERNAME
        //     }
        // },
        // {
        //     field: "ROLE_ID",
        //     headerName: "Role",
        //     minWidth: 256,
        //     renderCell: (params) => {
        //         const role = params.row.ROLE_ID as UserRole

        //         return role.campusDirector ? "Campus Director" : role.dean ? "Dean" : role.attendanceChecker ? "Attendance Checker" : role.teacher ? "Teacher" : role.kiosk 
        //     }
        // },
        // {
        //     field: "UPDATE",
        //     headerName: "",
        //     type: "actions",
        //     getActions: (params) => {

        //         const handleOnClickUpdate = async (user: IUser) => {
        //             const credential = await getCredentials(user.USER_ID as string)
        //             const credentialData = credential.data

        //             setKiosk({
        //                 ...user,
        //                 USER_EMAIL: credentialData.email
        //             });
        //             openUpdateModal();
        //         }
                
        //         const handleOnClickDelete = (user: IUser) => {
        //             setKiosk(user);
        //             openDeleteModal();
        //         }

        //         return [
        //             <GridActionsCellItem
        //             key={"update"}
        //             icon={<UpdateOutlined />}
        //             label="Edit"
        //             className="textPrimary"
        //             onClick={() => handleOnClickUpdate(params.row)}
        //             color="secondary"
        //             />,
        //             <GridActionsCellItem
        //             key={"delete"}
        //             icon={<DeleteOutlineOutlined />}
        //             label="Delete"
        //             onClick={() => handleOnClickDelete(params.row)}
        //             color="error"
        //             />,
        //         ];
        //     },
            
        // },
    ]

    const kioskLogs = kioskId ? getKioskLogs(kioskId) : []

    return (
        <>
            <DataGrid
            //loading={users?.length! > 0 ? false : true}
            initialState={{
                columns: {
                    columnVisibilityModel: {
                        // USER_ID: false,
                        KILG_ID: false,
                    }
                },
                pagination: {
                    paginationModel: {
                        pageSize: 25,
                    }
                }
            }}
            columns={KioskLogHeaders}
            getRowId={(row) => row.KILG_ID!}
            rows={kioskLogs}
            />
        </>
    )
}

export default KioskLogList