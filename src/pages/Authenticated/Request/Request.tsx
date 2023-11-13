import React from "react";
import { 
    Box,
    Tabs,
    Typography,
    Tab,
    Button,
    TextField,
    Grid
} from "@mui/material";
import SubjectRequest from "./pages/SubjectRequest";
import RequestTabPanel from "./RequestPanelTab";

const Request = () => {
    // const [page, setPage] = React.useState(0);

    // const handleChange = (event, newValue) => {
    //     setPage(newValue);
    // };

    // return(
    //     <>
    //         <Typography variant="h4" fontWeight={700} marginBottom={1}>
    //             Request
    //         </Typography>
            
    //         {/* Add and Search Subject */}
    //         <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} marginBottom={1}>
    //             <Button variant="contained" size="large">CREATE REQUEST</Button>
    //             <Grid container xs={4}>
    //                 <TextField label="Search Subject" fullWidth/>
    //             </Grid>
    //         </Box>

    //         {/* Tabs */}
    //         <Box marginBottom={2} sx={{ borderBottom: 1, borderColor: 'divider' }}>
    //             <Tabs value={page} onChange={handleChange} aria-label="basic tabs example">
    //                 <Tab label="All Requests" />
    //                 <Tab label="Subject Requests" />
    //             </Tabs>
    //         </Box>

    //         <RequestTabPanel value={page} index={1}>
    //             <SubjectRequest />
    //         </RequestTabPanel>
    //     </>
    // )
}

export default Request