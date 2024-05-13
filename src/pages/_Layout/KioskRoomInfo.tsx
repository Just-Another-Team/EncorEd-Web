import { Box, Button, Typography } from "@mui/material"
import Color from "../../assets/Color"
import { useMapboxNavigation } from "../../hooks/useMapboxNavigation"
import { useRooms } from "../../hooks/useRooms"

const KioskRoomInfo = () => {
    const { selectedRoom, selectedFloor } = useMapboxNavigation()

    return (
        <Box
        display={ selectedRoom ? 'flex' : 'none'}
        position={'fixed'}
        zIndex={2}
        bottom={0}
        padding={1}
        justifyContent={'center'}
        width={'100%'}>
            <Box
            display={'flex'}
            width={1/2}
            padding={1}
            bgcolor={Color('primaryBlue', 100)}
            boxShadow={1}
            borderRadius={1}>
                <Box
                flex={1}>
                    <Typography variant="h5">{selectedRoom?.ROOM_NAME}</Typography>
                    <Typography variant="h6">{selectedFloor?.FLR_NAME}</Typography>
                </Box>
                <Box
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'center'}>
                    <Button>Navigate</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default KioskRoomInfo