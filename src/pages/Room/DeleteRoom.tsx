import DeleteDialog from "../../components/DialogDelete";
import { useRooms } from "../../hooks/useRooms";
import IRoom from "../../data/IRoom";

type DeleteRoomType = {
    room: IRoom,
    openModal: boolean,
    handleCloseModal: () => void
    handleClear: () => void
}

const DeleteRoom = ({
    room,
    openModal,
    handleCloseModal,
    handleClear
}: DeleteRoomType) => {
    const { deleteRoom } = useRooms();

    const handleDelete = async () => {
        await deleteRoom(room?.ROOM_ID!)
            .then((result) => {
                console.log(result.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    return (
        <DeleteDialog
        selectedObject={room as IRoom}
        title={room?.ROOM_NAME}
        handleClear={handleClear}
        onDelete={handleDelete}
        deleteModal={openModal}
        closeDeleteModal={handleCloseModal}/>
    )
}

export default DeleteRoom