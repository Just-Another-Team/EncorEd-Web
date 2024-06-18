import { 
    Box,
    Typography,
    Button,
    Snackbar,
    Alert,
    Fade
} from "@mui/material"
import UsersList from "./UserList"
import { useModal } from "../../hooks/useModal"
import UserForm from "./UserForm";
import IUser from "../../data/IUser";
import useLoading from "../../hooks/useLoading";
import { useUsers } from "../../hooks/useUsers";
import { useState } from "react";

const Users = () => {
    const { addUser, getCurrentUser } = useUsers()
    const { openModal, handleCloseModal, handleOpenModal } = useModal();
    const { loading, closeLoading, openLoading } = useLoading()

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

    const [message, setMessage] = useState<string>()

    const handleAddUser = async (data: IUser) => {
        openLoading()

        const role = data.ROLE_ID as string

        const user: IUser = {
            ...data,
            ROLE_ID: {
                campusDirector: role === 'campusDirector' ? true : undefined,
                dean: role === 'dean' ? true : undefined,
                attendanceChecker: role === 'attendanceChecker' ? true : undefined,
                teacher: role === 'teacher' ? true : undefined,
            },
            USER_CREATEDBY: getCurrentUser()?.USER_ID,
            USER_UPDATEDBY: getCurrentUser()?.USER_ID,
            USER_ATTENDANCECHECKERSCHEDULE: data.USER_ATTENDANCECHECKERSCHEDULE ? data.USER_ATTENDANCECHECKERSCHEDULE : null
        }

        await addUser(user)
            .then((result) => {
                setMessage(result.data)
                openSuccessSnackbar()
            })
            .catch((error) => {
                setMessage(error.data)
                openErrorSnackbar()
            })

        handleCloseModal()
        closeLoading()
    }

    return (
        <Box
        height={592}>
            <Box
            display={"flex"}
            flexDirection={"row"}
            marginBottom={2}>
                <Typography
                variant="h4"
                flex={1}
                fontWeight={700}>
                    Users
                </Typography>


                <Button
                onClick={handleOpenModal}
                size="large"
                variant="contained">
                    Add Staff
                </Button>
            </Box>

            <Box
            width={'100%'}
            height={580}>
                <UsersList />
            </Box>

            <UserForm
            title="Add Staff"
            loading={loading}
            onSubmit={handleAddUser}
            openModal={openModal}
            closeModal={handleCloseModal}/>

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

        </Box>
    )
}

export default Users