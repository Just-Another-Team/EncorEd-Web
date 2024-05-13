import { 
    Box,
    Button,
    Typography
} from "@mui/material"
import { useModal } from "../../hooks/useModal";
import useLoading from "../../hooks/useLoading";
import DepartmentList from "./DepartmentList";
import DepartmentForm from "./DepartmentForm";
import IDepartment from "../../data/IDepartment";
import useDepartment from "../../hooks/useDepartment";
import IFloor from "../../data/IFloor";

const Department = () => {
    const { addDepartment } = useDepartment()
    const { openModal, handleCloseModal, handleOpenModal } = useModal();
    const { loading, closeLoading, openLoading } = useLoading()

    const handleAddDepartment = async (data: IDepartment) => {
        openLoading()

        const floorAssigned = data.DEPT_FLOORSASSIGNED!.map((floor) => (floor as IFloor).FLR_ID as string)

        const newDepartment: IDepartment = {
            ...data,
            DEPT_FLOORSASSIGNED: floorAssigned,
        }

        console.log(newDepartment)

        // await addDepartment(data)
        //     .then((result) => {
        //         console.log(result.data)
        //     })
        //     .catch((error) => {
        //         console.error(error)
        //     })

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
        </Box>
    )
}

export default Department