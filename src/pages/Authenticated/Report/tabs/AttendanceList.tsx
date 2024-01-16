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

const AttendanceList = () => {
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
        { field: 'submitBy', headerName: 'Name', width: 130, sortingOrder: ['asc', 'desc'], },
        { field: 'submitAt', headerName: 'Date and Time', width: 220, sortingOrder: ['asc', 'desc'], 
          sortable: true,
          valueGetter: (params: GridValueGetterParams) => {
            return dayjs.unix(params.row.submitAt._seconds).toDate()
          },
          valueFormatter: (params: GridValueFormatterParams) => {
            return dayjs(params.value).format('MMM DD, YYYY h:mm:ss A')
          }
        },
        { field: 'verifyBy', headerName: 'Verified By', width: 160, sortingOrder: ['asc', 'desc'], },
        { field: 'verifyAt', headerName: 'Verified Date', width: 220, sortingOrder: ['asc', 'desc'],
          sortable: true,
          valueGetter: (params: GridValueGetterParams) => {
            return dayjs.unix(params.row.verifyAt._seconds).toDate()
          },
          valueFormatter: (params: GridValueFormatterParams) => {
            return dayjs(params.value).format('MMM DD, YYYY h:mm:ss A')
          },
          renderCell: (params: GridRenderCellParams) => (
            <Typography variant="body2">
                {params.formattedValue != "Invalid Date" && (
                    <Typography variant="body2">
                        {params.formattedValue}
                    </Typography>
                )}
                {params.formattedValue == "Invalid Date" && (
                    <Typography variant="body2">
                        
                    </Typography>
                )}
            </Typography>
          )
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 0.4,
            renderCell: (params: GridRenderCellParams) => (
                <Typography variant="body2">
                    {params.row.status == "Rejected" && (
                        <Typography color={"red"} variant="body2">
                            <UnpublishedOutlinedIcon/> Rejected
                        </Typography>
                    )}
                    {params.row.status == "Approved" && (
                        <Typography color={"green"} variant="body2">
                            <TaskAltIcon/> Approved
                        </Typography>
                    )}
                    {params.row.status == "Pending" && (
                        <Typography color={"black"} variant="body2">
                            <HourglassBottomIcon/> Pending
                        </Typography>
                    )}
                </Typography>
            )
        },
    ];


    return(
        <>  
            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} marginBottom={2}>
                <Grid container xs={4}>
                    <TextField onChange={handleSearch} label="Search Attendance" fullWidth/>
                </Grid>
            </Box>   

            <Box height={560} marginBottom={2}>
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
            </Box>

            {/* <Box marginBottom={2}>

                
            </Box> */}
        </>
    )
}

export default AttendanceList