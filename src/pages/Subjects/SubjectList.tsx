import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
} from "@mui/x-data-grid"
import dayjs from "dayjs"
import IUser from "../../data/IUser"
import ISubject from "../../data/ISubject"
import { useSubject } from "../../hooks/useSubject"
import ISchedule from "../../data/ISchedule"
import { DeleteOutlineOutlined, UpdateOutlined } from "@mui/icons-material"
import { useState } from "react"
import { useModal } from "../../hooks/useModal"
import DeleteDialog from "./DeleteSubject"
import UpdateDialog from "./UpdateSubject"
import DeleteSubject from "./DeleteSubject"

type SubjectDeleteType = {
    password: string | null;
}

const SubjectList = () => {
    const { subjects, getSubjects } = useSubject();

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

    const [ subject, setSubject] = useState<ISubject>();

    const handleClear = () => {
        setSubject(undefined)
    }

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
            minWidth: 172,
        },
        {
            field: "SUB_DESCRIPTION",
            headerName: "Subject Description",
            renderCell: (params) => {
                return params.row.SUB_DESCRIPTION
            },
            minWidth: 360,
            flex: 1
        },
        {
            field: "SUB_ID.USER_ID",
            headerName: "Instructor",
            renderCell: (params) => {
                return (params.row.USER_ID as IUser).USER_FULLNAME
            },
            sortable: false,
            minWidth: 256,
        },
        {
            field: "SUB_ID.SCHED_ID.SCHED_RANGE",
            headerName: "Schedule",
            renderCell: (params) => {
                return `${dayjs((params.row.SCHED_ID as ISchedule).SCHED_STARTTIME).format("hh:mm A")} - ${dayjs((params.row.SCHED_ID as ISchedule).SCHED_ENDTIME).format("hh:mm A")}`
    
            },
            sortable: false,
            minWidth: 192,
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
            sortable: false,
            minWidth: 96,
        },
        {
            field: "UPDATE",
            headerName: "",
            type: "actions",
            getActions: (params) => {

                const handleOnClickUpdate = (subject: ISubject) => () => {
                    setSubject(subject);
                    openUpdateModal();
                }
                
                const handleOnClickDelete = (subject: ISubject) => () => {
                    setSubject(subject);
                    openDeleteModal();
                }

                return [
                    <GridActionsCellItem
                    key={"update"}
                    icon={<UpdateOutlined />}
                    label="Edit"
                    className="textPrimary"
                    onClick={handleOnClickUpdate(params.row)}
                    color="secondary"
                    />,
                    <GridActionsCellItem
                    key={"delete"}
                    icon={<DeleteOutlineOutlined />}
                    label="Delete"
                    onClick={handleOnClickDelete(params.row)}
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
            rows={getSubjects()}/>

            {/* Update dialog */}
            <UpdateDialog
            subject={subject!}
            updateModal={updateModal}
            closeUpdateModal={closeUpdateModal}/>

            <DeleteSubject
            subject={subject!}
            openModal={deleteModal}
            handleCloseModal={closeDeleteModal}
            handleClear={handleClear}/>
        </>
    )
}

export default SubjectList