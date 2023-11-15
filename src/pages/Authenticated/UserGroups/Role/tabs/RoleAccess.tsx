import React from 'react'
import { Box, Checkbox } from '@mui/material'
import { DataGrid, GridCellParams, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { useAppSelector } from '../../../../../app/encored-store-hooks'
import { styled } from "@mui/material/styles"
import { useNavigate, useParams } from 'react-router-dom'
import { Permission } from '../../../../../types/RoleTypes/Permission'

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
        <Box sx={{ mt: 1 }}>No Access Indicated</Box>
        </StyledGridOverlay>
    );
}

const RoleAccess = () => {
    const navigate = useNavigate();

    const { roleId } = useParams();

    const selectedRole = useAppSelector(state => state.role.data.find(role => role.id === roleId))

    const rolePermissions: Permission = typeof selectedRole?.employee !== 'boolean' ? selectedRole?.employee as Permission : 
                            typeof selectedRole?.teacher !== 'boolean' ? selectedRole?.teacher as Permission :
                            typeof selectedRole?.student !== 'boolean' ? selectedRole?.student  as Permission: 
                            selectedRole?.visitor as Permission;

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
            flex: 0.5 
        },
        { 
            field: 'accessName',
            headerName: 'Access Name', 
            flex: 1,
        },
        { 
            field: 'view',
            headerName: 'View', 
            renderCell: (params: GridCellParams) => {
                return(
                    <Checkbox checked={params.row.view} readOnly/>
                )
            }
        },
        { 
            field: 'add',
            headerName: 'Add', 
            renderCell: (params: GridCellParams) => {
                return(
                    <Checkbox checked={params.row.add} readOnly/>
                )
            }
        },
        {
            field: 'edit',
            headerName: 'Edit',
            sortable: false,
            renderCell: (params: GridCellParams) => {
                return(
                    <Checkbox checked={params.row.edit} readOnly/>
                )
            }
        },
        {
            field: 'delete',
            headerName: 'Delete',
            renderCell: (params: GridCellParams) => {
                return(
                    <Checkbox checked={params.row.delete} readOnly/>
                )
            }
        },
    ];

    const rows = [
        {id: 1, accessName: "Map", view: rolePermissions.viewMap, add: rolePermissions.addMap, edit: rolePermissions.editMap, delete: rolePermissions.deleteMap,},
        {id: 2, accessName: "Subject", view: rolePermissions.viewSubject?.value, add: rolePermissions.addSubject?.value, edit: rolePermissions.editSubject?.value, delete: rolePermissions.deleteSubject?.value,},
        {id: 3, accessName: "Subject (Schedule)", view: rolePermissions.viewSubject?.schedule, add: rolePermissions.addSubject?.schedule, edit: rolePermissions.editSubject?.schedule, delete: rolePermissions.deleteSubject?.schedule,},
        {id: 4, accessName: "Subject (Participants)", view: rolePermissions.viewSubject?.participants, add: rolePermissions.addSubject?.participants, edit: rolePermissions.editSubject?.participants, delete: rolePermissions.deleteSubject?.participants,},
        {id: 5, accessName: "Subject (Attendance)", view: rolePermissions.viewSubject?.attendance, add: rolePermissions.addSubject?.attendance, edit: rolePermissions.editSubject?.attendance, delete: rolePermissions.deleteSubject?.attendance,},
        
        {id: 6, accessName: "Event", view: rolePermissions.viewEvent?.value, add: rolePermissions.addEvent?.value, edit: rolePermissions.editEvent?.value, delete: rolePermissions.deleteEvent?.value,},
        {id: 7, accessName: "Event (Schedule)", view: rolePermissions.viewEvent?.schedule, add: rolePermissions.addEvent?.schedule, edit: rolePermissions.editEvent?.schedule, delete: rolePermissions.deleteEvent?.schedule,},
        {id: 8, accessName: "Event (Participants)", view: rolePermissions.viewEvent?.participants, add: rolePermissions.addEvent?.participants, edit: rolePermissions.editEvent?.participants, delete: rolePermissions.deleteEvent?.participants,},
        {id: 9, accessName: "Event (Attendance)", view: rolePermissions.viewEvent?.attendance, add: rolePermissions.addEvent?.attendance, edit: rolePermissions.editEvent?.attendance, delete: rolePermissions.deleteEvent?.attendance,},
        
        {id: 10, accessName: "Users", view: rolePermissions.viewUser, add: rolePermissions.addUser, edit: rolePermissions.editUser, delete: rolePermissions.deleteUser,},
        {id: 11, accessName: "Groups", view: rolePermissions.viewGroup, add: rolePermissions.addGroup, edit: rolePermissions.editGroup, delete: rolePermissions.deleteGroup,},
        {id: 12, accessName: "Roles", view: rolePermissions.viewRole, add: rolePermissions.addRole, edit: rolePermissions.editRole, delete: rolePermissions.deleteRole,},

    ]

    return(
        <Box marginBottom={2} sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <DataGrid
                autoHeight
                rows={rows}
                columns={columns}
                pageSizeOptions={[12]}
                columnVisibilityModel={{
                    id: false,
                    firstName: false,
                    lastName: false,
                }}
                disableColumnFilter
                disableRowSelectionOnClick
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
    )
}

export default RoleAccess