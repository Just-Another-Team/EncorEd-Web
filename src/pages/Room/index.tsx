import { Box, Button, Typography } from "@mui/material"
import { useModal } from "../../hooks/useModal"
import RoomList from "./RoomList"
import { useRooms } from "../../hooks/useRooms"
import RoomForm from "./RoomForm"
import IRoom from "../../data/IRoom"
import dayjs from "dayjs"
import ISchedule from "../../data/ISchedule"
import useLoading from "../../hooks/useLoading"

const Room = () => {
    const { getRooms, addRoom, rooms } = useRooms()
    const { openModal, handleOpenModal, handleCloseModal } = useModal()

    const { loading, openLoading, closeLoading } = useLoading()

    const handleDownloadJSON = () => {
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(rooms, null, 2)
        )}`;

        const link = document.createElement("a")
        link.href = jsonString
        link.download = "Rooms.json"

        link.click()
    }

    const onAddRoom = async (input: IRoom) => {
        const room: IRoom = {
            ...input,
            SCHED_ID: input.SCHED_ID ? {
                SCHED_STARTTIME: dayjs((input.SCHED_ID as ISchedule).SCHED_STARTTIME).toISOString(),
                SCHED_ENDTIME: dayjs((input.SCHED_ID as ISchedule).SCHED_ENDTIME).toISOString()
            } as ISchedule : null
        }

        openLoading()

        await addRoom(room)
            .then((result) => {
                console.log(result.data)
            })
            .catch((error) => {
                console.error(error)
            })

        closeLoading()
        handleCloseModal()
    }

    return (
        <Box>
            <Box
            display={"flex"}
            flexDirection={"row"}
            gap={1}
            marginBottom={2}>
                <Typography
                variant="h4"
                flex={1}
                fontWeight={700}>
                    Rooms
                </Typography>

                <Button
                onClick={handleOpenModal}
                size="large"
                variant="contained">
                    Add Room
                </Button>
                <Button
                onClick={handleDownloadJSON}
                size="large"
                variant="outlined">
                    EXPORT JSON
                </Button>
            </Box>

            <Box
            width={'100%'}
            height={580}>
                <RoomList />
            </Box>

            <RoomForm
            onSubmit={onAddRoom}
            openModal={openModal}
            closeModal={handleCloseModal}/>
        </Box>
    )
}

export default Room