import React from "react";
import { 
    Box,
    Grid,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography 
} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid'
import SubjectEventCard from "../../../../components/Cards/SubjectEventCard";

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
    subject(1, "Subject 1", 75343, "Lecture", 3, "Admin", "Ongoing")
];

const SubSummary = () => {
    return(
        <>            
            <Box marginBottom={2}>
                <Typography variant="h6" marginBottom={1}>
                    Ongoing Subjects
                </Typography>

                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                        columns: {
                            columnVisibilityModel: {
                                id: false,
                            }
                        }
                    }}
                    onRowDoubleClick={(e) => {
                        console.log(e.row)
                        
                    }}
                    pageSizeOptions={[5, 10]}
                    //disableRowSelectionOnClick
                    sx={{
                        height: 400,
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

            <Box>
                <Typography variant="h6" marginBottom={1}>
                    Requests
                </Typography>

                <Stack container overflow={'auto'} maxHeight={360} gap={2} >
                    {Array.from({length: 3}).map((el, ind) => (
                        <SubjectEventCard height={108} src="/assets/SubjectTestPic.png">
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography variant="h5" fontWeight={700}>Subject Title {ind + 1}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="p">Original Schedule: </Typography>  
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="p">Requested Schedule: </Typography>  
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="p">Original Room: </Typography>  
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="p">Requested Room: </Typography>  
                                </Grid>
                            </Grid>
                        </SubjectEventCard>
                    ))}
                </Stack>
            </Box>
        </>
    )
}

export default SubSummary