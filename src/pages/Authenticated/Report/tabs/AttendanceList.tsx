import React, { useEffect, useState } from "react";
import { 
    Box, Button, Grid, TextField,
} from "@mui/material";
import { DataGrid, GridColDef, GridValueFormatterParams, GridValueGetterParams } from '@mui/x-data-grid'
import { targetUser } from "../../../../app/features/users/targetSlice";
import { viewNotif } from "../../../../app/features/notification/notifSlice";
import { useAppDispatch, useAppSelector } from "../../../../app/encored-store-hooks";
import { FixMeLater } from "../../../../types/FixMeLater";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import LoadingRowsDataGridOverlay from "../../../../components/Overlay/LoadingRowsOverlay/LoadingRowsOverlay";
import NoRowsDataGridOverlay from "../../../../components/Overlay/NoRows/NowRowsOverlay";

const AttendanceList = () => {
    const navigate = useNavigate()

    const institution = useAppSelector(state => state.institution.data.id)
    const notifLoading = useAppSelector(state => state.report.loading)
    const notifications = useAppSelector(state => state.report.data)

    const notifDispatch = useAppDispatch()
    const targetDispatch = useAppDispatch()

    useEffect(()=>{
        notifDispatch(viewNotif(institution))
    }, [])

    const [searchedNotif, setSearchedNotif] = useState(notifications)
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchResult =  notifications.filter((val) => val.submitBy.toUpperCase().includes(e.currentTarget.value.toUpperCase()) || val.submitBy.toUpperCase().includes(e.currentTarget.value.toUpperCase()))
        setSearchedNotif(searchResult)
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70, sortingOrder: ['asc','desc'], },
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
          }
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
                    rows={searchedNotif}
                    columns={columns}
                    slots={{
                        noRowsOverlay: notifLoading ? LoadingRowsDataGridOverlay : NoRowsDataGridOverlay,
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