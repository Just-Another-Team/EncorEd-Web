import { useState } from "react";

export const useModal = () => {
    const [ openModal, setOpenModal ] = useState<boolean>(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    return { openModal, setOpenModal, handleOpenModal, handleCloseModal }
}
