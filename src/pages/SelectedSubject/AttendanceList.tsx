import { Button, Typography } from "@mui/material"
import {
    DataGrid,
    GridColDef
} from "@mui/x-data-grid"
import { useAttendances } from "../../hooks/useAttendances"
import IAttendance from "../../data/IAttendance"
import dayjs from "dayjs"
import IUser, { UserRole } from "../../data/IUser"
import ISubject from "../../data/ISubject"
import Color from "../../assets/Color"
import { AttendanceSubmissionDate } from "../../data/AttendanceSubmissionDate"
import { useUsers } from "../../hooks/useUsers"

type AttendanceSubjectType = {
    attendances: Array<IAttendance>
    tabValue?: string
}

const AttendanceList = (props: AttendanceSubjectType) => {
    const { attendances, tabValue } = props

    const { load, getAttendancesByReduction } = useAttendances();
    const { getCurrentUser } = useUsers()

    console.log("Tab Value: ", tabValue, tabValue === 'all')

    const AttendanceHeaders: Array<GridColDef<IAttendance>> = [
        {
            field: "ATTD_ID",
            headerName: "ID",
        },
        {
            field: "SUB_CODE",
            headerName: "Course Code",
            renderCell: (params) => {
                return (params.row.SUB_ID as ISubject).SUB_CODE
            },
            minWidth: 128,
        },
        {
            field: "SUB_DESCRIPTION",
            headerName: "Subject Description",
            renderCell: (params) => {
                return (params.row.SUB_ID as ISubject).SUB_DESCRIPTION
            },
            minWidth: 192,
            flex: 1,
        },
        {
            field: "USER_ID",
            headerName: "Submitted By",
            renderCell: (params) => {
                return params.row.USER_ID !== null ? (params.row.USER_ID as IUser).USER_FULLNAME : ""
            },
            minWidth: 160,
            flex: 0.5
        },
        {
            field: "ATTD_TEACHERSTATUS",
            headerName: "Status",
            renderCell: (params) => {
                const status = params.row.ATTD_TEACHERSTATUS

                return (
                    status === "present" || status === "not-in-room" ? 
                    <Typography
                    variant="body2"
                    fontWeight={400}
                    color={Color('black', 100) as string}>
                        {`Incomplete (${status})`}
                    </Typography> :
                    <Typography
                    variant="body2"
                    fontWeight={400}
                    color={Color('darkBlue', 400) as string}>
                        {status}
                    </Typography>
                )
            },
            minWidth: 160,
            flex: 0.5
        },
        {
            field: "ATTD_SUBMISSIONDATE",
            headerName: "Submitted On",
            renderCell: (params) => {
                return dayjs(params.row.ATTD_SUBMISSIONDATE as string).format("hh:mm A - DD/MM/YYYY")
            },
            minWidth: 224,
        },
    ]

    const role = getCurrentUser()?.ROLE_ID as UserRole

    // const attendances = (attendanceArray: Array<IAttendance>) => getAttendancesByReduction(attendanceArray).map((attendance) => {
    //     return ({
    //         ...attendance as IAttendance,
    //         ATTD_SUBMISSIONDATE: typeof attendance.ATTD_SUBMISSIONDATE === "string" ? 
    //         attendance.ATTD_SUBMISSIONDATE : 
    //         (attendance.ATTD_SUBMISSIONDATE as AttendanceSubmissionDate).lastSubmission,
    //     })
    // }).filter(attendance => (userId ? ((attendance.SUB_ID as ISubject).USER_ID as IUser).USER_ID === userId : true) && (attendance.SUB_ID as ISubject).SUB_ID === subjectId)

    return (
        <DataGrid
        initialState={{
            columns: {
                columnVisibilityModel: {
                    SUB_CODE: true,
                    SUB_DESCRIPTION: true,
                }
            },
            pagination: {
                paginationModel: {
                    pageSize: 25,
                }
            },
            sorting: {
                sortModel: [
                    {
                        field: 'ATTD_SUBMISSIONDATE',
                        sort: 'desc'
                    }
                ]
            }
        }}
        columnVisibilityModel={{
            SUB_CODE: tabValue === "all",
            SUB_DESCRIPTION: tabValue === "all",
            ATTD_ID: false,
        }}
        columns={AttendanceHeaders}
        getRowId={(row) => row.ATTD_ID!}
        loading={load}
        rows={attendances}/> //attendances(getAttendances())
    )
}

export default AttendanceList