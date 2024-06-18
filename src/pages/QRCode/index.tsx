import {
    Box,
    Button,
    Grid,
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
import { useModal } from "../../hooks/useModal";
import SnackBar from "../../components/Snackbar/SnackBar";
import QRCodeDataGrid from "./QRCodeDataGrid";


const QRCodes = () => {
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

    const { 
        openModal: successSnackbar,
        handleOpenModal: openSuccessSnackbar,
        handleCloseModal: closeSuccessSnackbar
    } = useModal();

    const { 
        openModal: errorSnackbar,
        handleOpenModal: openErrorSnackbar,
        handleCloseModal: closeErrorSnackbar
    } = useModal();

    const [ open, setOpen ] = useState<boolean>(false);
    const [ message, setMessage ] = useState<string>();

    const role = getCurrentUser()?.ROLE_ID as UserRole
    const noRoomSubjects = getSubjects().filter(subject => subject.ROOM_ID === null)

    // If subjects contains a room
    const roomSubjects = getRooms().filter(room => getSubjects().some(subject => subject.ROOM_ID !== null ? subject.ROOM_ID === room.ROOM_ID : false))
    const filteredRoomSubjects = roomSubjects.filter(room => (getDepartment(getCurrentUser()?.DEPT_ID as string)?.DEPT_FLOORSASSIGNED as Array<string>).includes((room.FLR_ID as IFloor).FLR_ID as string))

    const handleSubmit = async (data: QRCodeType) => {
        setOpen(false);

        setSubjectLoad(true)

        await assignSubjectToRoom(data)
                .then((result) => {
                    //Snack bar
                    setMessage(result.data)
                    openSuccessSnackbar()
                })
                .catch((error) => {
                    console.error(error)
                    setMessage(error.data)
                    openErrorSnackbar()
                })

        setSubjectLoad(false)
    }

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
                onClick={() => {
                    if (noRoomSubjects.length === 0) {
                        setMessage("All subjects are assigned to a room")
                        openErrorSnackbar()
                        return
                    }

                    setOpen(true)
                }}
                size="large"
                variant="contained">
                    ASSIGN SUBJECT
                </Button>
            </Box>

            {/* Card Grid Component <- Customizable */}
            {/* Card Grid Card Component <- Customizable */}
            {/* <Grid
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
                
            </Grid> */}
            <Box
            width={'100%'}
            height={580}>
                <QRCodeDataGrid rooms={role.admin ? roomSubjects : filteredRoomSubjects}/>
            </Box>
            
            <SnackBar
            message={message}
            onClose={closeSuccessSnackbar}
            open={successSnackbar}
            severity="success"/>

            <SnackBar
            message={message}
            onClose={closeErrorSnackbar}
            open={errorSnackbar}
            severity="error"/>

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