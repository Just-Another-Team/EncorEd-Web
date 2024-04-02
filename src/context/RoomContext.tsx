import { createContext, useEffect, useMemo, useState } from "react";
import roomService from "../app/api/room-service";
import IRoom from "../types/IRoom";
import { useSubject } from "../hooks/useSubject";

type AttendanceContextType = {
    rooms: Array<IRoom> | null | undefined;
    load: boolean;
    setLoad: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RoomContext = createContext<AttendanceContextType>({} as AttendanceContextType);

type RoomProviderType = {
    children: React.ReactNode;
}

export const RoomProvider = ({
    children
}: RoomProviderType) => {
    const [rooms, setRooms] = useState<Array<IRoom>>([]);
    const [load, setLoad] = useState<boolean>(true);

    useEffect(() => {
        const fetchedRooms = async () => {
            const response = await roomService.view()
            const responseData = response.data;

            setRooms(responseData)
        }

        fetchedRooms();
        setLoad(false)
    }, [load])

    const value = {
        rooms,
        load,
        setLoad,
    }

    return (
        <RoomContext.Provider value={value}>
            { children }
        </RoomContext.Provider>
    )
}