import React, { useState, useEffect } from "react";
import { 
    Box, Button, Grid, TextField, Modal, Typography
} from "@mui/material";
import { DataGrid, GridCellParams, GridColDef, GridRenderCellParams, GridValueFormatterParams, GridValueGetterParams } from '@mui/x-data-grid'
import dayjs from 'dayjs'
import { AddUserFormHook } from '../../../../components/Forms/Formhooks/AddUserForm-Hooks'
import { getUsers } from "../../../../app/features/users/usersSlice";
import { useNavigate, useParams } from "react-router-dom";
import { PasswordAuthHook } from "../../../../components/Forms/Formhooks/PasswordAuth-Hook";
import { targetUser } from "../../../../app/features/users/targetSlice";
import { useAppDispatch, useAppSelector } from "../../../../app/encored-store-hooks";
import { FixMeLater } from "../../../../types/FixMeLater";
import { userListObj } from "../../../../types/UserListObject";
import NoRowsDataGridOverlay from "../../../../components/Overlay/NoRows/NowRowsOverlay";
import LoadingRowsDataGridOverlay from "../../../../components/Overlay/LoadingRowsOverlay/LoadingRowsOverlay";

const UserList = () => {
    const navigate = useNavigate()
    //const { institution } = useParams();

    const userInstitution = useAppSelector(state => state.institution.data.id)
    const users = useAppSelector(state => state.users.data)
    const usersLoading = useAppSelector(state => state.users.loading)
    const currUser = useAppSelector(state => state.authentication.data.id)

    const usersDispatch = useAppDispatch()
    const targetDispatch = useAppDispatch()

    const userList: userListObj = {
        institution: userInstitution,
        user: currUser
    };

    //Modal stuffs
    //add user form
    const [openAdd, setOpenAdd] = useState(false);
    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    //verify password form
    const [openVerif, setOpenVerif] = useState(false);
    const handleOpenVerif = () => setOpenVerif(true);
    const handleCloseVerif = () => setOpenVerif(false);

    //delete user
    const handleVerification = (data: FixMeLater) => {
        targetDispatch(targetUser(data))
        handleOpenVerif()
    }
    
    //user profile
    const handleProfile = (data: FixMeLater) => {
        targetDispatch(targetUser(data))
        navigate(`/dashboard/profile/${data}`)
    }

    //list of users state
    useEffect(()=>{
        usersDispatch(getUsers(userList))
    }, [])

    //searching user
    const [searchedUsers, setSearchedUsers] = useState(users)
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchResult =  users.filter((val) => val.firstName.toUpperCase().includes(e.currentTarget.value.toUpperCase()) || val.lastName.toUpperCase().includes(e.currentTarget.value.toUpperCase()))
        setSearchedUsers(searchResult)
    }

    
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Email', width: 200, sortingOrder:['asc', 'desc'], },
        { field: 'firstName', headerName: 'First name', width: 130, sortingOrder:['asc', 'desc'], },
        { field: 'lastName', headerName: 'Last name', width: 130, sortingOrder:['asc', 'desc'], },
        { field: 'addedBy', headerName: 'Added by', width: 130, sortingOrder:['asc', 'desc'], },
        {
            field: 'dateAdded',
            headerName: 'Date added',
            sortable: true,
            sortingOrder:['asc', 'desc'],
            flex: 0.3,
            valueGetter: (params: GridValueGetterParams) => {
              return dayjs(params.row.joinDate).format('MM-DD-YYYY')
            },
            valueFormatter: (params: GridValueFormatterParams) => {
                return dayjs(params.value).format('MMMM-DD-YYYY')
            },
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 0.4,
            renderCell: (params: GridRenderCellParams) => (
                <Typography variant="body2">
                    {params.row.status === "Closed" && (
                        <Typography color={"red"} variant="body2">
                            {params.row.status}
                        </Typography>
                    )}
                    {params.row.status === "Open" && (
                        <Typography color={"green"} variant="body2">
                            {params.row.status}
                        </Typography>
                    )}
                </Typography>
            )
        },
        {
            field: 'delete',
            sortable: false,
            renderHeader: () => (
                <span></span>
            ),
            renderCell: (params: GridCellParams) => {
                return (
                    <Button
                    onClick={(e) => {handleVerification(params.row.id)}}
                    variant="contained"
                    color="error">
                        DELETE
                    </Button>
                )
            }
        }
      ];

    return(
        <>            
            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} marginBottom={2}>
                <Button
                onClick={handleOpenAdd}
                variant="contained"
                size="large">
                    ADD USER
                </Button>
                <Grid container xs={4}>
                    <TextField onChange={handleSearch} label="Search User" fullWidth/>
                </Grid>

                {/* add user modal */}
                <Modal
                    open={openAdd}
                    //onClose={handleClose} //close on clicking outside modal
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
                            <Button
                            onClick={handleCloseAdd}
                            sx={{color:'black', fontWeight: 'bolder', fontSize: '20px', paddingRight:0, borderRadius:'20px'}}
                            >
                                x
                            </Button>
                        </div>
                        <div style={{padding: '35px', paddingTop: '0px'}}>
                            <AddUserFormHook/>
                        </div>
                    </Box>
                </Modal>
                
                {/* delete user modal */}
                <Modal
                    open={openVerif}
                    //onClose={handleClose} //close on clicking outside modal
                    aria-labelledby="Verify Password"
                    aria-describedby="Form for verifying current user password then deleting target user"
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
                            <Button
                            onClick={handleCloseVerif}
                            sx={{color:'black', fontWeight: 'bolder', fontSize: '20px', paddingRight:0, borderRadius:'20px'}}>
                                x
                            </Button>
                        </div>
                        <div style={{padding: '15px', paddingTop: '0px'}}>
                            <PasswordAuthHook/>
                        </div>
                    </Box>
                </Modal>

            </Box>

            <Box height={560} marginBottom={2}>
                <DataGrid
                    autoHeight
                    rows={searchedUsers}
                    columns={columns}
                    hideFooterSelectedRowCount
                    onRowDoubleClick={(e) => {handleProfile(e.row.email)}}
                    slots={{
                        noRowsOverlay: usersLoading ? LoadingRowsDataGridOverlay : NoRowsDataGridOverlay,
                    }}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10},
                        },
                    }}
                    pageSizeOptions={[10]}
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