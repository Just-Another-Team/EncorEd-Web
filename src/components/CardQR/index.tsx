import { 
    Box,
    ButtonBase,
    Paper,
    Stack,
    SxProps,
    Theme,
    Typography
} from "@mui/material"
import QRCode from "react-qr-code"
import { RoomType } from "../../data/roomData"
import { useNavigate } from "react-router-dom"

const CardQR = (room: RoomType) => {

    const navigate = useNavigate();

    const handleCardClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        navigate(`/dashboard/rooms/${room.roomId}`)
    }

    return( 
        <ButtonBase
        onClick={handleCardClick}
        sx={buttonBaseStyle}>
            <Paper
            elevation={2}
            sx={paperStyle}>
                <Stack
                alignItems={"center"}
                direction={"row"}>
                    
                    <Box
                    flex={1}>
                        <Typography
                        variant="h5"
                        textAlign="left">
                            {room.roomName}
                        </Typography>
                        <Typography
                        variant="h6"
                        textAlign="left">
                            Floor: {room.floor}
                        </Typography>
                    </Box>

                    <QRCode
                    size={96}
                    value={JSON.stringify(room)}/>
                </Stack>
            </Paper>
        </ButtonBase>
    )
}

const buttonBaseStyle: SxProps<Theme> = {
    width: "100%"
}

const paperStyle: SxProps<Theme> = {
    padding: 2,
    width: '100%'
}

export default CardQR