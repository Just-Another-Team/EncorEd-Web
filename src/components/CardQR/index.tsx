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
import { useNavigate } from "react-router-dom"
import IRoom from "../../types/IRoom"

type CardQRType = {
    room: IRoom,
    qrValue: string,
}

const CardQR = ({
    room,
    qrValue
}: CardQRType) => {

    const navigate = useNavigate();

    const handleCardClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        navigate(`/dashboard/rooms/${room.ROOM_ID}`)
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
                            {room.ROOM_NAME}
                        </Typography>
                        <Typography
                        variant="h6"
                        textAlign="left">
                            Floor: {room.FLR_ID.FLR_NAME}
                        </Typography>
                    </Box>

                    <QRCode
                    size={96}
                    value={qrValue}/>
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