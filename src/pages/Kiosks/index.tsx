import { 
    Box,
    Typography,
    Button,
    Snackbar,
    Alert,
    Fade
} from "@mui/material"
import { useModal } from "../../hooks/useModal"
import KioskList from "./KioskList";
import useLoading from "../../hooks/useLoading";
import IUser from "../../data/IUser";
import { useUsers } from "../../hooks/useUsers";
import KioskForm from "./KioskForm";
import { useState } from "react";

const Kiosks = () => {
    const { addKiosk, getCurrentUser } = useUsers()
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

    const [ message, setMessage ] = useState<string>()

    const handleAddKiosk = async (data: IUser) => {
        openLoading()

        const user: IUser = {
            ...data,
            ROLE_ID: {
                kiosk: true
            },
            DEPT_ID: null,
            USER_CREATEDBY: getCurrentUser()?.USER_ID,
            USER_UPDATEDBY: getCurrentUser()?.USER_ID
        }

        await addKiosk(user)
            .then((result) => {
                console.log(result)
                setMessage("Kiosk is added successfully!")
                openSuccessSnackbar()
            })
            .catch((error) => {
                console.error(error)
                setMessage(error.response.data)
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
                    Kiosks
                </Typography>


                <Button
                onClick={handleOpenModal}
                size="large"
                variant="contained">
                    Add Kiosk
                </Button>
            </Box>

            <Box
            width={'100%'}
            height={580}>
                <KioskList />
            </Box>

            <KioskForm
            loading={loading}
            onSubmit={handleAddKiosk}
            title="Add Kiosk"
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

export default Kiosks