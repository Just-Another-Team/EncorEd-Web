import {
    Box,
    Button,
    Grid,
    Paper,
    Stack,
    Typography
} from "@mui/material"
import CardQR from "../../components/CardQR"
import { useRooms } from "../../hooks/useRooms"

const QRCodes = () => {

    const { rooms } = useRooms();

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
                {rooms.map(room => (
                    <Grid
                    key={room?.ROOM_ID}
                    item
                    xs={12}
                    sm={6}
                    lg={4}>
                        <CardQR
                        key={room?.ROOM_ID}
                        room={room}
                        qrValue={`encored://app/attendance/${room?.ROOM_ID}`}/>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default QRCodes