import { createContext, useEffect, useMemo, useState } from "react";
import roomService from "../app/api/room-service";
import IRoom from "../data/IRoom";
import { useAuth } from "../hooks/useAuth";
import { collection, onSnapshot } from "firebase/firestore";
import { converter } from "../types/converter";
import IFloor from "../data/IFloor";
import { db } from "../app/firebase/config";
import { AxiosResponse } from "axios";
import { useSchedules } from "../hooks/useSchedules";
import { RoomType } from "../data/RoomType";

type RoomContextType = {
    rooms: Array<IRoom>;
    floors: Array<IFloor>
    addRoom: (room: IRoom) => Promise<AxiosResponse<string, any>>
    deleteRoom: (roomId: string) => Promise<AxiosResponse<string, any>>
    updateRoom: (room: IRoom) => Promise<AxiosResponse<string, any>>

    getRooms: () => Array<IRoom>
    getClassrooms: () => Array<IRoom>
    getOffices: () => Array<IRoom>

    getRoomFloor: (floorId: string) => IFloor | undefined
    getFloorSortedByLevel: () => Array<IFloor>
    load: boolean;
    setLoad: React.Dispatch<React.SetStateAction<boolean>>;
    getRoom: (roomId: string) => IRoom | undefined
}

export const RoomContext = createContext<RoomContextType>({} as RoomContextType);

type RoomProviderType = {
    children: React.ReactNode;
}

export const RoomProvider = ({
    children
}: RoomProviderType) => {
    const { user } = useAuth()
    const { getSchedule } = useSchedules()

    const [floors, setFloors] = useState<Array<IFloor>>([]);
    const [rooms, setRooms] = useState<Array<IRoom>>([]);
    const [load, setLoad] = useState<boolean>(true);

    const floorCollection = collection(db, '/Floor/').withConverter(converter<IFloor>())
    const roomCollection = collection(db, '/Room/').withConverter(converter<IRoom>())

    const addRoom = (room: IRoom) => {
        return roomService.add(room)
    }

    const updateRoom = (room: IRoom) => {
        return roomService.update(room)
    }

    const deleteRoom = (roomId: string) => {
        return roomService.delete(roomId)
    }

    const getFloorSortedByLevel = () => {
        return floors.sort((floor, nextFloor) => floor.FLR_LEVEL > nextFloor.FLR_LEVEL ? -1 : 1)
    }

    const getRoomFloor = (floorId: string) => {
        return floors.find(floor => floor.FLR_ID === floorId)
    }

    const getRooms = () => {
        return rooms.filter(room => !room.ROOM_ISDELETED).map((room):IRoom => {
            const floor = floors.find(floor => floor.FLR_ID === room.FLR_ID)
            const schedule = getSchedule(room.SCHED_ID as string) 

            return ({
                ...room,
                SCHED_ID: schedule ? schedule : null,
                FLR_ID: floor ? floor : null
            })
        })
    }

    const getClassrooms = () => {
        return getRooms().filter(room => room.ROOM_TYPE === RoomType.classroom)
    }

    const getOffices = () => {
        return getRooms().filter(room => room.ROOM_TYPE === RoomType.office)
    }

    const getRoom = (roomId: string) => {
        return getRooms().find(room => room.ROOM_ID === roomId)
    }

    useEffect(() => {
        const fetchFloorSnapshots = onSnapshot(floorCollection, (snapshot) => {
            const floorDocs = snapshot.docs.map((floor):IFloor => {
                return({
                    ...floor.data(),
                    FLR_ID: floor.id,
                })
            })

            setFloors(floorDocs)
        }, (error) => {
            console.error('Floor Context Error', error)
        })

        const fetchRoomSnapshots = onSnapshot(roomCollection, (snapshot) => {
            const roomDocs = snapshot.docs.map((room):IRoom => {
                return({
                    ...room.data(),
                    ROOM_ID: room.id,
                })
            })

            setRooms(roomDocs)
        }, (error) => {
            console.error('Floor Context Error', error)
        })

        return () => {
            //Snapshots
            fetchFloorSnapshots()
            fetchRoomSnapshots()
            setLoad(false)
        }
    }, [user])

    const value = {
        rooms,
        floors,
        addRoom,
        deleteRoom,
        updateRoom,
        getRooms,
        getRoomFloor,
        getFloorSortedByLevel,
        getClassrooms,
        getOffices,
        getRoom,
        load,
        setLoad,
    }

    return (
        <RoomContext.Provider value={value}>
            { children }
        </RoomContext.Provider>
    )
}