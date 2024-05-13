import { Box, Typography } from "@mui/material"
import useClock from "../../hooks/useClock"

const KioskClock = () => {
    const { ctime } = useClock()

    return (
        <Box
        position={'fixed'}
        zIndex={2}
        padding={1}
        right={0}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'end'}>
            <Typography variant="body1">{ctime?.format("dddd")}</Typography>
            <Typography variant="body2">{ctime?.format("MMMM DD, YYYY")}</Typography>
            <Typography variant="body2">{ctime?.format("hh:mm:ss A")}</Typography>
        </Box>
    )
}

export default KioskClock