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
import { FixMeLater } from "../../../../types/FixMeLater";

type OngoingSubjectType = {
    id: string | number
    name: string
    edpCode: string | number
    subjectType: string
    units: number
    createdBy: string
    status: string
}

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

const subject = (
    id: string | number,
    name: string,
    edpCode: string | number,
    subjectType: string,
    units: number,
    createdBy: string,
    status: string
): OngoingSubjectType => {
    return {id: id, name: name, edpCode: edpCode, subjectType: subjectType, units: units, createdBy: createdBy, status: status} as OngoingSubjectType
}

const rows: Array<OngoingSubjectType> = [
    subject(1, "Subject 1", 75343, "Lecture", 3, "Admin", "Ongoing"),
    subject(2, "Subject 1", 75343, "Lecture", 3, "Admin", "Ongoing"),
    subject(3, "Subject 1", 75343, "Lecture", 3, "Admin", "Ongoing"),
    subject(4, "Subject 1", 75343, "Lecture", 3, "Admin", "Ongoing"),
    subject(5, "Subject 1", 75343, "Lecture", 3, "Admin", "Ongoing"),
    subject(6, "Subject 1", 75343, "Lecture", 3, "Admin", "Ongoing"),
    subject(7, "Subject 1", 75343, "Lecture", 3, "Admin", "Ongoing"),
    subject(8, "Subject 1", 75343, "Lecture", 3, "Admin", "Ongoing"),
];

const SubSummary = () => {
    return(
        <>            
            <Box marginBottom={2}>
                <Typography variant="h6" marginBottom={1}>
                    Ongoing Subjects
                </Typography>

                <Box height={370}>
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
                        pageSizeOptions={[5]}
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
            </Box>

            <Box>
                <Typography variant="h6" marginBottom={1}>
                    Requests
                </Typography>

                <Stack overflow={'auto'} maxHeight={360} gap={2}>
                    {Array.from({length: 3}).map((el, ind) => (
                        <SubjectEventCard height={108} src="/assets/SubjectTestPic.png">
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography variant="h5" fontWeight={700}>Subject Title {ind + 1}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">Original Schedule: </Typography>  
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">Requested Schedule: </Typography>  
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">Original Room: </Typography>  
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">Requested Room: </Typography>  
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