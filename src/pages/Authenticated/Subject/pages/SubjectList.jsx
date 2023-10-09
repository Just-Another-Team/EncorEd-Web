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
        field: 'edpCode',
        headerName: 'EDP',
        flex: 1
    },
    {
        field: 'subjectType',
        headerName: 'Type',
        flex: 1
    },
    {
        field: 'units',
        headerName: 'Units',
        flex: 1,
    },
    {
        field: 'createdBy',
        headerName: 'Created By',
        flex: 1,
    },
    {
        field: 'status',
        headerName: 'Status',
        flex: 1,
    },
];

const subject = (id, name, edpCode, subjectType, units, createdBy, status) => {
    return {id: id, name: name, edpCode: edpCode, subjectType: subjectType, units: units, createdBy: createdBy, status: status}
}

const rows = [
    subject(1, "Subject 1", 75343, "Lecture", 3, "Admin", "Verified"),
    subject(2, "Subject 1", 75344, "Laboratory", 3, "Admin", "Awaiting Approval"),
    subject(3, "Subject 2", 75343, "Lecture", 3, "Admin", "Verified")
];

const SubList = () => {
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
                        window.location.href = '/dashboard/subject/testId'
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

export default SubList