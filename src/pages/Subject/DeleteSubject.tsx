import { Box, Button, CircularProgress, Stack } from "@mui/material"
import DialogMessage from "../../components/DialogMessage"
import ControlledTextField from "../../components/TextFieldControlled/input"
import useLoading from "../../hooks/useLoading";
import { useForm } from "react-hook-form";
import { useSubject } from "../../hooks/useSubject";
import { FirebaseError } from "firebase/app";
import { AuthErrorCodes } from "firebase/auth";
import { useAuth } from "../../hooks/useAuth";
import ISubject from "../../data/ISubject";
import DeleteDialog from "../../components/DialogDelete";
import { useModal } from "../../hooks/useModal";

type DeleteSubjectType = {
    subject: ISubject,
    openModal: boolean,
    handleCloseModal: () => void
    handleClear: () => void
}

const DeleteSubject = ({
    subject,
    openModal,
    handleCloseModal,
    handleClear
}: DeleteSubjectType) => {
    const { deleteSubject } = useSubject();

    const handleDelete = async () => {
        await deleteSubject(subject?.SUB_ID!)
            .then((result) => {
                console.log(result.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    return (
        <DeleteDialog
        selectedObject={subject as ISubject}
        handleClear={handleClear}
        onDelete={handleDelete}
        deleteModal={openModal}
        closeDeleteModal={handleCloseModal}/>
    )
}

export default DeleteSubject