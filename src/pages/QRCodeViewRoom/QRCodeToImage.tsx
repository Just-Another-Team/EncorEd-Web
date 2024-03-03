import { Box, Typography } from "@mui/material"
import { LegacyRef, useEffect, useRef } from "react"
import QRCode from "react-qr-code"
import { FixMeLater } from "../../types/FixMeLater"
import { RoomType } from "../../data/roomData"

type QRImageType = {
    QRSize?: number;
    setImgSrc: React.Dispatch<React.SetStateAction<string | null>>;
    room: RoomType;
}

const QRImage = ({
    QRSize = 256,
    setImgSrc,
    room
}: QRImageType) => {
    const divRef = useRef<ReactDOM.Container>();

    useEffect(() => {
        const divCurrent = divRef.current;
        const svgQuery = divCurrent?.querySelector("svg")

        const serializer = new XMLSerializer();
        const svgStr = serializer.serializeToString(svgQuery as Node);

        setImgSrc(`data:image/svg+xml;base64,${window.btoa(svgStr)}`)

        // const imgCurrent = image.current;
        // imgCurrent!.src = `data:image/svg+xml;base64,${window.btoa(svgStr)}`; //The string value is the output
    }, [])

    return(
        <Box ref={divRef}>
            <QRCode
            size={QRSize}
            value={JSON.stringify(room)}/>
        </Box>
    )
}


export default QRImage;