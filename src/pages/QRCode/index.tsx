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
import IFloor from "../../data/IFloor";
import { useUsers } from "../../hooks/useUsers";
import { UserRole } from "../../data/IUser";
import useDepartment from "../../hooks/useDepartment";


const QRCodes = () => {
    const [ open, setOpen ] = useState<boolean>(false);

    const { getRooms } = useRooms();
    const { getCurrentUser } = useUsers()
    const { getDepartment } = useDepartment()
    const {
        subjects,
        getSubjects,
        load:subjectLoad,
        setLoad:setSubjectLoad,
        assignSubjectToRoom,
    } = useSubject();

    const handleSubmit = async (data: QRCodeType) => {
        setOpen(false);

        setSubjectLoad(true)
        
        await assignSubjectToRoom(data)

        setSubjectLoad(false)
    }

    const role = getCurrentUser()?.ROLE_ID as UserRole

    // If subjects contains a room
    const roomSubjects = getRooms().filter(room => getSubjects().some(subject => subject.ROOM_ID !== null ? subject.ROOM_ID === room.ROOM_ID : false))
    //const filteredRoomSubejcts = roomSubjects.filter(room => room.FLR_ID === getDepartment(getCurrentUser()?.DEPT_ID as string)?.DEPT_FLOORSASSIGNED)
    const filteredRoomSubjects = roomSubjects.filter(room => (getDepartment(getCurrentUser()?.DEPT_ID as string)?.DEPT_FLOORSASSIGNED as Array<string>).includes((room.FLR_ID as IFloor).FLR_ID as string))

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
                {role.admin ? roomSubjects?.map(room => (
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
                )) : filteredRoomSubjects?.map(room => (
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

            {/* <LoadingDialog
            open={subjectLoad}
            text={"Assigning subject to room..."}/> */}
        </Box>
    )
}

export default QRCodes