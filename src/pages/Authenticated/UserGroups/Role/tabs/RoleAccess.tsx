import React from 'react'
import { Box, Checkbox } from '@mui/material'
import { DataGrid, GridCellParams, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { useAppSelector } from '../../../../../app/encored-store-hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { Permission } from '../../../../../types/RoleTypes/Permission'
import NoRowsDataGridOverlay from '../../../../../components/Overlay/NoRows/NowRowsOverlay'

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
                    noRowsOverlay: NoRowsDataGridOverlay,
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