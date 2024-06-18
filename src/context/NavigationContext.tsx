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
import IGraphData from "../data/IGraphData";
import { PathInputType } from "../data/IPathData";

type NavigationContextType = {
    accessToken: AccessTokenType | undefined;
    selectedRoom: IRoom | undefined
    destination: IRoom | undefined
    selectedRoomInputValue: string
    selectedFloor: IFloor | undefined
    navigateTo: (room: IRoom) => void
    addSearchLog: (room: IRoom) => Promise<AxiosResponse<any, any>>
    setFloor: (room: IFloor) => void
    setRoom: (room: IRoom | undefined) => void
    setRoomInputValue: (room: string) => void
    setRoomAndFloor: (room: IRoom) => void
    getRoomsByFloor: () => Array<IRoom>
    initializeGraph: (data: IGraphData) => Promise<AxiosResponse<any, any>>
    generatePath: (data: PathInputType) => Promise<AxiosResponse<any, any>>
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
    const [destination, setDestination] = useState<IRoom>();
    const [selectedRoomInputValue, setSelectedRoomInputValue] = useState<string>('');
    const [selectedFloor, setSelectedFloor] = useState<IFloor | undefined>(defaultFloor);
    const [load, setLoad] = useState<boolean>(true);

    const initializeGraph = (data: IGraphData) => {
        return navigationService.initializeGraph(data)
    }

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

    const navigateTo = (room: IRoom) => {
        setDestination(room)
    }

    const generatePath = (data: PathInputType) => {
        return navigationService.generatePath(data)
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

        setSelectedFloor( typeof room.FLR_ID === 'string' ? floor : room.FLR_ID as IFloor)
        setSelectedRoom(room)
        setSelectedRoomInputValue(room.ROOM_NAME)
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
        destination,
        selectedFloor,
        selectedRoomInputValue,
        addSearchLog,
        navigateTo,
        setRoom,
        setFloor,
        getRoomsByFloor,
        setRoomAndFloor,
        setRoomInputValue,
        initializeGraph,
        generatePath,
        load
    }

    return (
        <NavigationContext.Provider value={value}>
            { children }
        </NavigationContext.Provider>
    )

}