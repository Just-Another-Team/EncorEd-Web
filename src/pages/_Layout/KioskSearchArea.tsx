import { Box, Chip, IconButton, Typography } from "@mui/material"
import Color from "../../assets/Color"
import MapAutocomplete from "../Map/MapAutocomplete"
import { useRooms } from "../../hooks/useRooms"
import KioskFloorDirectory from "./KioskFloorDirectory"
import IRoom from "../../data/IRoom"
import { useMapboxNavigation } from "../../hooks/useMapboxNavigation"
import { MoreVertOutlined } from "@mui/icons-material"
import MapLogout from "../../components/MapLogout"
import { useUsers } from "../../hooks/useUsers"
import { useModal } from "../../hooks/useModal"
import IFloor from "../../data/IFloor"
import { availableFloors } from "../../data/availableFloors"

const KioskSearchArea = () => {
    const { getRooms } = useRooms()
    const { getCurrentUser } = useUsers()
    const { setRoomAndFloor, getRoomsByFloor, addSearchLog } = useMapboxNavigation()

    const { openModal, handleOpenModal, handleCloseModal } = useModal()

    const handleClickChips = (room: IRoom) => {
        addSearchLog(room)
        setRoomAndFloor(room)
    }

    const rooms = getRooms().filter(room => availableFloors.includes((room.FLR_ID as IFloor).FLR_LEVEL))

    return (
        <Box
        position={'fixed'}
        zIndex={1}
        padding={1}
        width={360}>
            <Box
            padding={2}
            bgcolor={Color('white', 400)}
            boxShadow={1}
            borderRadius={2}>
                <Box
                display={'flex'}
                gap={1}>
                    <MapAutocomplete />
                    <IconButton
                    onClick={() => handleOpenModal()}>
                        <MoreVertOutlined />
                    </IconButton>
                </Box>
                {/* <Box
                display={'flex'}
                gap={1}
                marginTop={1}
                overflow={'auto'}>
                    {getRooms().slice(0, 3).map(room => (
                        <Chip
                        key={room.ROOM_ID}
                        label={room.ROOM_NAME}
                        onClick={() => handleClickChips(room)}/>
                    ))}
                </Box> */}
            </Box>

            <Box
            marginTop={4}>
                <Typography
                variant="h5"
                marginBottom={1}>
                    Floor Directory
                </Typography>

                <KioskFloorDirectory
                rooms={getRoomsByFloor()}/>
            </Box>

            <MapLogout
            openModal={openModal}
            kioskName={getCurrentUser()?.USER_USERNAME as string}
            closeLogOutModal={() => handleCloseModal()}/>
        </Box>
    )
}

export default KioskSearchArea