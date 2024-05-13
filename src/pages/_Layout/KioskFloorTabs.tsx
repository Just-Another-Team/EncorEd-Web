import { Box, PaginationItem } from "@mui/material"
import { useMapboxNavigation } from "../../hooks/useMapboxNavigation"
import { useRooms } from "../../hooks/useRooms"
import IFloor from "../../data/IFloor"

const KioskFloorTabs = () => {
    const { getFloorSortedByLevel } = useRooms()
    const { selectedFloor, setFloor, setRoom } = useMapboxNavigation()

    const handleOnClick = (floor: IFloor) => {
        setFloor(floor)
        setRoom(undefined)
    }

    return (
        <Box
        display={'flex'}
        flexDirection={'column'}
        position={'fixed'}
        zIndex={3}
        padding={1}
        gap={1}
        bottom={0}
        right={0}>
            { getFloorSortedByLevel().map(floor => (
                <PaginationItem
                key={floor.FLR_ID}
                onClick={() => handleOnClick(floor)}
                selected={selectedFloor?.FLR_ID === floor.FLR_ID}
                color="primary"
                page={floor.FLR_NAME.charAt(0)}
                size="large"/>
            )) }
        </Box>
    )
}

export default KioskFloorTabs