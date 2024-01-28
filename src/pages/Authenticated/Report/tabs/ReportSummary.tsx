import React, { useEffect, useState } from "react";
import { 
    Box, Button, Grid, TextField, Typography,
} from "@mui/material";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import UnpublishedOutlinedIcon from '@mui/icons-material/UnpublishedOutlined';
import { DataGrid, GridColDef, GridRenderCellParams, GridValueFormatterParams, GridValueGetterParams, GridValueSetterParams } from '@mui/x-data-grid'
import { targetUser } from "../../../../app/features/users/targetSlice";
import { viewAttendance } from "../../../../app/features/attendance/attendanceSlice";
import { useAppDispatch, useAppSelector } from "../../../../app/encored-store-hooks";
import { FixMeLater } from "../../../../types/FixMeLater";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import LoadingRowsDataGridOverlay from "../../../../components/Overlay/LoadingRowsOverlay/LoadingRowsOverlay";
import NoRowsDataGridOverlay from "../../../../components/Overlay/NoRows/NowRowsOverlay";

const ReportSummary = () => {
    const navigate = useNavigate()

    const institution = useAppSelector(state => state.institution.data.id)
    const attendanceLoading = useAppSelector(state => state.report.loading)
    const attendances = useAppSelector(state => state.report.data)

    const attendanceDispatch = useAppDispatch()
    const targetDispatch = useAppDispatch()

    useEffect(()=>{
        attendanceDispatch(viewAttendance(institution))
    }, [])

    const [searchedAttendance, setSearchedAttendance] = useState(attendances)
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchResult =  attendances.filter((val) => val.submitBy.toUpperCase().includes(e.currentTarget.value.toUpperCase()) || val.submitBy.toUpperCase().includes(e.currentTarget.value.toUpperCase()))
        setSearchedAttendance(searchResult)
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', minWidth: 70, sortingOrder: ['asc','desc'], },
        { field: 'roomName', headerName: 'Room', width: 130, sortingOrder: ['asc', 'desc'], },
    ];


    return(
        <>  
            <Box display={'flex'} alignItems={'center'} justifyContent={'flex-end'} marginBottom={2}>
                <Grid container xs={1}>
                    <Button variant="contained" onClick={(e) => handleSearch} sx={{borderRadius: '5px', color: 'white', backgroundColor:'#1976d2'}}>Search</Button>
                </Grid>
            </Box>   
            <Box height={560} marginBottom={2}>
                {attendanceLoading === true ? (
                    <LoadingRowsDataGridOverlay/>
                ) : (
                    <DataGrid
                        autoHeight
                        hideFooterSelectedRowCount
                        rows={searchedAttendance}
                        columns={columns}
                        slots={{
                            noRowsOverlay: attendanceLoading ? LoadingRowsDataGridOverlay : NoRowsDataGridOverlay,
                        }}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 10},
                            },
                        }}
                        
                        onRowDoubleClick={(e) => {
                            console.log(e.row)
                        }}
                        pageSizeOptions={[10]}
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
                )}
                
                {/* <DataGrid
                    autoHeight
                    hideFooterSelectedRowCount
                    rows={searchedAttendance}
                    columns={columns}
                    slots={{
                        noRowsOverlay: attendanceLoading ? LoadingRowsDataGridOverlay : NoRowsDataGridOverlay,
                    }}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10},
                        },
                    }}
                    
                    onRowDoubleClick={(e) => {
                        console.log(e.row)
                    }}
                    pageSizeOptions={[10]}
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
                /> */}
            </Box>

            {/* <Box marginBottom={2}>

                
            </Box> */}
        </>
    )
}

export default ReportSummary