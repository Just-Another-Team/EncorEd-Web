import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
} from "@mui/x-data-grid"
import dayjs from "dayjs"
import IUser, { UserRole } from "../../data/IUser"
import ISubject from "../../data/ISubject"
import { useSubject } from "../../hooks/useSubject"
import ISchedule from "../../data/ISchedule"
import { DeleteOutlineOutlined, PersonAddAlt1Outlined, UpdateOutlined } from "@mui/icons-material"
import { useState } from "react"
import { useModal } from "../../hooks/useModal"
import { useUsers } from "../../hooks/useUsers"
import { Alert, Button, Fade, Link, Snackbar } from "@mui/material"
import AssignTeacher from "./AssignTeacher"
import { Link as RouterLink } from 'react-router-dom'
import SubjectForm from "./SubjectForm"
import useLoading from "../../hooks/useLoading"
import DeleteDialog from "../../components/DialogDelete"
import { useRooms } from "../../hooks/useRooms"

type SubjectDeleteType = {
    password: string | null;
}

const SubjectList = () => {
    const { subjects, getSubjects, getSubjectsByCreator, updateSubject, deleteSubject } = useSubject();
    const { getUser, getCurrentUser } = useUsers()
    const { assignTeacherToSubject } = useSubject()
    const { getRoom } = useRooms()

    const { 
        openModal: assignModal,
        handleOpenModal: openAssignModal,
        handleCloseModal: closeAssignModal
    } = useModal();

    const { 
        openModal: updateModal,
        handleOpenModal: openUpdateModal,
        handleCloseModal: closeUpdateModal
    } = useModal();

    const { 
        openModal: deleteModal,
        handleOpenModal: openDeleteModal,
        handleCloseModal: closeDeleteModal
    } = useModal();

    const { 
        openModal: successSnackbar,
        handleOpenModal: openSuccessSnackbar,
        handleCloseModal: closeSuccessSnackbar
    } = useModal();

    const { 
        openModal: errorSnackbar,
        handleOpenModal: openErrorSnackbar,
        handleCloseModal: closeErrorSnackbar
    } = useModal();

    const { loading, openLoading, closeLoading } = useLoading();

    const [ subject, setSubject] = useState<ISubject>();
    const [ message, setMessage ] = useState<string>();

    const assignTeacherHandler = async (data: ISubject) => {
        //Check if the teacher has other schedule overlapping here

        const assignedTeacher: { SUB_ID: string, USER_ID: string} = {
            SUB_ID: subject?.SUB_ID as string,
            USER_ID: data.USER_ID as string
        }

        await assignTeacherToSubject(assignedTeacher)
            .then((result) => {
                console.log(result.data)
                setMessage(result.data)
                openSuccessSnackbar()
            })
            .catch((error) => {
                console.error(error)
                setMessage(error.response.data)
                openErrorSnackbar()
            })

        closeAssignModal()
    }

    const handleClear = () => {
        setSubject(undefined)
    }

    const updateData = async (data: ISubject) => {
        openLoading();

        // Update function
        await updateSubject({
            ...data as ISubject,
            SUB_ID: subject?.SUB_ID,
            SUB_UPDATEDBY: getCurrentUser()?.USER_ID,
            USER_ID: data.USER_ID && data.USER_ID !== "" ? data.USER_ID : null
        })
            .then((result) => {

                console.log(result.data)
                setMessage(result.data)
                openSuccessSnackbar()
            })
            .catch((error) => {
                console.error(error)
                setMessage(error.response.data)
                openErrorSnackbar()
            })

        closeLoading();
        //When it updates, move to the list
        closeUpdateModal()
    }

    const handleDelete = async () => {
        await deleteSubject(subject?.SUB_ID!)
            .then((result) => {
                console.log(result.data)
                setMessage(result.data)
                openSuccessSnackbar()
            })
            .catch((error) => {
                console.error(error)
                setMessage(error.response.data)
                openErrorSnackbar()
            })
    }

    const role = getCurrentUser()?.ROLE_ID as UserRole

    const SubjectHeaders: Array<GridColDef<ISubject>> = [
        {
            field: "SUB_ID",
            headerName: "ID",
        },
        {
            field: "SUB_EDP_CODE",
            headerName: "EDP Code",
        },
        {
            field: "SUB_CODE",
            headerName: "Course Code",
            renderCell: (params) => {
                return params.row.SUB_CODE
            },
            minWidth: 172,
        },
        {
            field: "SUB_DESCRIPTION",
            headerName: "Subject Description",
            renderCell: (params) => {
                return (
                    <Link
                    component={RouterLink}
                    to={params.row.SUB_ID!}
                    underline="none">
                        {params.row.SUB_DESCRIPTION}
                    </Link>
                )
            },
            minWidth: 360,
            flex: 1
        },
        {
            field: "SUB_CREATEDBY",
            headerName: "Created by",
            minWidth: 256,
            renderCell: (params) => {
                const createdBy = params.row.SUB_CREATEDBY
                return createdBy ? getUser(createdBy)?.USER_FULLNAME : "No creator"
            },
            // flex: 0.6
        },
        {
            field: "SUB_ID.ROOM_ID",
            headerName: "Room Assigned",
            renderCell: (params) => {
                
                if (!getRoom(params.row.ROOM_ID as string)) {
                    return "No Room Assigned"
                }

                return (
                    <Link
                    component={RouterLink}
                    to={`/${role.admin ? "admin" : role.campusDirector ? "campusDirector" : "dean" }/rooms/${getRoom(params.row.ROOM_ID as string)?.ROOM_ID!}`}
                    underline="none">
                        {getRoom(params.row.ROOM_ID as string)?.ROOM_NAME}
                    </Link>
                )
            },
            sortable: false,
            minWidth: 256,
        },
        {
            field: "SUB_ID.USER_ID",
            headerName: "Instructor",
            renderCell: (params) => {

                const handleOnClickAssign = (subject: ISubject) => {
                    setSubject(subject)
                    openAssignModal();
                }

                if ( !params.row.USER_ID || params.row.USER_ID === null ) 
                    return (
                        <Button
                        onClick={() => handleOnClickAssign(params.row)}
                        startIcon={<PersonAddAlt1Outlined />}
                        size="small"
                        variant="outlined">
                            Assign a Teacher
                        </Button>
                    )

                return (
                    <Link
                    component={RouterLink}
                    to={`/${role.admin ? "admin" : role.campusDirector ? "campusDirector" : "dean" }/users/${(params.row.USER_ID as IUser).USER_ID}`}
                    underline="none">
                        {(params.row.USER_ID as IUser).USER_FULLNAME}
                    </Link>
                )
            },
            sortable: false,
            minWidth: 256,
        },
        {
            field: "SUB_ID.SCHED_ID.SCHED_RANGE",
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
            renderCell: (params) => {
                if (!params.row.SCHED_ID) return null 

                const scheduledDays = (params.row.SCHED_ID as ISchedule).SCHED_WEEKASSIGNED.reduce((prevValue, curValue) => {
                    const currentValue = curValue == "Thursday" ? curValue.substring(0, 2) : curValue.charAt(0)
                    return prevValue + currentValue
                }, "")

                return scheduledDays
            },
            sortable: false,
            minWidth: 96,
        },
        {
            field: "UPDATE",
            headerName: "",
            type: "actions",
            getActions: (params) => {

                const handleOnClickUpdate = (subject: ISubject) => {
                    setSubject(subject);
                    openUpdateModal();
                }
                
                const handleOnClickDelete = (subject: ISubject) => {
                    setSubject(subject);
                    openDeleteModal();
                }

                return [
                    <GridActionsCellItem
                    key={"update"}
                    icon={<UpdateOutlined />}
                    label="Edit"
                    className="textPrimary"
                    onClick={() => handleOnClickUpdate(params.row)}
                    color="secondary"
                    />,
                    <GridActionsCellItem
                    key={"delete"}
                    icon={<DeleteOutlineOutlined />}
                    label="Delete"
                    onClick={() => handleOnClickDelete(params.row)}
                    color="error"
                    />,
                  ];
            },
            
        },
    ]

    return (
        <>
            <DataGrid
            initialState={{
                columns: {
                    columnVisibilityModel: {
                        SUB_ID: false,
                        SUB_CREATEDBY: role.admin ? true : false
                    }
                },
                pagination: {
                    paginationModel: {
                        pageSize: 25,
                    }
                }
            }}
            columns={SubjectHeaders}
            getRowId={(row) => row.SUB_ID!}
            rows={role.admin ? getSubjects() : getSubjectsByCreator(getCurrentUser()?.USER_ID as string)}/>

            {/* Assign a teacher */}
            <AssignTeacher
            onSubmit={assignTeacherHandler}
            subject={subject}
            openModal={assignModal}
            closeModal={closeAssignModal}/>

            <SubjectForm
            loading={loading}
            title={`Update ${subject?.SUB_CODE}`}
            selectedSubject={subject!}
            openModal={updateModal}
            onSubmit={updateData}
            closeModal={closeUpdateModal}/>

            <DeleteDialog
            selectedObject={subject!}
            title={subject?.SUB_DESCRIPTION!}
            onDelete={handleDelete}
            deleteModal={deleteModal}
            closeDeleteModal={closeDeleteModal}
            handleClear={handleClear}/>

            <Snackbar
            open={successSnackbar}
            autoHideDuration={3000}
            TransitionComponent={Fade}
            onClose={closeSuccessSnackbar}>
                <Alert
                variant="filled"
                severity="success"
                onClose={closeSuccessSnackbar}>
                    { message }
                </Alert>
            </Snackbar>

            <Snackbar
            open={errorSnackbar}
            autoHideDuration={3000}
            TransitionComponent={Fade}
            onClose={closeErrorSnackbar}>
                <Alert
                variant="filled"
                severity="error"
                onClose={closeErrorSnackbar}>
                    { message }
                </Alert>
            </Snackbar>
        </>
    )
}

export default SubjectList