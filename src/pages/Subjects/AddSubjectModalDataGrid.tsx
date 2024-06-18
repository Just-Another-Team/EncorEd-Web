import { DataGrid, GridColDef } from "@mui/x-data-grid"
import ISubject from "../../data/ISubject"
import IUser, { UserRole } from "../../data/IUser"
import ISchedule from "../../data/ISchedule"
import dayjs from "dayjs"
import { useUsers } from "../../hooks/useUsers"
import { useEffect } from "react"
import { FixMeLater } from "../../types/FixMeLater"

type AddSubjectModalDataGridType = {
    addedSubjects: Array<ISubject>
    activateCheckBox?: boolean
    addSubjectsToBeDeleted: (row: Array<number>) => void
    updateSubject: (row: ISubject) => void
}

const AddSubjectModalDataGrid = (props: AddSubjectModalDataGridType) => {

    const {
        addedSubjects,
        activateCheckBox,
        addSubjectsToBeDeleted,
        updateSubject
    } = props

    const { getUser } = useUsers()

    const columns: Array<GridColDef<ISubject>> = [
        {
            field: "SUB_EDP_CODE",
            headerName: "EDP Code",
            sortable: false,
            minWidth: 160,
            renderCell: (params) => {

                if (params.row.SUB_EDP_CODE === "error/code-exists")
                    return "Code duplicate found"

                return params.row.SUB_EDP_CODE
            }
        },
        {
            field: "SUB_CODE",
            headerName: "Course Code",
            renderCell: (params) => {
                return params.row.SUB_CODE
            },
            sortable: false,
            minWidth: 172,
        },
        {
            field: "SUB_DESCRIPTION",
            headerName: "Subject Description",
            renderCell: (params) => {
                return params.row.SUB_DESCRIPTION
            },
            sortable: false,
            minWidth: 360,
            flex: 1
        },
        {
            field: "USER_ID",
            headerName: "Instructor",
            renderCell: (params) => {
                if (params.row.USER_ID === "error/invalid-user-id")
                    return "Invalid User Id"

                if (params.row.USER_ID === "error/user-not-teacher")
                    return "User not an instructor"

                if (params.row.USER_ID === null ) 
                    return "No Instructor"

                const user = getUser(params.row.USER_ID as string)
                return user && (user.ROLE_ID as UserRole).teacher ? user?.USER_FULLNAME : user && !(user.ROLE_ID as UserRole).teacher ? "User is not a teacher" : "No Instructor"
            },
            sortable: false,
            minWidth: 256,
        },
        {
            field: "SCHED_ID.SCHED_RANGE",
            headerName: "Schedule",
            renderCell: (params) => {
                if (!params.row.SCHED_ID) return null 
                return `${dayjs((params.row.SCHED_ID as ISchedule).SCHED_STARTTIME).format("hh:mm A")} - ${dayjs((params.row.SCHED_ID as ISchedule).SCHED_ENDTIME).format("hh:mm A")}`
    
            },
            sortable: false,
            minWidth: 192,
        },
        {
            field: "SCHED_ID.SCHED_WEEKASSIGNED",
            headerName: "Days",
            minWidth: 192,
            renderCell: (params) => {
                console.log("Schedule: ", (params.row.SCHED_ID as ISchedule).SCHED_WEEKASSIGNED)

                if ((params.row.SCHED_ID as ISchedule).SCHED_WEEKASSIGNED.find(week => week === "error/no-days-assigned"))
                    return "No weekdays assigned"

                if (!params.row.SCHED_ID) return ""

                const scheduledDays = (params.row.SCHED_ID as ISchedule).SCHED_WEEKASSIGNED.reduce((prevValue, curValue) => {
                    const currentValue = curValue == "Thursday" ? curValue.substring(0, 2) : curValue.charAt(0)
                    return prevValue + currentValue
                }, "")

                return scheduledDays
            },
            sortable: false,
        },
    ]

    return (
        <DataGrid
        initialState={{
            columns: {
                columnVisibilityModel: {
                    // SUB_CODE: false,
                }
            },
            pagination: {
                paginationModel: {
                    pageSize: 25,
                }
            }
        }}
        slotProps={{
            pagination: {
                disabled: true,
            }
        }}
        onRowDoubleClick={(params) => {
            //Activate update subject
            //Select the row
            console.log(params)
            updateSubject(params.row)
        }}
        onRowSelectionModelChange={(row) => {
            //Checkbox Selection
            addSubjectsToBeDeleted(row as Array<number>)
        }}
        hideFooter={true}
        checkboxSelection={activateCheckBox}
        getRowId={(row) => (row as FixMeLater).SUB_INDEX}
        columns={columns}
        rows={addedSubjects}/>
    )
}

export default AddSubjectModalDataGrid