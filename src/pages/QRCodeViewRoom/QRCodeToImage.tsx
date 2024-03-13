import { Box, Typography } from "@mui/material"
import { LegacyRef, useEffect, useRef } from "react"
import QRCode from "react-qr-code"
import { FixMeLater } from "../../types/FixMeLater"
import IRoom from "../../types/IRoom"

type QRImageType = {
    QRSize?: number;
    setImgSrc: React.Dispatch<React.SetStateAction<string | null>>;
    room: IRoom | undefined;
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
    }, [])

    return(
        <Box ref={divRef}>
            <QRCode
            size={QRSize}
            value={`encored://app/attendance/${room?.ROOM_ID}`}/>
        </Box>
    )
}


export default QRImage;