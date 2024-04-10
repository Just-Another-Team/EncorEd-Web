import { Box, Typography } from "@mui/material"
import { forwardRef, MutableRefObject, Ref, RefObject, useEffect, useRef } from "react"
import QRCode from "react-qr-code"
import { FixMeLater } from "../../types/FixMeLater"
import IRoom from "../../data/IRoom"

type QRImageType = {
    QRSize?: number;
    setImgSrc: React.Dispatch<React.SetStateAction<string | null>>;
    room: IRoom | undefined;
    display: 'none' | 'block';
    displayTitle?: boolean;
    displayLogo?: boolean;
}

const QRImage = forwardRef<HTMLDivElement, QRImageType>(({
    QRSize = 256,
    setImgSrc,
    room,
    display,
    displayLogo,
    displayTitle,
}: QRImageType, ref) => {
    //const divRef = useRef<ReactDOM.Container>();

    useEffect(() => {
        const divCurrent = (ref as MutableRefObject<HTMLDivElement>).current;
        const svgQuery = divCurrent?.querySelector("svg")

        const serializer = new XMLSerializer();
        const svgStr = serializer.serializeToString(svgQuery as Node);

        setImgSrc(`data:image/svg+xml;base64,${window.btoa(svgStr)}`)
    }, [])

    return(
        <Box display={display}>
            <Box ref={ref}> 
                <Typography
                display={displayTitle ? 'block' : 'none'}
                variant="h4"
                marginBottom={12}
                fontWeight={700}>
                    {room?.ROOM_NAME}
                </Typography>

                <QRCode
                size={QRSize}
                value={`encored://app/attendance/${room?.ROOM_ID}`}/>

                <Box
                marginTop={12}
                display={displayLogo ? "flex" : "none"}
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                alignContent="center"
                gap={2}>
                    <img width={64} src="/assets/Logo.png"/>
                    <Typography
                    variant="h5"
                    fontWeight={700}
                    noWrap>
                        Encor<span>Ed</span>
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
})


export default QRImage;