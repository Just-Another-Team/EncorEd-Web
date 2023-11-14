import React, {useEffect} from "react";
import { 
    Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField,
} from "@mui/material";
import { DataGrid, GridCellParams, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../../app/encored-store-hooks";
import { deleteRole, getRolesByInstitution } from "../../../../app/features/role/roleSlice";
import dayjs from "dayjs";
import { FixMeLater } from "../../../../types/FixMeLater";

const CustomDialog = ({open, handleClose, value}: FixMeLater) => {
    return(
        <Dialog
        open={open}
        onClose={handleClose}
        component='form'>
            {/* Should have been content */}
            <DialogTitle>Delete {value.name}?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To complete the deletion process, please enter your password.
                </DialogContentText>
                <TextField
                    autoComplete="off"
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Password"
                    type="password"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose} color="error">Delete</Button>
            </DialogActions>
        </Dialog>
    )
}

const RoleList = () => {

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const roles = useAppSelector(state => state.role.data)
    const institution = useAppSelector(state => state.institution.data.id)

    const [open, setOpen] = React.useState(false);
    const [role, setRole] = React.useState({});
    const [roleList, setRoleList] = React.useState(roles);

    const handleClickOpen = (params: any) => {
        dispatch(deleteRole(params.row.id)).unwrap()
            .then(() => {
                alert("Role successfully deleted!")
            })
            .catch((error) => {
                alert(`Error on deleted: ${error.response.data}`)
            })
        // To Do - Verify Deletion
        // setRole(params.row)
        // setOpen(true);
    };
    const handleClose = (event: {}, reason: "backdropClick" | "escapeKeyDown") => {
        if (reason != "backdropClick")
            setOpen(false)
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 0.5 },
        { field: 'name', headerName: 'Role name', flex: 1 },
        {
            field: 'groupsAssigned',
            headerName: 'Groups Assigned',
            type: 'number',
            flex: 1,
        },
        {
            field: 'usersAssigned',
            headerName: 'Users Assigned',
            type: 'number',
            flex: 1,
            valueGetter: (params: GridValueGetterParams) => {
                return params.row.usersAssigned.length
            },
        },
        {
            field: 'createdBy',
            headerName: 'Created By',
            sortable: false,
            flex: 1,
            valueGetter: (params: GridValueGetterParams) => {
                return `${params.row.createdBy.firstName} ${params.row.createdBy.lastName}`
            },
        },
        {
            field: 'creationDate',
            headerName: 'Added In',
            flex: 1,
            valueGetter: (params: GridValueGetterParams) => {
                return dayjs(params.row.creationDate).format("MMMM-DD-YYYY")
            },
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
                    onClick={() => {handleClickOpen(params)}}
                    variant="contained"
                    color="error">
                        DELETE
                    </Button>
                )
            }
        }
    ];
    
    const handleSearchRole = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let searchedValue = roles.filter(role => role.name?.toLowerCase().includes(e.target.value.toLowerCase()))
        setRoleList(searchedValue)
    }

    useEffect(() => {
        dispatch(getRolesByInstitution(institution?.toLowerCase()))
    }, [roles])

    return(
        <>            
            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} marginBottom={2}>
                <Button
                component={Link}
                to={`/dashboard/role/${institution}/add`}
                variant="contained"
                size="large">
                    ADD ROLE
                </Button>
                <Grid container xs={4}>
                    <TextField label="Search Role" onChange={handleSearchRole} fullWidth/>
                </Grid>
            </Box>

            <Box marginBottom={2}>

                <DataGrid
                    rows={roleList}
                    columns={columns}
                    hideFooterSelectedRowCount
                    columnVisibilityModel={{
                        id: false,
                    }}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10},
                        },
                    }}
                    onRowDoubleClick={(e) => {
                        console.log(e.row)
                        navigate(`${e.row.id}`)
                        // window.location.href = '/dashboard/subject/testId'
                    }}
                    pageSizeOptions={[10]}
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

            <CustomDialog open={open} handleClose={handleClose} value={role}/>
        </>
    )
}

export default RoleList