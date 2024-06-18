import { 
    Alert,
    Box,
    Button,
    Fade,
    Snackbar,
    Typography
} from "@mui/material"
import { useModal } from "../../hooks/useModal";
import useLoading from "../../hooks/useLoading";
import DepartmentList from "./DepartmentList";
import DepartmentForm from "./DepartmentForm";
import IDepartment from "../../data/IDepartment";
import useDepartment from "../../hooks/useDepartment";
import IFloor from "../../data/IFloor";
import { useState } from "react";

const Department = () => {
    const { addDepartment } = useDepartment()
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

    const handleAddDepartment = async (data: IDepartment) => {
        openLoading()

        const floorAssigned = data.DEPT_FLOORSASSIGNED!.map((floor) => (floor as IFloor).FLR_ID as string)

        const newDepartment: IDepartment = {
            ...data,
            DEPT_FLOORSASSIGNED: floorAssigned,
        }

        await addDepartment(newDepartment)
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
        handleCloseModal()
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
                    Department
                </Typography>


                <Button
                onClick={handleOpenModal}
                size="large"
                variant="contained">
                    Add Department
                </Button>
            </Box>

            <Box
            width={'100%'}
            height={580}>
                <DepartmentList />
            </Box>

            <DepartmentForm
            title="Add Department"
            loading={loading}
            onSubmit={handleAddDepartment}
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

export default Department