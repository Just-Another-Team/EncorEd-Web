import {
    Box,
    Button,
    Grid,
    Paper,
    Stack,
    Typography
} from "@mui/material"
import QRCode from "react-qr-code"
import { Rooms } from "../../data/roomData"
import CardQR from "../../components/CardQR"

const QRCodes = () => {

    return(
        <Box>
            <Box
            display={"flex"}
            flexDirection={"row"}
            marginBottom={2}>
                <Typography
                variant="h4"
                flex={1}
                fontWeight={700}>
                    Room QR Codes
                </Typography>

                <Button
                size="large"
                variant="contained">
                    ADD ROOM QR
                </Button>
            </Box>

            {/* Card Grid Component <- Customizable */}
            {/* Card Grid Card Component <- Customizable */}
            <Grid
            spacing={2}
            container>
                {Rooms.map(room => (
                    <Grid
                    key={room.roomId}
                    item
                    xs={12}
                    sm={6}
                    lg={4}>
                        <CardQR
                        key={room.roomId}
                        roomId={room.roomId}
                        roomName={room.roomName}
                        floor={room.floor}/>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default QRCodes