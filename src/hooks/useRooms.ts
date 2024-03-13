import { useEffect, useMemo, useState } from "react";
import roomService from "../app/api/room-service";
import IRoom from "../types/IRoom";

export const useRooms = () => {
    const [rooms, setRooms] = useState<Array<IRoom>>([]);

    useEffect(() => {
        const fetchedRooms = async () => {
            const response = await roomService.view()
            const responseData = response.data;

            setRooms(responseData)
        }

        fetchedRooms();
    }, [])

    return { rooms }
}