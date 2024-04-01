import { 
    Box,
    Button,
    Typography
} from "@mui/material"
import SubjectList from "./SubjectList"
import AddDialog from "./AddDialog"
import { useModal } from "../../hooks/useModal"

const Subjects = () => {
    const { openModal, handleOpenModal, handleCloseModal } = useModal();

    return (
        <Box>
            <Box
            display={"flex"}
            flexDirection={"row"}
            marginBottom={2}>
                <Typography
                variant="h4"
                flex={1}
                fontWeight={700}>
                    Subjects
                </Typography>

                <Button
                onClick={handleOpenModal}
                size="large"
                variant="contained">
                    Add Subject
                </Button>
            </Box>

            <Box
            width={'100%'}
            height={580}>
                <SubjectList />
            </Box>

            <AddDialog
            addModal={openModal}
            closeAddModal={handleCloseModal}/>
        </Box>
    )
}

export default Subjects