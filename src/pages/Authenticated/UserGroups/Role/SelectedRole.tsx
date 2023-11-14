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
} from '@mui/material'
import {useForm, Controller} from 'react-hook-form'
import FormInputDropDown from "../../../../components/DropDown/FormInputDropDown"
import FormInputTextField from "../../../../components/TextField/FormInputTextField"
import FormInputSwitch from "../../../../components/Switch/FormInputSwitch"
import { useTheme } from "@emotion/react"
import { FixMeLater } from "../../../../types/FixMeLater"
import { Permission } from "../../../../types/RoleTypes/Permission"
import { RegisterFormInput } from "../../../../types/RegisterFormInput"
import { useAppDispatch, useAppSelector } from "../../../../app/encored-store-hooks"
import { addRole, deleteRole } from "../../../../app/features/role/roleSlice"
import { RoleInput } from "../../../../app/api/encored-role-service"
import { useNavigate, useParams } from "react-router-dom"
import dayjs from "dayjs"
import { DataGrid, GridCellParams, GridColDef, GridValueGetterParams } from "@mui/x-data-grid"
import { User } from "../../../../app/features/users/usersSlice"
import { styled } from "@mui/material/styles"

const StyledGridOverlay = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    '& .ant-empty-img-1': {
        fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626',
    },
    '& .ant-empty-img-2': {
        fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
    },
    '& .ant-empty-img-3': {
        fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
    },
    '& .ant-empty-img-4': {
        fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
    },
    '& .ant-empty-img-5': {
        fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
        fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
    },
}));
  
function CustomNoRowsOverlay() {
    return (
        <StyledGridOverlay>
        <svg
            width="120"
            height="100"
            viewBox="0 0 184 152"
            aria-hidden
            focusable="false"
        >
            <g fill="none" fillRule="evenodd">
            <g transform="translate(24 31.67)">
                <ellipse
                className="ant-empty-img-5"
                cx="67.797"
                cy="106.89"
                rx="67.797"
                ry="12.668"
                />
                <path
                className="ant-empty-img-1"
                d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
                />
                <path
                className="ant-empty-img-2"
                d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
                />
                <path
                className="ant-empty-img-3"
                d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
                />
            </g>
            <path
                className="ant-empty-img-3"
                d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
            />
            <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
                <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
                <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
            </g>
            </g>
        </svg>
        <Box sx={{ mt: 1 }}>No Rows</Box>
        </StyledGridOverlay>
    );
}

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

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 0.5 },
        { 
            field: 'firstName',
            headerName: 'User', 
            flex: 1,
        },
        { 
            field: 'lastName',
            headerName: 'User', 
            flex: 1,
        },
        { 
            field: 'fullName',
            headerName: 'User', 
            flex: 1,
            valueGetter: (params: GridValueGetterParams) => {
                return `${params.row.firstName} ${params.row.lastName}`
            },
        },
        {
            field: 'email',
            headerName: 'Email',
            sortable: false,
            flex: 1,
        },
        {
            field: 'assignedIn',
            headerName: 'Assigned In',
            flex: 1,
        },
        {
            field: 'status',
            headerName: 'Status',
            sortable: false,
            flex: 1,
        },
    ];

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
                            {`${selectedRole?.name?.charAt(0).toLocaleUpperCase()}${selectedRole?.name?.substring(1)}`}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack direction={"row-reverse"} gap={2}>
                            <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
                            <Button variant="contained" color="secondary" onClick={handleUpdate}>Update</Button>
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
                    <Tab label="Access" />
                    <Tab label="Users Assigned" />
                    <Tab label="Groups Assigned" />
                    {/* <CustomTab label="User" component={Link} to={`users/u/${institution}`}/>
                    <CustomTab label="Groups" component={Link} to={`groups/u/${institution}`}/>
                    <CustomTab label="Roles" component={Link} to={`roles/u/${institution}`}/> */}
                </Tabs>
            </Box>

            {/* Must Be Outlet */}
            <Box height={640} marginBottom={2} sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
            </Box>
        </>
    )
}

export default SelectedRole