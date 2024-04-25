import { Button, Typography } from "@mui/material"
import {
    DataGrid,
    GridColDef
} from "@mui/x-data-grid"
import { useAttendances } from "../../hooks/useAttendances"
import IAttendance from "../../data/IAttendance"
import dayjs from "dayjs"
import IUser from "../../data/IUser"
import ISubject from "../../data/ISubject"
import Color from "../../assets/Color"
import { AttendanceSubmissionDate } from "../../data/AttendanceSubmissionDate"
import { useUsers } from "../../hooks/useUsers"
import { useSubject } from "../../hooks/useSubject"

const AttendanceList = () => {
    const { load, attendances, getAttendances, getAttendancesByReduction } = useAttendances();

    const AttendanceHeaders: Array<GridColDef<IAttendance>> = [
        {
            field: "ATTD_ID",
            headerName: "ID",
        },
        {
            field: "SUB_CODE",
            headerName: "EDP Code",
            renderCell: (params) => {
                return (params.row.SUB_ID as ISubject).SUB_CODE
            },
            minWidth: 96,
        },
        {
            field: "SUB_DESCRIPTION",
            headerName: "Subject Description",
            renderCell: (params) => {
                return (params.row.SUB_ID as ISubject).SUB_DESCRIPTION
            },
            minWidth: 192,
            flex: 1
        },
        {
            field: "SUB_ID.USER_ID",
            headerName: "Instructor assigned",
            renderCell: (params) => {
                // ((params.row.SUB_ID as ISubject).USER_ID as IUser).USER_FULLNAME

                return ((params.row.SUB_ID as ISubject).USER_ID as IUser).USER_FULLNAME
            },
            minWidth: 256,
            flex: 0.5
        },
        {
            field: "USER_ID",
            headerName: "Submitted By",
            renderCell: (params) => {
                return (params.row.USER_ID as IUser).USER_FULLNAME
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
                    status === "present" || status === "missing" ? 
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

    const reducedAttendances = getAttendancesByReduction(getAttendances()).map((attendance) => {
        return ({
            ...attendance as IAttendance,
            ATTD_SUBMISSIONDATE: typeof attendance.ATTD_SUBMISSIONDATE === "string" ? attendance.ATTD_SUBMISSIONDATE : (attendance.ATTD_SUBMISSIONDATE as AttendanceSubmissionDate).lastSubmission,
        })
    })

    // const reducedAttendances = getAttendances().map((attendance) => {
    //     return ({
    //         ...attendance as IAttendance,
    //         ATTD_SUBMISSIONDATE: typeof attendance.ATTD_SUBMISSIONDATE === "string" ? attendance.ATTD_SUBMISSIONDATE : (attendance.ATTD_SUBMISSIONDATE as AttendanceSubmissionDate).lastSubmission,
    //     })
    // })

    return (
        <DataGrid
        initialState={{
            columns: {
                columnVisibilityModel: {
                    ATTD_ID: false,
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
        columns={AttendanceHeaders}
        getRowId={(row) => row.ATTD_ID!}
        loading={load}
        rows={reducedAttendances}/>
    )
}

export default AttendanceList