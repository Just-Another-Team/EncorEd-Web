import { Box, Link, Typography } from "@mui/material"
import Color from "../../assets/Color"
import IRoom from "../../data/IRoom"
import { useMapboxNavigation } from "../../hooks/useMapboxNavigation"
import { useState } from "react"

type KioskFloorDirectoryType = {
    rooms: Array<IRoom>
}

const KioskFloorDirectory = (props: KioskFloorDirectoryType) => {
    const { rooms } = props

    const { selectedRoom, setRoom, addSearchLog } = useMapboxNavigation()

    const [hoveredRoom, setHoveredRoom] = useState<IRoom>();

    const handleRoomClick = (room: IRoom) => {
        addSearchLog(room)
        setRoom(room)
    }

    const handleRoomHover = (room: IRoom) => {
        setHoveredRoom(room)
    }

    const handleMouseLeave = () => {
        setHoveredRoom(undefined)
    }

    return (
        <Box
        height={480}
        overflow={'auto'}>
            {rooms.map(room => (
                <Typography
                marginBottom={1}
                key={room.ROOM_ID}>
                    <Link
                    component={'button'}
                    underline="none"
                    textAlign={'left'}
                    fontWeight={selectedRoom?.ROOM_ID === room.ROOM_ID || hoveredRoom?.ROOM_ID === room.ROOM_ID ? 700 : 400}
                    color={selectedRoom?.ROOM_ID === room.ROOM_ID ? Color('gold', 400) :  Color('black', 100)}
                    onClick={() => handleRoomClick(room)}
                    onMouseEnter={() => handleRoomHover(room)}
                    onMouseLeave={() => handleMouseLeave()}>
                        {room.ROOM_NAME}
                    </Link>
                </Typography>
            ))}
        </Box>
    )
}

export default KioskFloorDirectory