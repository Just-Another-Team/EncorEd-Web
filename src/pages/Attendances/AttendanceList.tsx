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
import { useEffect } from "react"
import { AttendanceSubmissionDate } from "../../data/AttendanceSubmissionDate"

const AttendanceList = () => {
    const { load, setLoad, attendances, getAttendancesByReduction } = useAttendances();

    useEffect(() => {
        console.log("Activated")
        setLoad(true)
    }, [])

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
                //console.log(params.row.USER_ID)

                return (params.row.USER_ID as IUser).USER_FULLNAME
            },
            minWidth: 160,
            flex: 0.5
        },
        {
            field: "ATTD_TEACHERSTATUS",
            headerName: "Status",
            renderCell: (params) => {
                return (
                    <Typography
                    variant="body1"
                    fontWeight={700}
                    color={Color('darkBlue', 400) as string}>
                        {`${params.row.ATTD_TEACHERSTATUS?.charAt(0).toUpperCase()}${params.row.ATTD_TEACHERSTATUS?.slice(1)}`}
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
                return dayjs((params.row.ATTD_SUBMISSIONDATE as AttendanceSubmissionDate).lastSubmission).format("hh:mm A - DD/MM/YYYY")
            },
            minWidth: 224,
        },
    ]

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
            }
        }}
        columns={AttendanceHeaders}
        getRowId={(row) => row.ATTD_ID!}
        loading={getAttendancesByReduction().length === 0}
        rows={getAttendancesByReduction()}/>
    )
}

export default AttendanceList