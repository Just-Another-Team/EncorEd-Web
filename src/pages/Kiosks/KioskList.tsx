import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
    GridRowParams,
} from "@mui/x-data-grid"
import { useNavigate } from 'react-router-dom'
import IUser, { UserRole } from "../../data/IUser"
import { DeleteOutlineOutlined, UpdateOutlined } from "@mui/icons-material"
import { useState } from "react"
import { useModal } from "../../hooks/useModal"
import { useUsers } from "../../hooks/useUsers"
import DeleteDialog from "../../components/DialogDelete"
import useLoading from "../../hooks/useLoading"
import KioskForm from "./KioskForm"
import { useAuth } from "../../hooks/useAuth"
import { Alert, Fade, Snackbar } from "@mui/material"

const KioskList = () => {
    const { getCredentials } = useAuth()

    const { 
        users,
        updateKiosk,
        deleteUser,
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

    const { 
        openModal: successSnackbar,
        handleOpenModal: openSuccessSnackbar,
        handleCloseModal: closeSuccessSnackbar
    } = useModal();

    const { 
        openModal: errorSnackbar,
        handleOpenModal: openErrorSnackbar,
        handleCloseModal: closeErrorSnackbar
    } = useModal();

    const [ message, setMessage ] = useState<string>();

    const { loading, openLoading, closeLoading } = useLoading();
    const navigate = useNavigate()

    const [ kiosk, setKiosk ] = useState<IUser>();

    const handleRowClick = (e: GridRowParams<IUser>) => {
        navigate(`${e.row.USER_ID}`)
    }

    const handleClear = () => {
        setKiosk(undefined)
    }

    const handleUpdate = async (userData: IUser) => {
        const data: IUser = {
            USER_ID: kiosk?.USER_ID,
            USER_EMAIL: userData.USER_EMAIL,
            USER_USERNAME: userData.USER_USERNAME,
            USER_PASSWORD: userData.USER_PASSWORD,
            ROLE_ID: null,
            DEPT_ID: null,
            USER_UPDATEDBY: getCurrentUser()?.USER_ID
        }

        openLoading()

        await updateKiosk(data)
            .then((result) => {
                console.log(result.data)
                setMessage(result.data)
                openSuccessSnackbar()
            })
            .catch((error) => {
                console.error(error)
                setMessage(error.response.data)
                openErrorSnackbar()
            })
        
        closeLoading()
        closeUpdateModal()
    }

    const handleDelete = async () => {
        await deleteUser(kiosk?.USER_ID!)
            .then((result) => {
                console.log(result)
                setMessage("Kiosk Deleted Successfully!")
                openSuccessSnackbar()
            })
            .catch((error) => {
                console.error(error)
                setMessage(error.response.data)
                openErrorSnackbar()
            })
    }

    const KioskHeaders: Array<GridColDef<IUser>> = [
        {
            field: "USER_ID",
            headerName: "ID",
        },
        {
            field: "USER_USERNAME",
            headerName: "Label",
            minWidth: 256,
            flex: 1
        },
        // {
        //     field: "ROLE_ID",
        //     headerName: "Role",
        //     minWidth: 256,
        //     renderCell: (params) => {
        //         const role = params.row.ROLE_ID as UserRole

        //         return role.campusDirector ? "Campus Director" : role.dean ? "Dean" : role.attendanceChecker ? "Attendance Checker" : role.teacher ? "Teacher" : role.kiosk 
        //     }
        // },
        {
            field: "UPDATE",
            headerName: "",
            type: "actions",
            getActions: (params) => {

                const handleOnClickUpdate = async (user: IUser) => {
                    const credential = await getCredentials(user.USER_ID as string)
                    const credentialData = credential.data

                    setKiosk({
                        ...user,
                        USER_EMAIL: credentialData.email
                    });
                    openUpdateModal();
                }
                
                const handleOnClickDelete = (user: IUser) => {
                    setKiosk(user);
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

    const kiosks = users?.filter((user) => (user.ROLE_ID as UserRole).kiosk && !user.USER_ISDELETED)

    return (
        <>
            <DataGrid
            loading={users?.length! > 0 ? false : true}
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
            onRowDoubleClick={handleRowClick}
            columns={KioskHeaders}
            getRowId={(row) => row.USER_ID!}
            rows={kiosks}/>

            <KioskForm
            selectedUser={kiosk}
            loading={loading}
            title={`Update ${kiosk?.USER_USERNAME}`}
            onSubmit={handleUpdate}
            openModal={updateModal}
            closeModal={closeUpdateModal}/>

            <DeleteDialog
            selectedObject={kiosk as IUser}
            handleClear={handleClear}
            deleteModal={deleteModal}
            onDelete={handleDelete}
            title={kiosk?.USER_USERNAME as string}
            closeDeleteModal={closeDeleteModal}/>

            <Snackbar
            open={successSnackbar}
            autoHideDuration={3000}
            TransitionComponent={Fade}
            onClose={closeSuccessSnackbar}>
                <Alert
                variant="filled"
                severity="success"
                onClose={closeSuccessSnackbar}>
                    { message }
                </Alert>
            </Snackbar>

            <Snackbar
            open={errorSnackbar}
            autoHideDuration={3000}
            TransitionComponent={Fade}
            onClose={closeErrorSnackbar}>
                <Alert
                variant="filled"
                severity="error"
                onClose={closeErrorSnackbar}>
                    { message }
                </Alert>
            </Snackbar>
        </>
    )
}

export default KioskList