import { Box, Typography } from "@mui/material"
import { useEffect, useRef } from "react"
import QRCode from "react-qr-code"
import { FixMeLater } from "../../types/FixMeLater"

const room = {
    roomId: "1_room101",
    roomName: "Room 101",
    floor: "1st"
}

const TestQR = () => {

    const divRef = useRef<ReactDOM.Container>();
    const image = useRef<FixMeLater>();

    useEffect(() => {
        const divCurrent = divRef.current;
        const svgQuery = divCurrent?.querySelector("svg")

        const serializer = new XMLSerializer();
        const svgStr = serializer.serializeToString(svgQuery as Node);

        const imgCurrent = image.current;
        imgCurrent.src = `data:image/svg+xml;base64,${window.btoa(svgStr)}`//'data:image/svg+xml;base64,'+ window.btoa(svgStr);
        svgQuery?.parentNode?.removeChild(svgQuery)
    }, [])

    return( 
        <Box>
            <Box ref={divRef}>
                <QRCode
                size={256}
                value={JSON.stringify(room)}/>
            </Box>
            <Box>
                <Typography>Image</Typography>
                <img />
            </Box>
        </Box>
    )
}

const TestQRCodeImage = () => {

    

    const serialized = new XMLSerializer();
    //const svgStr = serialized.serializeToString(TestQR);

    return (
        <img />
    )
}

export default TestQR;