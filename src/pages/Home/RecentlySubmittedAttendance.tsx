import { Box, Button, Typography } from "@mui/material"
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

const RecentlySubmittedAttendance = () => {
    const { load, getAttendances, getAttendancesByReduction, getCompleteAttendancesByCreator } = useAttendances();
    const { getCurrentUser } = useUsers()

    const AttendanceHeaders: Array<GridColDef<IAttendance>> = [
        {
            field: "ATTD_ID",
            headerName: "ID",
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

                const instructor = (params.row.SUB_ID as ISubject).USER_ID
                return instructor !== null ? (instructor as IUser).USER_FULLNAME : " No Instructor"
            },
            minWidth: 256,
            flex: 0.2
        },
        {
            field: "USER_ID",
            headerName: "Submitted By",
            renderCell: (params) => {
                console.log(params.row.USER_ID)

                return params.row.USER_ID !== null ? (params.row.USER_ID as IUser).USER_FULLNAME : ""
            },
            minWidth: 256,
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

    const role = getCurrentUser()?.ROLE_ID as UserRole

    const attendances = (role: UserRole) => {
        const filteredAttendance = getAttendances().filter(attendance => {
            const attendanceChecker = attendance.USER_ID as IUser
            return role.admin || role.campusDirector ? true : attendanceChecker.USER_CREATEDBY === getCurrentUser()?.USER_ID
        })

        return getAttendancesByReduction(filteredAttendance).map((attendance) => {
            return ({
                ...attendance as IAttendance,
                ATTD_SUBMISSIONDATE: typeof attendance.ATTD_SUBMISSIONDATE === "string" ? attendance.ATTD_SUBMISSIONDATE : (attendance.ATTD_SUBMISSIONDATE as AttendanceSubmissionDate).lastSubmission,
            })
        }).filter(attendance => dayjs().isSame(attendance.ATTD_SUBMISSIONDATE, "day"))
    }

    return (
        <Box
        height={372}>
            <DataGrid
            initialState={{
                columns: {
                    columnVisibilityModel: {
                        ATTD_ID: false,
                    }
                },
                pagination: {
                    paginationModel: {
                        pageSize: 5,
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
            pageSizeOptions={[5]}
            columns={AttendanceHeaders}
            getRowId={(row) => row.ATTD_ID!}
            loading={load}
            rows={attendances(role)}/>
        </Box>
        
    )
}

export default RecentlySubmittedAttendance