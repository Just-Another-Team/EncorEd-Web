import React, { MouseEventHandler, useState } from "react"
import {
    Box,
    Button,
    Grid,
    PaginationItem,
    Typography
} from '@mui/material'
import CampusMap from "../../../components/Map/Map";
import MapComponent from "../../../components/Map/MapComponent";

type FloorType = {
    selected: boolean;
    value: string
}

const MapList = () => {
    const [selectedFloor, setSelectedFloor] = useState<string>("G")

    const floors:Array<string> = [
        "2",
        "M",
        "G",
        "B"
    ]

    const handleFloorChange = (floor: string) => {
        setSelectedFloor(floor);
    }

    return(
        <Box position={"relative"} sx={{width: '100%', height: 620}}>
            {/* <CampusMap selectedFloor={selectedFloor} /> */}
            <MapComponent selectedFloor={selectedFloor} />
            <Box
            display={'flex'}
            gap={1}
            flexDirection={"column"}
            position={'absolute'}
            bottom={40}
            right={16}>
                {floors.map((floor, ind) => (
                    <PaginationItem key={ind} color="primary" onClick={() => {handleFloorChange(floor)}} selected={floor === selectedFloor} page={floor}/>
                ))}
            </Box>
        </Box>
    )
}

export default MapList