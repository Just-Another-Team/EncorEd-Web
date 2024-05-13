import { createContext, useEffect, useState } from "react";
import { useRooms } from "../hooks/useRooms";
import navigationService from "../app/api/navigation-service";
import { AccessTokenType } from "../types/AccessTokenType";
import { AxiosResponse } from "axios";
import { useUsers } from "../hooks/useUsers";
import { useAuth } from "../hooks/useAuth";
import { UserRole } from "../data/IUser";
import IRoom from "../data/IRoom";
import IFloor from "../data/IFloor";
import { defaultFloor } from "../data/defaultFloor";
import { IKioskLog } from "../data/IKioskLog";
import useClock from "../hooks/useClock";
import dayjs from "dayjs";

type NavigationContextType = {
    accessToken: AccessTokenType | undefined;
    selectedRoom: IRoom | undefined
    selectedRoomInputValue: string
    selectedFloor: IFloor | undefined
    addSearchLog: (room: IRoom) => Promise<AxiosResponse<any, any>>
    setFloor: (room: IFloor) => void
    setRoom: (room: IRoom | undefined) => void
    setRoomInputValue: (room: string) => void
    setRoomAndFloor: (room: IRoom) => void
    getRoomsByFloor: () => Array<IRoom>
    load: boolean;
}

export const NavigationContext = createContext<NavigationContextType>({} as NavigationContextType);

type NavigationProviderType = {
    children: React.ReactNode;
}

export const NavigationProvider = ({ children }: NavigationProviderType) => {
    const { user } = useAuth()
    const { getCurrentUser } = useUsers()
    const { rooms, floors } = useRooms()

    const [accessToken, setAccessToken] = useState<AccessTokenType>();
    const [selectedRoom, setSelectedRoom] = useState<IRoom>();
    const [selectedRoomInputValue, setSelectedRoomInputValue] = useState<string>('');
    const [selectedFloor, setSelectedFloor] = useState<IFloor | undefined>(defaultFloor);
    const [load, setLoad] = useState<boolean>(true);

    const addSearchLog = (room: IRoom) => {
        const user = getCurrentUser()

        const log: IKioskLog = {
            KILG_DATE: dayjs().toISOString(),
            KILG_TYPE: 'Search',
            ROOM_ID: room.ROOM_ID as string,
            USER_ID: user ? user.USER_ID! : null,
        }

        return navigationService.addLog(log)
    }

    const addNavigationLog = (room: IRoom) => {
        // const user = getCurrentUser()

        // const log: IKioskLog = {
        //     KILG_DATE: dayjs().toISOString(),
        //     KILG_TYPE: 'Search',
        //     ROOM_ID: room.ROOM_ID as string,
        //     USER_ID: user ? user.USER_ID! : null,
        // }
    }

    const getRoomsByFloor = () => {
        return rooms.filter(room => room.FLR_ID === selectedFloor?.FLR_ID)
    }

    const setRoom = (room: IRoom | undefined) => {
        setSelectedRoom(room)
        setSelectedRoomInputValue(room ? room.ROOM_NAME : '')
    }

    const setRoomInputValue = (room: string) => {
        setSelectedRoomInputValue(room)
    }

    const setRoomAndFloor = (roomInput: IRoom) => {
        console.log(roomInput)
        const floor = floors.find(floor => floor.FLR_ID === roomInput.FLR_ID)

        const room: IRoom = {
            ...roomInput,
            FLR_ID: floor ? floor : roomInput.FLR_ID
        }

        setSelectedRoom(room)
        setSelectedRoomInputValue(room.ROOM_NAME)
        setSelectedFloor( typeof room.FLR_ID === 'string' ? floor : room.FLR_ID as IFloor)
    }

    const setFloor = (floor: IFloor) => {
        setSelectedFloor(floor)
    }

    useEffect(() => {
        const getAccessToken = async () => {
            const accessToken = await navigationService.getAccessToken()
            setAccessToken(accessToken.data)
        }

        getAccessToken()
        setLoad(false)
    }, [user])
    
    const value = {
        accessToken,
        selectedRoom,
        selectedFloor,
        selectedRoomInputValue,
        addSearchLog,
        setRoom,
        setFloor,
        getRoomsByFloor,
        setRoomAndFloor,
        setRoomInputValue,
        load
    }

    return (
        <NavigationContext.Provider value={value}>
            { children }
        </NavigationContext.Provider>
    )

}