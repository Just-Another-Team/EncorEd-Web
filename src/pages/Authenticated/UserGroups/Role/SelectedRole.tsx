import React from "react"
import {
    Box,
    Button,
    Divider,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    Switch,
    TextField,
    Typography,
    useMediaQuery,
    CircularProgress,
    Tabs,
    Tab,
    Checkbox,
    IconButton,
} from '@mui/material'
import { FixMeLater } from "../../../../types/FixMeLater"
import { useAppDispatch, useAppSelector } from "../../../../app/encored-store-hooks"
import { deleteRole } from "../../../../app/features/role/roleSlice"
import { Outlet, useNavigate, useParams } from "react-router-dom"
import dayjs from "dayjs"
import { User } from "../../../../app/features/users/usersSlice"
import CustomTab from "../../../../components/Tab/CustomTab"
import { Link } from "react-router-dom"
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';

const SelectedRole = () => {
    const navigate = useNavigate();

    const { roleId } = useParams();

    const dispatch = useAppDispatch()
    const loading = useAppSelector(state => state.role.loading)
    const user = useAppSelector(state => state.authentication.data.email)
    const institution = useAppSelector(state => state.institution.data)
    const selectedRole = useAppSelector(state => state.role.data.find(role => role.id === roleId))

    const [page, setPage] = React.useState(0);

    const handleChange = (event: FixMeLater, newValue: FixMeLater) => {
        setPage(newValue);
    };

    const handleDelete = () => {
        dispatch(deleteRole(selectedRole!.id!)).unwrap()
            .then(() => {
                alert("Role successfully deleted!")

                navigate("/dashboard/list/roles/u/encored")
            })
            .catch((error) => {
                alert(`Error on deleted: ${error.response.data}`)
            })
    }

    const handleUpdate = () => {
        navigate(`/dashboard/role/${institution.id}/${selectedRole?.id}/update`)
    }

    return(
        <>
            <Box marginBottom={2} padding={2} sx={{backgroundColor: "#F6F5FF"}}>
                <Grid spacing={2} container>
                    <Grid item xs={6}>
                        <Typography variant="h6" color={"#296EB4"} fontWeight={700}>
                            {`${(selectedRole?.name as string).charAt(0).toLocaleUpperCase()}${(selectedRole?.name as string).substring(1)}`}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack direction={"row-reverse"} gap={2}>
                            <Button startIcon={<DeleteForeverOutlinedIcon />} size="small" variant="outlined" color="error" onClick={handleDelete}>
                                Delete
                            </Button>
                            <Button startIcon={<UpdateOutlinedIcon />} size="small" variant="outlined" color="secondary" onClick={handleUpdate}>
                                Update
                            </Button>
                            {/* <IconButton color="error" onClick={handleDelete}>
                                <DeleteForeverOutlinedIcon />
                            </IconButton> */}
                            {/* <IconButton color="secondary" onClick={handleUpdate}>
                                <UpdateOutlinedIcon />
                            </IconButton> */}
                        </Stack>
                    </Grid>

                    <Grid item xs={6}>
                        <Stack direction={"row"} gap={2}>
                            <Typography variant="body1">Created By: </Typography>
                            <Typography variant="body1" fontWeight={700}>{`${(selectedRole?.createdBy as User).firstName} ${(selectedRole?.createdBy as User).lastName}`}</Typography>
                        </Stack>  
                    </Grid>
                    <Grid item xs={6}>
                        <Stack direction={"row"} gap={2}>
                            <Typography variant="body1">Created In: </Typography>
                            <Typography variant="body1" fontWeight={700}>{dayjs(selectedRole?.creationDate).format("MMMM DD, YYYY")}</Typography>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>

            <Box marginBottom={2}>
                <Typography variant="body1" fontWeight={700} marginBottom={1}>Description</Typography>
                <Typography variant="body1">{selectedRole?.desc}</Typography>
            </Box>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={page} onChange={handleChange} aria-label="basic tabs example">
                    <CustomTab label="Access" component={Link} to={`access`}/>
                    <CustomTab label="Users Assigned" component={Link} to={`users`}/>
                    <CustomTab label="Groups Assigned" component={Link} to={`groups`}/>
                </Tabs>
            </Box>

            {/* Must Be Outlet */}
            {/* Assigned Users */}
            {/* <Box height={640} marginBottom={2} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <DataGrid
                    rows={selectedRole!.usersAssigned}
                    columns={columns}
                    pageSizeOptions={[10]}
                    columnVisibilityModel={{
                        id: false,
                        firstName: false,
                        lastName: false,
                    }}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10},
                        },
                    }}
                    onRowDoubleClick={(e) => {
                        console.log(e.row)
                        navigate(`${e.row.id}`)
                    }}
                    slots={{
                        noRowsOverlay: CustomNoRowsOverlay,
                    }}
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
            </Box> */}
            
            <Outlet />
        </>
    )
}

export default SelectedRole