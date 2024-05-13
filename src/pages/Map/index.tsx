import { Box, Typography } from "@mui/material"
import MapComponent from "../../components/Map/MapComponent"
import { useMapboxNavigation } from "../../hooks/useMapboxNavigation"

const Map = () => {
    const { accessToken, selectedFloor } = useMapboxNavigation()

    return (
        <>
            <MapComponent
            accessToken={accessToken!.token}
            selectedFloor={selectedFloor?.FLR_NAME.charAt(0) as string}/>
        </>
    )
}

export default Map