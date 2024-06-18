import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { useSubject } from "../../hooks/useSubject"
import ISubject from "../../data/ISubject"
import dayjs from "dayjs"
import IUser, { UserRole } from "../../data/IUser"
import ISchedule from "../../data/ISchedule"
import { Box } from "@mui/material"
import useClock from "../../hooks/useClock"
import { useUsers } from "../../hooks/useUsers"

const OngoingSubjects = () => {
    const { getOngoingSubjects } = useSubject()
    const { getCurrentUser } = useUsers()

    // Get Ongoing Subjects
    // - If Admin or CD, show all ongoing subjects
    // - If Dean, show ongoing subjects that dean created

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
                const user = params.row.USER_ID

                return user !== null ? (params.row.USER_ID as IUser).USER_FULLNAME : "No Instructor"
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

    const role = getCurrentUser()?.ROLE_ID as UserRole
    const subjects = (role: UserRole) => {
        return getOngoingSubjects(dayjs().toISOString()).filter(subject => (role.admin || role.campusDirector ? true : subject.SUB_CREATEDBY === getCurrentUser()?.USER_ID) && subject.USER_ID !== null)
    }

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
            pageSizeOptions={[5]}
            columns={SubjectHeaders}
            rows={subjects(role)}/>
        </Box>
    )
}

export default OngoingSubjects