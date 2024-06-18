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
import { Alert, Avatar, Box, Button, Fade, Link, Slide, Snackbar, Typography } from "@mui/material"
import { Link as RouterLink } from 'react-router-dom'
import { useSubject } from "../../hooks/useSubject"
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from "../../app/firebase/config"
import SnackBar from "../../components/Snackbar/SnackBar"
import DialogMessage from "../../components/DialogMessage"

const UsersList = () => {
    const { getCredentials } = useAuth()

    const { 
        getUsers,
        updateUser,
        deleteUser,
        getCurrentUser,
        getUser,
        getUsersByCreator
    } = useUsers();

    const { getSubjects, removeAssignedTeacher } = useSubject()

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
        openModal: isVerified,
        handleOpenModal: openVerify,
        handleCloseModal: closeVerify
    } = useModal()

    const { loading, openLoading, closeLoading } = useLoading();

    const [ user, setUser ] = useState<IUser>();
    const [ updatedUser, setUpdatedUser ] = useState<IUser>();
    const [ message, setMessage] = useState<string>();

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
            USER_ATTENDANCECHECKERSCHEDULE: userData.USER_ATTENDANCECHECKERSCHEDULE ? userData.USER_ATTENDANCECHECKERSCHEDULE : null,
            ROLE_ID: {
                campusDirector: userData.ROLE_ID === "campusDirector" ? true : undefined,
                dean: userData.ROLE_ID === "dean" ? true : undefined,
                attendanceChecker: userData.ROLE_ID === "attendanceChecker" ? true : undefined,
                teacher: userData.ROLE_ID === "teacher" ? true : undefined,
            } as UserRole,
            DEPT_ID: userData.DEPT_ID,
            USER_UPDATEDBY: getCurrentUser()?.USER_ID,
            USER_IMAGE: userData.USER_IMAGE,
        }

        //console.log(data.USER_ID)
        const assignedSubjects = getSubjects().filter(subjects => subjects.USER_ID !== null && (subjects.USER_ID as IUser).USER_ID === data.USER_ID)

        if (user && (user?.ROLE_ID as UserRole).teacher !== (data.ROLE_ID as UserRole).teacher && assignedSubjects.length > 0) {
            openVerify()
            setUpdatedUser(data)
            return
        }

        openLoading()

        await updateUser(data)
            .then((result) => {
                //Snack bar
                setMessage(result.data)
                openSuccessSnackbar()
            })
            .catch((error) => {
                console.error(error)
                setMessage(error.data)
                openErrorSnackbar()
            })
        
        closeLoading()
        closeUpdateModal()
    }

    const verifySubmit = async () => {
        const subjectIds = getSubjects().filter(subject => subject.USER_ID !== null && (subject.USER_ID as IUser).USER_ID === user?.USER_ID).map(subject => subject.SUB_ID as string)

        closeVerify()
        openLoading()

        await removeAssignedTeacher(subjectIds)
            .then(() => deleteUser(user?.USER_ID!))
            .then((result) => {
                console.log(result.data)
                setMessage(result.data)
                openSuccessSnackbar()
            })
            .catch((error) => {
                console.error(error.response.data)
                setMessage(error.response.data)
                openErrorSnackbar()
            })

        await updateUser(updatedUser!)
            .then((result) => {
                setMessage(result.data)
                openSuccessSnackbar()
            })
            .catch((error) => {
                console.error(error)
                setMessage(error.data)
                openErrorSnackbar()
            })

        closeLoading()
        closeUpdateModal()
    }

    const handleDelete = async () => {
        const subjectIds = getSubjects().filter(subject => (subject.USER_ID as IUser).USER_ID === user?.USER_ID).map(subject => subject.SUB_ID as string)

        await removeAssignedTeacher(subjectIds)
            .then(() => deleteUser(user?.USER_ID!))
            .then((result) => {
                console.log(result.data)
                setMessage(result.data)
                openSuccessSnackbar()
            })
            .catch((error) => {
                console.error(error.response.data)
                setMessage(error.response.data)
                openErrorSnackbar()
            })
    }

    const UserHeaders: Array<GridColDef<IUser>> = [
        {
            field: "USER_ID",
            headerName: "ID",
            minWidth: 320,
        },
        {
            field: "USER_FULLNAME",
            headerName: "Fullname",
            minWidth: 256,
            flex: 1,
            renderCell: (params) => {
                return (
                    (params.row.ROLE_ID as UserRole).teacher ? 
                    <Box
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    gap={2}>
                        {/* <Avatar src="/assets/profilepic.png" /> */}
                        <Link
                        component={RouterLink}
                        to={`/${role.admin ? "admin" : role.campusDirector ? "campusDirector" : "dean" }/users/${params.row.USER_ID}`}
                        underline="none">
                            {params.row.USER_FULLNAME}
                        </Link>
                    </Box> : 
                    <Box
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    gap={2}>
                        {/* <Avatar src="/assets/profilepic.png" /> */}
                        <Typography variant="body2">{params.row.USER_FULLNAME}</Typography>
                    </Box>
                )
            }
        },
        // {
        //     field: "USER_EMAIL",
        //     headerName: "Email",
        //     minWidth: 256,
        // },
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
            field: "USER_CREATEDBY",
            headerName: "Created by",
            minWidth: 192,
            renderCell: (params) => {
                const createdBy = params.row.USER_CREATEDBY
                return createdBy ? getUser(createdBy)?.USER_FULLNAME : "No creator"
            },
            // flex: 0.6
        },
        {
            field: "UPDATE",
            headerName: "",
            type: "actions",
            getActions: (params) => {

                const handleOnClickUpdate = async (user: IUser) => {
                    console.log("On Update: ", user)

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

    const filteredUsers = (users: Array<IUser>): Array<IUser> => {
        return users.filter((user) => user.USER_ID !== getCurrentUser()?.USER_ID && !(user.ROLE_ID as UserRole).admin && !(user.ROLE_ID as UserRole).kiosk && !user.USER_ISDELETED)
    }

    const role = getCurrentUser()?.ROLE_ID as UserRole

    return (
        <>
            <DataGrid
            loading={loading}
            initialState={{
                columns: {
                    columnVisibilityModel: {
                        //USER_ID: false,
                        USER_CREATEDBY: role.admin ? true : false
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
            rows={filteredUsers( role.admin || role.campusDirector ? getUsers() : getUsersByCreator(getCurrentUser()?.USER_ID as string))}/>

            <UserForm
            selectedUser={user}
            loading={loading}
            title={`Update ${user?.USER_FULLNAME}`}
            onSubmit={handleUpdate}
            openModal={updateModal}
            closeModal={closeUpdateModal}/>

            <DialogMessage
            open={isVerified}
            title="Are you sure want to change role?">
                <DialogMessage.Body>
                    <Typography
                    variant="body1"
                    marginBottom={1}>
                        This user is assigned to subjects. Continuing the submission will remove the user from the subjects its assigned to.
                    </Typography>
                    <Typography
                    variant="body1"
                    marginBottom={1}>
                        Do you wish to continue?
                    </Typography>
                </DialogMessage.Body>
                <DialogMessage.Footer>
                    <Button
                    color="error"
                    onClick={() => {
                        closeVerify()
                    }}>
                        No
                    </Button>
                    <Button
                    color="primary"
                    onClick={verifySubmit}>
                        Yes
                    </Button>
                </DialogMessage.Footer>
            </DialogMessage>

            <DeleteDialog
            selectedObject={user as IUser}
            title={user?.USER_FULLNAME as string}
            handleClear={handleClear}
            deleteModal={deleteModal}
            onDelete={handleDelete}
            closeDeleteModal={closeDeleteModal}/>

            <SnackBar
            message={message}
            onClose={closeSuccessSnackbar}
            open={successSnackbar}
            severity="success"/>

            <SnackBar
            message={message}
            onClose={closeErrorSnackbar}
            open={errorSnackbar}
            severity="error"/>
        </>
    )
}

export default UsersList