import React from "react";
import { 
    Box,
} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid'

// Must be changed
const columns = [
    { 
        field: 'id',
        headerName: 'Id',
        flex: 0.5
    },
    { 
        field: 'name',
        headerName: 'Subject Name',
        flex: 1
    },
    { 
        field: 'participants',
        headerName: 'Participants',
        flex: 0.3
    },
    {
        field: 'subjectSchedule',
        headerName: 'Schedule',
        flex: 0.7
    },
    {
        field: 'status',
        headerName: 'Status',
        flex: 0.2,
    },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
];

const SchedSubList = () => {
    return(
        <>            
            <Box marginBottom={2}>

                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 25},
                        },
                        columns: {
                            columnVisibilityModel: {
                                id: false,
                            }
                        }
                    }}
                    onRowDoubleClick={(e) => {
                        console.log(e.row)
                        // window.location.href = '/dashboard/subject/testId'
                    }}
                    pageSizeOptions={[25]}
                    //disableRowSelectionOnClick
                    sx={{
                        '&.MuiDataGrid-root': {
                            border: '1px solid #EFEEFB'
                        },
                        '.MuiDataGrid-columnHeaders': {
                            backgroundColor: '#D0E7FF;',
                            color: '#296EB4',
                            fontSize: 16,
                        },
                        '.MuiTablePagination-displayedRows': {
                            marginTop: '1em',
                            marginBottom: '1em'
                        },
                        '.MuiTablePagination-displayedRows, .MuiTablePagination-selectLabel': {
                            marginTop: '1em',
                            marginBottom: '1em'
                        }
                    }}
                />
            </Box>
        </>
    )
}

export default SchedSubList