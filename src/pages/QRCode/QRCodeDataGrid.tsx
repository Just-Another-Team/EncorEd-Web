import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid"
import IRoom from "../../data/IRoom"
import QRCode from "react-qr-code"
import IFloor from "../../data/IFloor"
import { useSubject } from "../../hooks/useSubject"
import { useNavigate } from "react-router-dom"

type QRCodeDataGridType = {
    rooms: Array<IRoom>
}

const QRCodeDataGrid = (props: QRCodeDataGridType) => {
    const { rooms } = props

    const navigate = useNavigate()

    const { getSubjectsByRoom } = useSubject();
    
    const QRCodeHeader: Array<GridColDef<IRoom>> = [
        {
            field: "ROOM_ID",
            headerName: "ID",
            minWidth: 224
        },
        {
            field: "ROOM_NAME",
            headerName: "Name",
            minWidth: 160,
            flex: 1,
        },
        {
            field: "ROOM_SUB_COUNT",
            headerName: "Number of Subjects Assigned",
            minWidth: 256,
            renderCell: (params) => {
                return getSubjectsByRoom(params.row.ROOM_ID!).length
            },
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: "FLR_ID",
            headerName: "Floor",
            minWidth: 160,
            renderCell: (params) => {

                return (params.row.FLR_ID as IFloor).FLR_NAME
            }
        },
        {
            field: "ROOM_QR_Code",
            headerName: "QR Code",
            minWidth: 128,
            renderCell: (params) => {
                return (
                    <QRCode
                    size={128}
                    value={`encored://app/attendance/${params.row.ROOM_ID}`}/>
                )
            }
        },
    ]

    const doubleClickRow = (e: GridRowParams<IRoom>) => {
        navigate(e.id as string)
    }

    return (
        <DataGrid
        initialState={{
            columns: {
                columnVisibilityModel: {
                    ROOM_ID: false,
                }
            },
            pagination: {
                paginationModel: {
                    pageSize: 25,
                }
            }
        }}
        onRowDoubleClick={doubleClickRow}
        getRowHeight={() => 'auto'}
        columns={QRCodeHeader}
        getRowId={(row) => row.ROOM_ID!}
        rows={rooms}/>
    )
}

export default QRCodeDataGrid