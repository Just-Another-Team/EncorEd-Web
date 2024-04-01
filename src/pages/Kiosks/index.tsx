import { 
    Box,
    Typography,
    Button
} from "@mui/material"
import { useModal } from "../../hooks/useModal"

const Kiosks = () => {
    const { handleOpenModal } = useModal();

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

        </Box>
    )
}

export default Kiosks