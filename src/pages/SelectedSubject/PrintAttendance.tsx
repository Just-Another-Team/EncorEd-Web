import { Box, Typography } from "@mui/material"
import { useRef, useEffect, forwardRef, MutableRefObject } from "react";
import ReactToPrint from "react-to-print";
import AttendanceList from "./AttendanceList";
import IAttendance from "../../data/IAttendance";

type PrintAttendanceType = {
    attendances: Array<IAttendance>
    subjectId: string
    onTrigger?: () => void
}

const PrintAttendance = forwardRef<HTMLDivElement, PrintAttendanceType>((props, ref) => {
    const { onTrigger, subjectId, attendances } = props

    useEffect(() => {
        const currentRef = (ref as MutableRefObject<HTMLDivElement>).current

        console.log(currentRef)
    }, [])

    return (
        <Box display={'none'}>
            <Box
            ref={ref}>
                <AttendanceList
                attendances={attendances}/>
            </Box>
        </Box>
    )
})

export default PrintAttendance