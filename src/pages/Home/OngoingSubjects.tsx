import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { useSubject } from "../../hooks/useSubject"
import ISubject from "../../data/ISubject"
import dayjs from "dayjs"
import IUser from "../../data/IUser"
import ISchedule from "../../data/ISchedule"
import { Box } from "@mui/material"
import useClock from "../../hooks/useClock"

const OngoingSubjects = () => {
    const { getOngoingSubjects } = useSubject()

    const SubjectHeaders: Array<GridColDef<ISubject>> = [
        {
            field: "SUB_ID",
            headerName: "ID",
        },
        {
            field: "SUB_CODE",
            headerName: "EDP Code",
            renderCell: (params) => {
                return params.row.SUB_CODE
            },
            minWidth: 96,
        },
        {
            field: "SUB_DESCRIPTION",
            headerName: "Subject Description",
            renderCell: (params) => {
                return params.row.SUB_DESCRIPTION
            },
            minWidth: 360,
        },
        {
            field: "USER_ID.USER_FULLNAME",
            headerName: "Instructor",
            renderCell: (params) => {
                return (params.row.USER_ID as IUser).USER_FULLNAME
            },
            sortable: false,
            minWidth: 256,
        },
        {
            field: "SCHED_ID.SCHED_RANGE",
            headerName: "Schedule",
            renderCell: (params) => {
                return `${dayjs((params.row.SCHED_ID as ISchedule).SCHED_STARTTIME).format("hh:mm A")} - ${dayjs((params.row.SCHED_ID as ISchedule).SCHED_ENDTIME).format("hh:mm A")}`
    
            },
            sortable: false,
            minWidth: 192,
        },
    ]

    //Teacher
    //Subject
    //Room
    //Schedule
    return (
        <Box
        height={372}>
            <DataGrid
            getRowId={(row) => row.SUB_ID!}
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 5
                    }
                },
                columns: {
                    columnVisibilityModel: {
                        SUB_ID: false,
                    }
                },
            }}
            columns={SubjectHeaders}
            rows={getOngoingSubjects(dayjs().toISOString())}/>
        </Box>
    )
}

export default OngoingSubjects