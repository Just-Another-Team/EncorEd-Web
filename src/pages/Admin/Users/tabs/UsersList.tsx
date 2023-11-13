import { useState, useEffect } from "react";
import { 
    Box, Button, Grid, TextField, Modal
} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid'
import dayjs from 'dayjs'
// import { AddUserFormHook } from '../../../../components/Forms/Formhooks/AddUserForm-Hooks'
import { useDispatch, useSelector } from "react-redux";
// import { getAllUsers } from "../../../../app/features/users/usersSlice";
import { useAppDispatch, useAppSelector } from "../../../../app/encored-store-hooks";
import { FixMeLater } from "../../../../types/FixMeLater";


const UserList = () => {
    // const userInstitution = useAppSelector(state => state.institution.data.id)
    // const usersArr = useAppSelector(state => state.users.users)

    const usersDispatch = useAppDispatch()
    

    //Modal stuffs
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // useEffect(()=>{
    //     usersDispatch(getAllUsers())
    // }, [])

    // Must be changed
    const columns = [
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
            field: 'id',
            headerName: 'Email',
            width: 256
        },
        {
            field: 'institution',
            headerName: 'Institution',
            flex: 1
        },
        {
            field: 'dateAdded',
            headerName: 'Date Joined',
            width: 160,
            valueGetter: (params: FixMeLater) => {
            return dayjs(params.row.joinDate).format("MMMM-DD-YYYY")
            },
        },
        // {
        //     field: 'update',
        //     sortable: false,
        //     renderHeader: () => (
        //         <span></span>
        //     ),
        //     renderCell: (params) => {
        //         return (
        //             <Button onClick={(e) => {console.log(params.row)}} variant="contained" color="primary" >UPDATE</Button>
        //         )
        //     }
        // },
        // {
        //     field: 'delete',
        //     sortable: false,
        //     renderHeader: () => (
        //         <span></span>
        //     ),
        //     renderCell: (params) => {
        //         return (
        //             <Button variant="contained" color="error" >DELETE</Button>
        //         )
        //     }
        // }
    ];

    return(
        <>            
            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} marginBottom={2}>
                <Button onClick={handleOpen} variant="contained" size="large">ADD USER</Button>
                <Grid container xs={4}>
                    <TextField label="Search User" fullWidth/>
                </Grid>
                <Modal
                    open={open}
                    // onClose={handleClose} //close on clicking outside modal
                    aria-labelledby="Add User"
                    aria-describedby="Form for adding institutional users"
                    >
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 500,
                        bgcolor: "#45A1FD",
                        border: '1px solid #000',
                        borderRadius: '20px',
                        boxShadow: 24,
                    }}>
                        <div style={{textAlign: 'right'}}>
                            <Button style={{color:'black', fontWeight: 'bolder', fontSize: '20px', paddingRight:0, borderRadius:'20px'}} onClick={handleClose}>x</Button>
                        </div>
                        <div style={{padding: '35px', paddingTop: '0px'}}>
                            {/* <AddUserFormHook title="Add User"/> */}
                        </div>
                    </Box>
                </Modal>
            </Box>

            <Box marginBottom={2}>

                <DataGrid
                    autoHeight={true}
                    rows={[]}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 25},
                        },
                    }}
                    pageSizeOptions={[25]}
                    //disableRowSelectionOnClick={[true]}
                    disableColumnMenu={true}
                    sx={{
                        '&.MuiDataGrid-root' : {
                            border: '1px solid #EFEEFB',
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
                            marginBottom: '1em',
                        },
                    }}
                />
            </Box>
        </>
    )
}

export default UserList