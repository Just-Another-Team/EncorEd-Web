import { Box, Typography } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { Notifications, NotificationType } from "../../data/notificationData"

const columns: Array<GridColDef<NotificationType>> = [
    {
        field: "notfId",
        headerName: "ID",
    },
    {
        field: "notfDescription",
        headerName: "Description",
    },
    {
        field: "notfDate",
        headerName: "Date",
    },
    {
        field: "userId",
        headerName: "Created By",
    }
]

const NotificationItems = () => {

    return(
        <DataGrid
        getRowId={(row) => row.notfId}
        columns={columns}
        rows={Notifications}
        pageSizeOptions={[25]}/>
    )
}

export default NotificationItems