import React, { useEffect } from "react";
import { 
    Box, Grid, Typography,
} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid'
import SubjectEventCard from "../../../../components/Cards/SubjectEventCard";
import { useDispatch, useSelector } from "react-redux";
// import { getEvents } from "../../../../app/features/event/eventSlice";
import { useAppDispatch, useAppSelector } from "../../../../app/encored-store-hooks";

// Must be changed
const columns = [
    { field: 'id', headerName: 'ID', flex: 1, },
    { field: 'name', headerName: 'Event Name', flex: 1, },
    { field: 'desc', headerName: 'Description', flex: 1, },
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

var eventRows = []

const EventList = () => {
    // const events = useAppSelector(state => state.events)

    const eventDispatch = useAppDispatch();

    useEffect(() => {
        // eventDispatch(getEvents())
    }, [])

    return(
        <>
            <Box
            marginBottom={4}>
                <Typography variant="h6" marginBottom={1}>
                    Upcoming Events
                </Typography>

                <Grid container overflow={'auto'} maxHeight={192} spacing={2}>
                    {Array.from({length: 4}).map((el, ind) => (
                        <Grid item xs={3} >
                            <SubjectEventCard src="/assets/SubjectTestPic.png"/>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Box marginBottom={2}>

                <DataGrid
                    //rows={!events.loading && events.event}
                    rows={[]}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 25},
                        },
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

export default EventList