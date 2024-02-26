import { 
    Box,
    Button,
    Paper,
    Stack,
    Typography
} from "@mui/material"
import { useParams } from "react-router-dom"
import { RoomParams } from "../../types/Params";
import { Rooms } from "../../data/roomData";
import QRCode from "react-qr-code";
import { Subjects } from "../../data/subjectData";
import RoomSubjectList from "./ListRoomSubject";
import TestQR from "./QRCodeToImage";

const SelectedRoom = () => {
    const { roomId } = useParams<RoomParams>();

    const room = Rooms.find(room => room.roomId === roomId)
    const subjects = Subjects.filter(subject => subject.roomId === roomId)

    return(
        <Box
        display="flex"
        gap={2}
        alignItems={"start"}>
            <Box
            flex={1}>
                <Box
                marginBottom={3}>
                    <Typography
                    variant="h3"
                    fontWeight={700}>
                        {room?.roomName}
                    </Typography>

                    <Typography
                    variant="h6">
                        Floor Location: <span style={{ fontWeight: 700 }}>{room?.floor}</span>
                    </Typography>
                </Box>

                {/* <Box
                height={512}>
                    <RoomSubjectList
                    subjects={subjects}/>
                </Box> */}
            </Box>

            {/* Maybe separate with another component? */}
            <Paper
            variant="outlined"
            elevation={0}
            sx={{
                padding: 2,
            }}>
                <Stack
                flexDirection={"row"}>
                    
                    <Box
                    display="flex"
                    flexDirection="column"
                    gap={2}>
                        <Typography
                        fontWeight={700}>
                            Room QR Code
                        </Typography>

                        {/* <QRCode
                        size={256}
                        value={JSON.stringify(room)}/> */}
                        <TestQR />

                        <Button
                        variant="contained">
                            Print QR Code
                        </Button>
                    </Box>
                </Stack>
            </Paper>
        </Box>
    )
}

export default SelectedRoom