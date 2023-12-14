import React, { useEffect } from "react";
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
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import SubjectEventCard from "../../../../components/Cards/SubjectEventCard";
import { FixMeLater } from "../../../../types/FixMeLater";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/encored-store-hooks";
import { SubjectInput } from "../../../../app/features/subject/subjectSlice";
import dayjs from "dayjs";

type OngoingSubjectType = {
    id: string | number
    name: string
    edpCode: string | number
    subjectType: string
    units: number
    createdBy: string
    status: string
}

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

const SubSummary = () => {

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const institution = useAppSelector(state => state.institution.data)
    const subjectSchedule = useAppSelector(state => state.subject.data.filter(el => el.schedule && dayjs().isBefore(el.schedule!.startTime, 'minutes')))

    const [ ongoingSubjectList, setOngoingSubjectList ] = React.useState<any>([])

    useEffect(() => {
        setOngoingSubjectList(subjectSchedule)
    }, [])

    // Must be changed
    const columns: Array<GridColDef<SubjectInput>> = [
        { 
            field: 'id',
            headerName: 'Id',
            flex: 0.5
        },
        { 
            field: 'name',
            headerName: 'Subject Name',
            flex: 1,
            valueGetter: (params: GridValueGetterParams<SubjectInput>) => {
                return params.row.details!.name
            },
        },
        { 
            field: 'edpCode',
            headerName: 'EDP',
            flex: 1,
            valueGetter: (params: GridValueGetterParams<SubjectInput>) => {
                return params.row.details!.edpCode
            },
        },
        {
            field: 'subjectType',
            headerName: 'Type',
            flex: 1,
            valueGetter: (params: GridValueGetterParams<SubjectInput>) => {
                return params.row.details!.type
            },
        },
        {
            field: 'units',
            headerName: 'Units',
            flex: 1,
            valueGetter: (params: GridValueGetterParams<SubjectInput>) => {
                return params.row.details!.units
            },
        },
        {
            field: 'createdBy',
            headerName: 'Created By',
            flex: 1,
            valueGetter: (params: GridValueGetterParams<SubjectInput>) => {
                return params.row.details!.createdBy
            },
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            valueGetter: (params: GridValueGetterParams<SubjectInput>) => {
                return params.row.details!.status
            },
        },
    ];

    return(
        <>            
            <Box marginBottom={2}>
                <Typography variant="h6" marginBottom={1}>
                    Ongoing Subjects
                </Typography>

                <Box height={370}>
                    <DataGrid
                        rows={ongoingSubjectList}
                        columns={columns}
                        getRowId={(row) => row.details!.id!}
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
                        <SubjectEventCard key={ind} height={108} src="/assets/SubjectTestPic.png">
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