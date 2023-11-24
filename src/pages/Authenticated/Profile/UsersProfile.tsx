import React, { useState, useEffect } from "react";
import { 
    Box,
    Typography,
    Grid,
    Stack,
    ButtonBase,
    List,
    ListItem,
    ListItemText,
    Button,
    Modal,
    Switch,
    Checkbox,
} from "@mui/material";
import dayjs from 'dayjs'
import { Controller, useForm } from "react-hook-form";
import { viewUserRoles, viewUser } from "../../../app/features/profile/profileSlice";
import { useNavigate, useParams } from "react-router-dom";
import { FixMeLater } from "../../../types/FixMeLater";
import { useAppDispatch, useAppSelector } from "../../../app/encored-store-hooks";
import { AssignRoleInput } from "../../../app/api/encored-role-service";
import { GridColDef, DataGrid, GridCellParams } from "@mui/x-data-grid";
import FormInputDropDown from "../../../components/DropDown/FormInputDropDown";
import { getRolesByInstitution } from "../../../app/features/role/roleSlice";
import { assignUserToRole } from "../../../app/features/users/usersSlice";


const UsersProfile = () => {
    //const { email } = useParams();
    const email = useAppSelector(state => state.target.target)
    const [isLoading, setIsLoading] = useState(true)

    const profile = useAppSelector(state => state.profile)
    const user = useAppSelector(state => state.profile.data)
    const userRoles = useAppSelector(state => state.profile.roles)
    const rolesList = useAppSelector(state => state.role.data)
    const institution = useAppSelector(state => state.institution.data.id)
    
    const [instRoleList, setInstRoleList] = React.useState<any>([]);
    
    // const val: object = arr.filter((data: FixMeLater) => data.userName === result)
    const userDispatch = useAppDispatch();
    const roleDispatch = useAppDispatch();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            roleDispatch(getRolesByInstitution(institution!.toLowerCase())).unwrap().then((roles) => {
                setInstRoleList(roles.data)
            })
            try{
                await userDispatch(viewUser(email))
                await roleDispatch(viewUserRoles(email))
            } catch(e){
                console.log(e)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])

    // const user = useAppSelector(state => state.profile.data)
    const [openAssign, setOpenAssign] = useState(false);
    const handleOpenAssign = () => setOpenAssign(true);
    const handleCloseAssign = () => setOpenAssign(false);

    const [isChecked, setIsChecked] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
    };

    //Assign roles components
    function isAssigned(arr1: FixMeLater[], arr2: FixMeLater[]): boolean {
        return arr1.some(el => arr2.includes(el));
    }


    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Role Name', width: 200, sortingOrder:['asc', 'desc'], }
    ]

    let rolesNames = userRoles.map((e:any) => e.name)

    const assignRole = async (userId: FixMeLater, roleId: string) => {
        const data = {userId: userId, roleId: roleId}
        try{
            await roleDispatch(assignUserToRole(data))
            .then(()=>{
                alert('Successfully assigned')
            })
        }
        catch(e){
            console.log(e)
        }
    }

    const assignColumns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Roles',
            flex: 1,
        },
        {
            field: 'status',
            headerName: '',
            renderCell: (params: GridCellParams) => {
                return(
                    <>
                        {isAssigned(rolesNames, params.row.name) ? (
                                <Checkbox checked={true} color='success' onClick={() => {console.log(params.row)}}/>
                            ) : (
                                <Checkbox color='success' onClick={() => {assignRole(user.id, params.row.id).then(()=>{window.location.reload()})}}/>
                            )
                        }
                    </>
                )
            }
        }
    ]
    
    return (
        <>
            <Grid spacing={3} container>
                {isLoading ? (
                    <Typography variant="h4" fontWeight={700}>Loading...</Typography>
                ) : (
                <Grid xs={9} item>
                    {/* Banner Cover */}
                    <Box height={256} sx={{backgroundColor: '#A9C5E1'}} />

                    <Box display={"flex"} flexDirection={"column"} marginTop={-14} marginBottom={2} sx={{justifyContent: 'center', alignItems: 'center'}}>
                        <Box sx={{borderRadius: 360}}>
                            <img width={160} height={160} src="/assets/profilepic.png"/>
                        </Box>
                        <Typography variant="h4" fontWeight={700}>{user!.firstName} {user?.lastName}</Typography> {/* {user.firstName} {user.lastName} */}
                    </Box>

                    <Box display={'block'}>
                        <Grid container marginBottom={2} sx={{backgroundColor: '#F6F5FF', borderRadius: 4, padding: 2}}>
                            <Grid item xs={12}>
                                <Typography variant="h6" fontWeight={700} marginBottom={1}>Details</Typography>
                            </Grid>

                            <Grid item xs={6} marginBottom={2}>
                                <Typography variant="body1" fontWeight={700}>Email:</Typography>
                                <Typography variant="body1">{user?.id}</Typography> {/*  */}
                            </Grid>
                            
                            <Grid item xs={6} marginBottom={2}>
                                <Typography variant="body1" fontWeight={700}>Joined Date:</Typography>
                                <Typography variant="body1">{dayjs(user?.joinDate).format("MMMM D, YYYY")}</Typography> {/*  */}
                            </Grid>

                            <Grid item xs={6} marginBottom={2}>
                                <Typography variant="body1" fontWeight={700}>Institution:</Typography>
                                <Typography variant="body1">{user.institution}</Typography>
                            </Grid>

                            {user.addedBy !== null && (
                                <Grid marginBottom={2}>
                                    <Typography variant="body1" fontWeight={700}>Added By:</Typography>
                                    <Typography variant="body1">{user.addedBy}</Typography>
                                </Grid>
                            )}
                        </Grid>
                        
                        <Grid container marginBottom={2} sx={{backgroundColor: '#F6F5FF', borderRadius: 4, padding: 2}}>
                            <Grid item xs={12}>
                                <Typography variant="h5" fontWeight={700}>Roles</Typography>
                            </Grid>
                            <Grid item xs={12} marginBottom={2}>
                                <DataGrid
                                    autoHeight
                                    rows={userRoles}
                                    columns={columns}
                                    hideFooterSelectedRowCount
                                    initialState={{
                                        pagination: {
                                            paginationModel: { page: 0, pageSize: 5},
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
                            </Grid>
                            <Grid item xs={6} marginBottom={2}>
                                <Button onClick={handleOpenAssign}>
                                    Assign Roles
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                )
                }
            </Grid>
            <Modal
                    open={openAssign}
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
                            onClick={handleCloseAssign}
                            sx={{color:'black', fontWeight: 'bolder', fontSize: '20px', paddingRight:0, borderRadius:'20px'}}
                            >
                                x
                            </Button>
                        </div>
                        <Box display={'block'} padding={2}>
                        <div style={{padding: '35px', paddingTop: '0px'}}>
                            <DataGrid
                                autoHeight
                                rows={instRoleList}
                                columns={assignColumns}
                                columnVisibilityModel={{
                                    id: false
                                }}
                                disableColumnFilter
                                disableRowSelectionOnClick
                                hideFooter
                                sx={{
                                    '&.MuiDataGrid-root': {
                                        border: '1px solid #EFEEFB',
                                        backgroundColor: 'white'
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
                        </div>
                        </Box>
                    </Box>
                </Modal>
        </>
    )
}

export default UsersProfile