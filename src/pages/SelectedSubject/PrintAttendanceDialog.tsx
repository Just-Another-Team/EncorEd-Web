import { Button, Typography } from "@mui/material"
import DialogMessage from "../../components/DialogMessage"
import { Dayjs } from "dayjs";
import Color from "../../assets/Color";
import { FixMeLater } from "../../types/FixMeLater";
import ReactToPrint from "react-to-print";
import { forwardRef, MutableRefObject } from "react";
import pageStyle from '!!css-loader?{"sourceMap":false,"exportType":"string"}!../../assets/AttendancePageStyle.css'

type PrintAttendanceDialogType = {
    open: boolean;
    onClose: () => void
    date?: { startValue: Dayjs | null; endValue: Dayjs | null } 
}

const PrintAttendanceDialog = forwardRef<HTMLDivElement, PrintAttendanceDialogType>((props: PrintAttendanceDialogType, ref) => {
    const { open, onClose, date } = props

    return (
        <DialogMessage
        open={open}
        PaperProps={{
            component: 'form',
            onSubmit: (e: FixMeLater) => {
                e.preventDefault()
                onClose()
            },
            onReset: () => {
                onClose()
            },
        }}
        maxWidth="md"
        title="Are you sure you want to print attendance?">
            <DialogMessage.Body>
                <Typography variant="body1">
                    The attendance data will be printed according to the following date/date range:
                </Typography>
                <Typography
                variant="h5"
                color={Color('darkBlue', 400)}
                marginBottom={2}>
                    {date?.endValue === null ? date?.startValue?.format("MMMM DD, YYYY") : date?.startValue === null ? date?.endValue?.format("MMMM DD, YYYY") :`${date?.startValue?.format("MMMM DD, YYYY")} - ${date?.endValue?.format("MMMM DD, YYYY")}`}
                </Typography>
                <Typography variant="body1">
                    Are you sure you want to continue of the printing process?
                </Typography>
            </DialogMessage.Body>
            <DialogMessage.Footer>
                <Button
                color="error"
                type="reset">
                    NO
                </Button>
                <ReactToPrint
                content={() => (ref as MutableRefObject<HTMLDivElement>).current}
                pageStyle={pageStyle}
                trigger={() => (
                    <Button
                    type="submit">
                        YES
                    </Button>
                )}/>
            </DialogMessage.Footer>
        </DialogMessage>
    )
})

export default PrintAttendanceDialog