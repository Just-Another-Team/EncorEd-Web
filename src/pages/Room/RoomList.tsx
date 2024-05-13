import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
    GridComparatorFn,
} from "@mui/x-data-grid"
import dayjs from "dayjs"
import { useSubject } from "../../hooks/useSubject"
import ISchedule from "../../data/ISchedule"
import { DeleteOutlineOutlined, UpdateOutlined } from "@mui/icons-material"
import { useState } from "react"
import { useModal } from "../../hooks/useModal"
import IRoom from "../../data/IRoom"
import { useRooms } from "../../hooks/useRooms"
import IFloor from "../../data/IFloor"
import DeleteRoom from "./DeleteRoom"
import RoomForm from "./RoomForm"
import useLoading from "../../hooks/useLoading"
import { Typography } from "@mui/material"
import Color from "../../assets/Color"
import { useSchedules } from "../../hooks/useSchedules"
import { RoomType } from "../../data/RoomType"

type SubjectDeleteType = {
    password: string | null;
}

const RoomList = () => {
    const { getSchedule } = useSchedules()
    const { getRooms, updateRoom } = useRooms()

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

    const { loading, openLoading, closeLoading } = useLoading();

    const [ room, setRoom] = useState<IRoom>();

    const handleClear = () => {
        setRoom(undefined)
    }

    const onUpdateRoom = async (input: IRoom) => {
        const schedule: ISchedule | null = input.ROOM_TYPE === RoomType.office ? room?.ROOM_TYPE === RoomType.office ? {
            SCHED_ID: (room.SCHED_ID as ISchedule).SCHED_ID,
            SCHED_STARTTIME: dayjs((input.SCHED_ID as ISchedule).SCHED_STARTTIME as string).toISOString(),
            SCHED_ENDTIME: dayjs((input.SCHED_ID as ISchedule).SCHED_ENDTIME as string).toISOString(),
        } as ISchedule : {
            SCHED_STARTTIME: dayjs((input.SCHED_ID as ISchedule).SCHED_STARTTIME as string).toISOString(),
            SCHED_ENDTIME: dayjs((input.SCHED_ID as ISchedule).SCHED_ENDTIME as string).toISOString(),
        } as ISchedule : null

        const roomInput: IRoom = {
            ...input,
            ROOM_ID: room?.ROOM_ID,
            SCHED_ID: schedule,
            OLD_SCHED_ID: room?.SCHED_ID !== null ? (room?.SCHED_ID as ISchedule).SCHED_ID : null
        }

        openLoading()

        await updateRoom(roomInput)
            .then((result) => {
                console.log(result.data)
            })
            .catch((error) => {
                console.error(error)
            })

        closeLoading()

        closeUpdateModal()
    }

    const RoomHeaders: Array<GridColDef<IRoom>> = [
        {
            field: "ROOM_ID",
            headerName: "ID",
            minWidth: 224
        },
        {
            field: "ROOM_NAME",
            headerName: "Name",
            minWidth: 160
        },
        {
            field: "ROOM_TYPE",
            headerName: "Type",
            minWidth: 96
        },
        {
            field: "SCHED_ID",
            headerName: "Schedule",
            renderCell: (params) => {
                const schedule = getSchedule(params.row.SCHED_ID !== null ? (params.row.SCHED_ID as ISchedule).SCHED_ID as string : undefined)

                return params.row.SCHED_ID !== null ? 
                <Typography variant="body2">
                    {`${dayjs(schedule?.SCHED_STARTTIME as string).format("hh:mm A")} - ${dayjs(schedule?.SCHED_ENDTIME as string).format("hh:mm A")}`}
                </Typography> : 
                <Typography variant="body2" color={Color('black', 200)}>
                    Not applicable
                </Typography>
            },
            valueGetter: (params) => {
                return params.row.SCHED_ID ? (params.row.SCHED_ID as ISchedule).SCHED_STARTTIME as string : null
            },
            minWidth: 192,
        },
        {
            field: "FLR_ID.FLR_NAME",
            headerName: "Floor",
            valueGetter: (params) => {
                return (params.row.FLR_ID as IFloor).FLR_LEVEL 
            },
            renderCell: (params) => {
                return (params.row.FLR_ID as IFloor).FLR_NAME
            },
            minWidth: 128,
            sortComparator: (v1, v2) => {
                return v1 - v2
            }
        },
        {
            field: "ROOM_REMARKS",
            headerName: "Remarks",
            minWidth: 256,
            flex: 1,
        },
        {
            field: "UPDATE",
            headerName: "",
            type: "actions",
            getActions: (params) => {

                const handleOnClickUpdate = (room: IRoom) => () => {
                    setRoom(room);
                    openUpdateModal();
                }
                
                const handleOnClickDelete = (room: IRoom) => () => {
                    setRoom(room);
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
                        ROOM_ID: false,
                    }
                },
                pagination: {
                    paginationModel: {
                        pageSize: 25,
                    }
                }
            }}
            columns={RoomHeaders}
            getRowId={(row) => row.ROOM_ID!}
            rows={getRooms()}/>

            {/* Update dialog */}
            <RoomForm
            onSubmit={onUpdateRoom}
            //loading
            selectedRoom={room}
            openModal={updateModal}
            closeModal={closeUpdateModal}/>

            <DeleteRoom
            room={room!}
            openModal={deleteModal}
            handleCloseModal={closeDeleteModal}
            handleClear={handleClear}/> 
        </>
    )
}

export default RoomList
