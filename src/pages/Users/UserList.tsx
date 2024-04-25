import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
} from "@mui/x-data-grid"
import IUser, { UserRole } from "../../data/IUser"
import { DeleteOutlineOutlined, UpdateOutlined } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { useModal } from "../../hooks/useModal"
import { useUsers } from "../../hooks/useUsers"
import { useAuth } from "../../hooks/useAuth"
import DeleteDialog from "../../components/DialogDelete"
import IDepartment from "../../data/IDepartment"
import IRole from "../../data/IRole"
import UserForm from "./UserForm"
import useLoading from "../../hooks/useLoading"

const UsersList = () => {
    const { getCredentials } = useAuth()

    const { 
        getUsers,
        updateUser,
        deleteUser,
        setLoad,
        getCurrentUser
    } = useUsers();

    const { 
        openModal: updateModal,
        handleOpenModal: openUpdateModal,
        handleCloseModal: closeUpdateModal
    } = useModal();

    const { 
        openModal: deleteModal,
        handleOpenModal: openDeleteModal,
        handleCloseModal: closeDeleteModal
    } = useModal();

    const { loading, openLoading, closeLoading } = useLoading();

    const [ user, setUser ] = useState<IUser>();

    useEffect(() => {
        setLoad(true)
    }, [])

    const handleClear = () => {
        setUser(undefined)
    }

    const handleUpdate = async (userData: IUser) => {
        const data: IUser = {
            USER_ID: user?.USER_ID,
            USER_FNAME: userData.USER_FNAME,
            USER_LNAME: userData.USER_LNAME,
            USER_MNAME: userData.USER_MNAME,
            USER_EMAIL: userData.USER_EMAIL,
            USER_USERNAME: userData.USER_USERNAME,
            USER_PASSWORD: userData.USER_PASSWORD,
            ROLE_ID: {
                campusDirector: userData.ROLE_ID === "campusDirector" ? true : undefined,
                dean: userData.ROLE_ID === "dean" ? true : undefined,
                attendanceChecker: userData.ROLE_ID === "attendanceChecker" ? true : undefined,
                teacher: userData.ROLE_ID === "teacher" ? true : undefined,
            } as UserRole,
            DEPT_ID: userData.DEPT_ID,
            USER_UPDATEDBY: getCurrentUser()?.USER_ID,
        }

        openLoading()

        await updateUser(data)
            .then((result) => {
                console.log(result.data)
            })
            .catch((error) => {
                console.error(error)
            })
        
        closeLoading()
        closeUpdateModal()
    }

    const handleDelete = async () => {
        //Should've send a message
        await deleteUser(user?.USER_ID!)
            .then((result) => {
                console.log(result)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const UserHeaders: Array<GridColDef<IUser>> = [
        {
            field: "USER_ID",
            headerName: "ID",
        },
        {
            field: "USER_FULLNAME",
            headerName: "Fullname",
            minWidth: 256,
            flex: 1
        },
        {
            field: "ROLE_ID",
            headerName: "Role",
            minWidth: 256,
            renderCell: (params) => {
                const role = params.row.ROLE_ID as UserRole
                return role.campusDirector ? "Campus Director" : role.dean ? "Dean" : role.attendanceChecker ? "Attendance Checker" : role.teacher ? "Teacher" : role.kiosk 
            },
            flex: 0.4
        },
        {
            field: "DEPT_ID.DEPT_NAME",
            headerName: "Department",
            minWidth: 256,
            renderCell: (params) => {
                const department = params.row.DEPT_ID
                return department !== null ? (params.row.DEPT_ID as IDepartment).DEPT_NAME : null
            },
            flex: 0.6
        },
        {
            field: "UPDATE",
            headerName: "",
            type: "actions",
            getActions: (params) => {

                const handleOnClickUpdate = async (user: IUser) => {
                    openLoading()
                    openUpdateModal();

                    const credentials = await getCredentials(user.USER_ID as string)
                    const credentialData = credentials.data

                    closeLoading()

                    setUser({
                        ...user,
                        USER_EMAIL: credentialData.email,
                    });
                }
                
                const handleOnClickDelete = (user: IUser) => {
                    setUser(user);
                    openDeleteModal();
                }

                return [
                    <GridActionsCellItem
                    key={"update"}
                    icon={<UpdateOutlined />}
                    label="Edit"
                    className="textPrimary"
                    onClick={() => handleOnClickUpdate(params.row)}
                    color="secondary"
                    />,
                    <GridActionsCellItem
                    key={"delete"}
                    icon={<DeleteOutlineOutlined />}
                    label="Delete"
                    onClick={() => handleOnClickDelete(params.row)}
                    color="error"
                    />,
                ];
            },
            
        },
    ]

    const filteredUsers = getUsers()?.filter((user) => user.USER_ID !== getCurrentUser()?.USER_ID && !(user.ROLE_ID as UserRole).admin && !(user.ROLE_ID as UserRole).kiosk && !user.USER_ISDELETED)

    return (
        <>
            <DataGrid
            loading={loading}
            initialState={{
                columns: {
                    columnVisibilityModel: {
                        USER_ID: false,
                    }
                },
                pagination: {
                    paginationModel: {
                        pageSize: 25,
                    }
                }
            }}
            columns={UserHeaders}
            getRowId={(row) => row.USER_ID!}
            rows={filteredUsers!}/>

            <UserForm
            selectedUser={user}
            loading={loading}
            title={`Update ${user?.USER_FULLNAME}`}
            onSubmit={handleUpdate}
            openModal={updateModal}
            closeModal={closeUpdateModal}/>

            <DeleteDialog
            selectedObject={user as IUser}
            title={user?.USER_FULLNAME as string}
            handleClear={handleClear}
            deleteModal={deleteModal}
            onDelete={handleDelete}
            closeDeleteModal={closeDeleteModal}/>
        </>
    )
}

export default UsersList