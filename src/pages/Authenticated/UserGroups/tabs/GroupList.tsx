import React from "react";
import { 
    Box, Button, Grid, TextField,
} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid'
import { FixMeLater } from "../../../../types/FixMeLater";

// Must be changed
const columns = [
    { 
        field: 'id',
        headerName: 'ID',
        width: 70 
    },
    { 
        field: 'firstName',
        headerName: 'First name',
        width: 130 
    },
    { 
        field: 'lastName',
        headerName: 'Last name',
        width: 130 
    },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 90,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        flex: 1,
        valueGetter: (params: FixMeLater) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
        field: 'update',
        sortable: false,
        renderHeader: () => (
            <span></span>
        ),
        renderCell: (params: FixMeLater) => {
            return (
                <Button onClick={(e) => {console.log(params.row)}} variant="contained" color="primary" >UPDATE</Button>
            )
        }
    },
    {
        field: 'delete',
        sortable: false,
        renderHeader: () => (
            <span></span>
        ),
        renderCell: (params: FixMeLater) => {
            return (
                <Button variant="contained" color="error" >DELETE</Button>
            )
        }
    }
  ];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    { id: 10, lastName: 'Harvey', firstName: 'Steve', age: 23 },
    { id: 11, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 12, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 13, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 14, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 15, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 16, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 17, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 18, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 19, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    { id: 20, lastName: 'Harvey', firstName: 'Steve', age: 23 },
    { id: 21, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 22, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 23, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 24, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 25, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
];

const GroupList = () => {
    return(
        <>            
            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} marginBottom={2}>
                <Button variant="contained" size="large">ADD GROUP</Button>
                <Grid container xs={4}>
                    <TextField label="Search Group" fullWidth/>
                </Grid>
            </Box>

            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 25},
                    },
                }}
                onRowDoubleClick={(e) => {
                    console.log(e.row)
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

            {/* <Box marginBottom={2}>

                
            </Box> */}
        </>
    )
}

export default GroupList