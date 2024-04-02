import { 
    Box,
    Typography,
    Button
} from "@mui/material"
import UsersList from "./UserList"
import { useModal } from "../../hooks/useModal"
import UserForm from "./UserForm";
import IUser from "../../types/IUser";
import useLoading from "../../hooks/useLoading";
import { useUsers } from "../../hooks/useUsers";

const Users = () => {
    const { addUser } = useUsers()
    const { openModal, handleCloseModal, handleOpenModal } = useModal();
    const { loading, closeLoading, openLoading } = useLoading()

    const handleAddUser = async (data: IUser) => {
        openLoading()
        
        await addUser(data)
            .then((result) => {
                console.log(result)
            })
            .catch((error) => {
                console.error(error)
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
            loading={loading}
            onSubmit={handleAddUser}
            openModal={openModal}
            closeModal={handleCloseModal}/>

        </Box>
    )
}

export default Users