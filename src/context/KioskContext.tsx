import { createContext, Dispatch, useEffect, useState } from "react";
import { collection } from "firebase/firestore";
import { db, onSnapshot } from "../app/firebase/config";
import { converter } from "../types/converter";
import dayjs from "dayjs";
import { useAuth } from "../hooks/useAuth";
import { useUsers } from "../hooks/useUsers";
import { IKioskLog } from "../data/IKioskLog";
import { useRooms } from "../hooks/useRooms";

type KioskLogContextType = {
    logs: Array<IKioskLog>;
    getKioskLogs: (kioskUserId: string) => Array<IKioskLog>
    load: boolean;
    setLoad: Dispatch<React.SetStateAction<boolean>>
}

export const KioskLogContext = createContext<KioskLogContextType>({} as KioskLogContextType);


type KioskLogProviderType = {
    children: React.ReactNode;
}

export const KioskLogProvider = ({ children }: KioskLogProviderType) => {
    const { user } = useAuth()
    const { getKiosks } = useUsers()
    const { rooms } = useRooms()

    const [logs, setLogs] = useState<Array<IKioskLog>>([]);
    const [load, setLoad] = useState<boolean>(true);

    const kioskLogCollection = collection(db, '/KioskLog/').withConverter(converter<IKioskLog>())

    const getKioskLogs = (kioskUserId: string) => {
        return logs.filter(kiosk => kiosk.USER_ID === kioskUserId).map((kiosk): IKioskLog => {

            const kioskUser = getKiosks().find(userKiosk => userKiosk.USER_ID === kiosk.USER_ID )
            const room = rooms.find(room => room.ROOM_ID === kiosk.ROOM_ID)

            return ({
                ...kiosk,
                USER_ID: kioskUser ? kioskUser : null,
                ROOM_ID: room ? room : null
            })
        })
    }

    useEffect(() => {
        const fetchKioskLogsSnapshot = onSnapshot(kioskLogCollection, (snapshot) => {
            const kioskLogDocs = snapshot.docs.map((kioskLog): IKioskLog => {
                return {
                    KILG_ID: kioskLog.id,
                    ...kioskLog.data()
                }
            })

            kioskLogDocs.sort((prevDate, currDate) => dayjs(prevDate.KILG_DATE as string).isAfter(dayjs(currDate.KILG_DATE as string)) ? 1 : -1)

            setLogs(kioskLogDocs)
        }, (error) => {
            console.error('KioskLog Context Error', error)
        })

        return () => {
            fetchKioskLogsSnapshot()
            setLoad(false)
        }
    }, [user])

    const value = {
        logs,
        setLoad,
        getKioskLogs,
        load
    }

    return (
        <KioskLogContext.Provider value={value}>
            { children }
        </KioskLogContext.Provider>
    )
}