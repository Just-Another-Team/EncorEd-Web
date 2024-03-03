import {
    Box,
    Typography
} from "@mui/material"
import { SubjectType } from "../../data/subjectData"
import { DataGrid, GridColDef } from "@mui/x-data-grid"

// Datagrid for QRCodeViewRoom

const columns: Array<GridColDef<SubjectType>> = [
    {
        field: "subId",
        headerName: "ID",
    },
    {
        field: "subCode",
        headerName: "EDP Code"
    },
    {
        field: "subDescription",
        headerName: "Description"
    }
] 

type RoomSubjectListType = {
    subjects: Array<SubjectType>
}

const RoomSubjectList = ({ subjects }: RoomSubjectListType) => {

    return(
        <DataGrid
        getRowId={(row) => row.subId}
        initialState={{
            pagination: {
                paginationModel: {
                    pageSize: 10,
                }
            }
        }}
        columns={columns}
        rows={subjects}
        pageSizeOptions={[10]}/>
    )
}

export default RoomSubjectList