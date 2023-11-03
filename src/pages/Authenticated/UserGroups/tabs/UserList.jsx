import { React, useState, useEffect } from "react";
import { 
    Box, Button, Grid, TextField, Modal
} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid'
import dayjs from 'dayjs'
import { AddUserFormHook } from '../../../../components/Forms/Formhooks/AddUserForm-Hooks'
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../../features/users/usersSlice";
import { useNavigate } from "react-router-dom";
import { PasswordAuthHook } from "../../../../components/Forms/Formhooks/PasswordAuth-Hook";
import { deleteUser } from "../../../../features/users/usersSlice";
import { targetUser } from "../../../../features/users/targetSlice";

const UserList = () => {
    const navigate = useNavigate()

    const userInstitution = useSelector(state => state.institution.data.id)
    const usersArr = useSelector(state => state.users.users)
    const usersDispatch = useDispatch()
    const deleteDispatch = useDispatch()
    
    //Modal stuffs
    //add user form
    const [openAdd, setOpenAdd] = useState(false);
    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    //verify password form
    const [openVerif, setOpenVerif] = useState(false);
    const handleCloseVerif = () => setOpenVerif(false);
    const handleOpenVerif = () => setOpenVerif(true);

    const handleDelete = (data) => {
        handleOpenVerif()
        deleteDispatch(targetUser(data))
    }

    useEffect(()=>{
        usersDispatch(getUsers(userInstitution))
    }, [])

    const columns = [
        { field: 'id', headerName: 'Email', width: 200 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        { field: 'addedBy', headerName: 'Added by', width: 130 },
        {
            field: 'dateAdded',
            headerName: 'Date added',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            flex: 1,
            valueGetter: (params) => {
              return dayjs(params.row.joinDate).format("MMMM-DD-YYYY")
            },
          },
          {
            field: 'profile',
            sortable: false,
            renderHeader: () => (
                <span></span>
            ),
            renderCell: (params) => {
                return (
                    // <Button onClick={(e) => {window.location.href=`/dashboard/profile/${params.row.userName}`}} variant="contained" color="secondary" >PROFILE</Button>
                    <Button onClick={(e) => {navigate(`/dashboard/profile/${params.row.userName}`)}} variant="contained" color="secondary" >PROFILE</Button>
                )
            }
        },
        {
            field: 'update',
            sortable: false,
            renderHeader: () => (
                <span></span>
            ),
            renderCell: (params) => {
                return (
                    <Button onClick={(e) => {console.log(params.row.userName)}} variant="contained" color="primary" >UPDATE</Button>
                )
            }
        },
        {
            field: 'delete',
            sortable: false,
            renderHeader: () => (
                <span></span>
            ),
            renderCell: (params) => {
                return (
                    <Button onClick={(e) => {handleDelete(params.row.id)}} variant="contained" color="error" >DELETE</Button>
                )
            }
        }
      ];

    return(
        <>            
            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} marginBottom={2}>
                <Button onClick={handleOpenAdd} variant="contained" size="large">ADD USER</Button>
                <Grid container xs={4}>
                    <TextField label="Search User" fullWidth/>
                </Grid>
                <Modal
                    open={openAdd}
                    // onClose={handleClose} //close on clicking outside modal
                    aria-labelledby="Add Institutional User"
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
                            <Button style={{color:'black', fontWeight: 'bolder', fontSize: '20px', paddingRight:0, borderRadius:'20px'}} onClick={handleCloseAdd}>x</Button>
                        </div>
                        <div style={{padding: '35px', paddingTop: '0px'}}>
                            <AddUserFormHook/>
                        </div>
                    </Box>
                </Modal>

                <Modal
                    open={openVerif}
                    // onClose={handleClose} //close on clicking outside modal
                    aria-labelledby="Verify Password"
                    aria-describedby="Form for verifying current user password"
                    >
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 500,
                        bgcolor: "red",
                        border: '1px solid #000',
                        borderRadius: '20px',
                        boxShadow: 24,
                    }}>
                        <div style={{textAlign: 'right'}}>
                            <Button style={{color:'black', fontWeight: 'bolder', fontSize: '20px', paddingRight:0, borderRadius:'20px'}} onClick={handleCloseVerif}>x</Button>
                        </div>
                        <div style={{padding: '15px', paddingTop: '0px'}}>
                            <PasswordAuthHook/>
                        </div>
                    </Box>
                </Modal>
            </Box>

            <Box marginBottom={2}>

                <DataGrid
                    autoHeight
                    rows={usersArr}
                    columns={columns}
                    hideFooterSelectedRowCount
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 25},
                        },
                    }}
                    pageSizeOptions={[25]}
                    //disableRowSelectionOnClick={[true]}
                    disableColumnMenu={[true]}
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