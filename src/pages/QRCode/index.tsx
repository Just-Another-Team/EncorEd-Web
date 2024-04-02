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
import { QRCodeType } from "../../types/QRCodeType";
import { useMemo, useState } from "react";
import AddQRCodeForm from "./AddQRCodeForm";
import { useSubject } from "../../hooks/useSubject";
import LoadingDialog from "../../components/DialogLoading";
import IRoom from "../../types/IRoom";


const QRCodes = () => {
    const [ open, setOpen ] = useState<boolean>(false);

    const { 
        rooms
    } = useRooms();
    const {
        subjects,
        load:subjectLoad,
        setLoad:setSubjectLoad,
        assignSubjectToRoom,
    } = useSubject();

    const handleSubmit = async (data: QRCodeType) => {
        setOpen(false);

        setSubjectLoad(true)
        
        await assignSubjectToRoom(data)
    }

    const roomSubjects = rooms?.filter(room => subjects.some(subject => subject.ROOM_ID !== null ? (subject.ROOM_ID as IRoom).ROOM_ID === room.ROOM_ID : false))

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
                onClick={() => setOpen(true)}
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
                {roomSubjects?.map(room => (
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

            <AddQRCodeForm
            open={open}
            onCancel={() => setOpen(false)}
            onSubmit={handleSubmit}/>

            <LoadingDialog
            open={subjectLoad}
            text={"Assigning subject to room..."}/>
        </Box>
    )
}

export default QRCodes