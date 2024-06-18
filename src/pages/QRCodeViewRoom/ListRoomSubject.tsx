import { SubjectType } from "../../data/subjectData"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import ISubject from "../../data/ISubject"
import IRoom from "../../data/IRoom"
import dayjs from "dayjs"
import ISchedule from "../../data/ISchedule"
import { Link } from "@mui/material"
import { Link as RouterLink } from 'react-router-dom'
import { useUsers } from "../../hooks/useUsers"
import { UserRole } from "../../data/IUser"

// Datagrid for QRCodeViewRoom

type RoomSubjectListType = {
    subjects: Array<ISubject>
}

const RoomSubjectList = ({ subjects }: RoomSubjectListType) => {
    const { getCurrentUser } = useUsers()

    const role = (getCurrentUser()?.ROLE_ID as UserRole).admin ? "admin" : (getCurrentUser()?.ROLE_ID as UserRole).campusDirector ? "campusDirector" : "dean" 

    const columns: Array<GridColDef<ISubject>> = [
        {
            field: "SUB_ID",
            headerName: "ID",
        },
        {
            field: "SUB_EDP_CODE",
            headerName: "EDP Code",
            minWidth: 128
        },
        {
            field: "SUB_CODE",
            headerName: "Course Code",
            minWidth: 160
        },
        {
            field: "SUB_DESCRIPTION",
            headerName: "Description",
            minWidth: 192,
            flex: 1,
            renderCell: (params) => {
                return (
                    <Link
                    component={RouterLink}
                    to={`/${role}/subject/${params.row.SUB_ID!}`}
                    underline="none">
                        {params.row.SUB_DESCRIPTION}
                    </Link>
                )
            },
        },
        {
            field: "SCHED_ID.SCHED_RANGE",
            headerName: "Schedule",
            renderCell: (params) => {
                return `${dayjs((params.row.SCHED_ID as ISchedule).SCHED_STARTTIME).format("hh:mm A")} - ${dayjs((params.row.SCHED_ID as ISchedule).SCHED_ENDTIME).format("hh:mm A")}`
            },
            flex: 0.6
        },
        {
            field: "SCHED_ID.SCHED_WEEKASSIGNED",
            headerName: "Days",
            renderCell: (params) => {
                return (params.row.SCHED_ID as ISchedule).SCHED_WEEKASSIGNED.reduce((prevValue, curValue) => {
                    const currentValue = curValue == "Thursday" ? curValue.substring(0, 2) : curValue.charAt(0)
                    return prevValue + currentValue
                }, "")
            },
            minWidth: 128,
        },
    ] 

    return(
        <DataGrid
        getRowId={(row) => row.SUB_ID!}
        initialState={{
            pagination: {
                paginationModel: {
                    pageSize: 10,
                }
            },
            columns: {
                columnVisibilityModel: {
                    SUB_ID: false
                }
            }
        }}
        columns={columns}
        rows={subjects}
        pageSizeOptions={[10]}/>
    )
}

export default RoomSubjectList