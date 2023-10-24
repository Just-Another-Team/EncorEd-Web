import React from "react";
import { 
    Container,
    Toolbar,
    Typography,
    Box,
    Grid,
    Stack
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SubjectEventCard from "../../../components/Cards/SubjectEventCard";

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
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
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
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
];

const Home = () => {
    return(
        <>
            <Box
            marginBottom={3}>
                <Typography variant="h4" fontWeight={700}>
                    Welcome User Fullname!
                </Typography>
            </Box>
            
            <Box
            marginBottom={4}>
                <Typography variant="h5" fontWeight={700} marginBottom={2}>
                    Upcoming Events
                </Typography>

                <Grid container overflow={'auto'} spacing={2} >
                    {Array.from({length: 4}).map((el, ind) => (
                        <Grid item xs={3}>
                            <SubjectEventCard src="/assets/SubjectTestPic.png"/>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            
            <Box
            marginBottom={4}>
                <Typography variant="h5" fontWeight={700} marginBottom={2}>
                    Ongoing Subjects
                </Typography>
                
                <Grid container overflow={'auto'} spacing={2} >
                    {Array.from({length: 4}).map((el, ind) => (
                        <Grid item xs={3}>
                            <SubjectEventCard src="/assets/SubjectTestPic.png"/>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Grid container marginBottom={4}  spacing={4}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" fontWeight={700} marginBottom={1}>
                        Subject Requests
                    </Typography>
                    
                    <Stack gap={2} overflow={'auto'}>
                        {Array.from({length: 2}).map((el, ind) => (
                            <SubjectEventCard key={ind} height={null} sx={{paddingTop: 1, paddingBottom: 1}}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Typography variant="h5" fontWeight={700}>Subject Title {ind + 1}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="p">Requested Schedule: </Typography>  
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="p">Requested Room: </Typography>  
                                    </Grid>
                                </Grid>
                            </SubjectEventCard>
                        ))}
                    </Stack>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Typography variant="h5" fontWeight={700} marginBottom={1}>
                        Event Requests
                    </Typography>
                    
                    <Stack gap={2} overflow={'auto'}>
                        {Array.from({length: 2}).map((el, ind) => (
                            <SubjectEventCard key={ind} height={null} sx={{paddingTop: 1, paddingBottom: 1}}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Typography variant="h5" fontWeight={700}>Event Title 1</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="p">Date: </Typography>  
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="p">Time: </Typography>  
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="p">Venue: </Typography>  
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="p">In Campus: </Typography>  
                                    </Grid>
                                </Grid>
                            </SubjectEventCard>
                        ))}
                    </Stack>
                </Grid>
            </Grid>

            <Box
            marginBottom={2}>
                <Typography variant="h5" fontWeight={700} marginBottom={1}>
                    Navigation Activity
                </Typography>

                {/* Better if different component */}
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    onRowClick={(e) => {
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
        </>
    )
}

export default Home