import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { useNotification } from "../../hooks/useNotification"
import { useEffect } from "react"
import dayjs from "dayjs"

import ISubject from "../../data/ISubject"
import IUser from "../../data/IUser"
import IRoom from "../../data/IRoom"
import IAttendance from "../../data/IAttendance"
import { INotification } from "../../data/INotification"

const NotificationItems = () => {
    const { notifications, getAttendanceNotifications } = useNotification()

    const columns: Array<GridColDef<INotification>> = [
        {
            field: "NOTF_ID",
            headerName: "ID",
        },
        {
            field: "NOTF_TYPE",
            headerName: "Type",
        },
        {
            field: "NOTF_DESCRIPTION",
            headerName: "Description",
            renderCell: (params) => {
                const notifData = params.row.NOTF_DATA
                return params.row.NOTF_TYPE === "Attendance" ? `${(((notifData as IAttendance).SUB_ID as ISubject).USER_ID as IUser).USER_FULLNAME} is confirmed ${(notifData as IAttendance).ATTD_TEACHERSTATUS} in ${((notifData as IAttendance).ROOM_ID as IRoom).ROOM_NAME}` : "Description must be added here"
            },
            minWidth: 516
        },
        {
            field: "NOTF_DATE",
            headerName: "Date",
            renderCell: (params) => {
                return dayjs(params.row.NOTF_DATE).format("MMMM DD, YYYY - hh:mm A")
            },
            minWidth: 256
        },
    ]

    const collectionNotifications = getAttendanceNotifications()

    console.log(collectionNotifications)

    return(
        <DataGrid
        getRowId={(row) => row.NOTF_ID!}
        initialState={{
            columns: {
                columnVisibilityModel: {
                    NOTF_ID: false,
                }
            },
            sorting: {
                sortModel: [{field: 'NOTF_DATE', sort: 'desc'}]
            }
        }}
        columns={columns}
        rows={collectionNotifications}
        pageSizeOptions={[25]}/>
    )
}

export default NotificationItems