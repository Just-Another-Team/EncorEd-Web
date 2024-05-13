import { 
    Box,
    Button,
    Paper,
    Stack,
    Grid,
    Typography
} from "@mui/material"
import { useParams } from "react-router-dom"
import { RoomParams } from "../../types/Params";
import RoomSubjectList from "./ListRoomSubject";
import QRImage from "./QRCodeToImage";
import { useRef, useState } from "react";
import { useRooms } from "../../hooks/useRooms";
import { useSubject } from "../../hooks/useSubject";
import ReactToPrint from "react-to-print";
import pageStyle from '!!css-loader?{"sourceMap":false,"exportType":"string"}!../../assets/pageStyle.css'
import IFloor from "../../data/IFloor";

const SelectedRoom = () => {
    const { getRooms } = useRooms();
    const { getSubjectsByRoom } = useSubject();
    const { roomId } = useParams<RoomParams>();

    const divRef = useRef<HTMLDivElement>(null);

    const [imgSrc, setImgSrc] = useState<string | null>(null);

    const handleQRPrint = () => {
        return;
    }

    const room = getRooms().find(room => room.ROOM_ID === roomId)
    const subjects = getSubjectsByRoom(roomId as string)

    return(
        <Grid
        container
        spacing={2}
        sx={{
            paddingBottom: 2,
            marginBottom: 2,
        }}>
            <Grid
            item
            xs={9}>
                <Box
                flex={1}>
                    <Box
                    marginBottom={3}>
                        <Typography
                        variant="h3"
                        fontWeight={700}>
                            {room?.ROOM_NAME}
                        </Typography>

                        <Typography
                        variant="h6">
                            Floor Location: <span style={{ fontWeight: 700 }}>{(room?.FLR_ID as IFloor).FLR_NAME}</span>
                        </Typography>
                    </Box>

                    <Box
                    height={512}>
                        <RoomSubjectList
                        subjects={subjects}/>
                    </Box>
                </Box>
            </Grid>

            <Grid
            item
            >
                <Paper
                variant="outlined"
                elevation={0}
                sx={{
                    padding: 2,
                }}>
                    <Stack gap={2}>
                        <Typography
                        variant="h6"
                        fontWeight={700}>
                            Room QR Code
                        </Typography>

                        <Box
                        display="flex"
                        justifyContent="center"
                        alignContent="center">
                            <QRImage
                            display='block'
                            QRSize={256}
                            setImgSrc={setImgSrc}
                            ref={divRef}
                            room={room}/>
                        </Box>
                        
                        <QRImage
                        displayTitle
                        displayLogo
                        display='none'
                        QRSize={512}
                        setImgSrc={setImgSrc}
                        ref={divRef}
                        room={room}/>

                        <ReactToPrint
                        content={() => divRef.current}
                        pageStyle={pageStyle}
                        trigger={() => (
                            <Button
                            onClick={handleQRPrint}
                            variant="contained">
                                Print QR Code
                            </Button>
                        )}/>
                    </Stack>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default SelectedRoom