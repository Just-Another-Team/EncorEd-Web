import { Button } from "@mui/material"
import {
    DataGrid,
    GridColDef
} from "@mui/x-data-grid"

const AttendanceHeaders: Array<GridColDef> = [
    // {
    //     field: "button",
    //     disableColumnMenu: true,
    //     sortable: false,    
    //     renderHeader: () => {
    //         return( <Button variant="contained">Test</Button> )
    //     }
    // }
    {
        field: "attId",
        headerName: "ID",
    }
]

const AttendanceList = () => {

    return (
        <DataGrid
        columns={AttendanceHeaders}
        rows={[]}/>
    )
}

export default AttendanceList