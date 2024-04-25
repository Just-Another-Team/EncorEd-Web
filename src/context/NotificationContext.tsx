import { createContext, Dispatch, useEffect, useState } from "react";
import { INotification } from "../data/INotification";
import { collection, doc, onSnapshot, query, writeBatch } from "firebase/firestore";
import { db } from "../app/firebase/config";
import { converter } from "../types/converter";
import { useAuth } from "../hooks/useAuth";
import Attendances from "../pages/Attendances";
import { useUsers } from "../hooks/useUsers";
import { useSubject } from "../hooks/useSubject";
import { useRooms } from "../hooks/useRooms";
import IAttendance from "../data/IAttendance";
import dayjs from "dayjs";

type NotificationContextType = {
    notifications: Array<INotification>;
    unReadNotifications: () => Array<INotification>
    setToRead: () => Promise<void>
    getAttendanceNotifications: () => INotification[]
    load: boolean;
    setLoad: Dispatch<React.SetStateAction<boolean>>
}

export const NotificationContext = createContext<NotificationContextType>({} as NotificationContextType);

type NotificationProviderType = {
    children: React.ReactNode;
}

export const NotificationProvider = ({ children }: NotificationProviderType) => {
    const { user } = useAuth()
    const { users } = useUsers()
    const { getSubjects } = useSubject()
    const { rooms } = useRooms()

    const [notifications, setNotifications] = useState<Array<INotification>>([]);
    const [load, setLoad] = useState<boolean>(true);

    const notificationCollection = query(collection(db, '/Notifications/').withConverter(converter<INotification>()))

    const setToRead = async () => {
        const batch = writeBatch(db)
        const readNotifications = notifications.map((notification) => {
            const notifRef = doc(db, 'Notifications', notification.NOTF_ID as string)
            batch.update(notifRef, { NOTF_ISREAD: true })

            return ({
                ...notification,
                NOTF_ISREAD: true
            })
        })
        setNotifications(readNotifications)
        await batch.commit()
    }

    const unReadNotifications = () => {
        return notifications.filter(notification => !notification.NOTF_ISREAD)
    }

    const getAttendanceNotifications = () => {
        return notifications.filter(notif => notif.NOTF_TYPE === "Attendance").map((notif): INotification => {

            const user = users.find(user => user.USER_ID === (notif.NOTF_DATA as IAttendance).USER_ID)
            const subject = getSubjects().find(subject => subject.SUB_ID === (notif.NOTF_DATA as IAttendance).SUB_ID)
            const room = rooms.find(room => room.ROOM_ID === (notif.NOTF_DATA as IAttendance).ROOM_ID)

            return ({
                ...notif,
                NOTF_DATA: {
                    ...notif.NOTF_DATA as IAttendance,
                    USER_ID: user ? user : null,
                    SUB_ID: subject ? subject : null,
                    ROOM_ID: room ? room : null
                } as IAttendance
            })
        })
    }

    useEffect(() => {
        const fetchNotificationsSnapshot = onSnapshot(notificationCollection, (snapshot) => {

            const notificationDocs = snapshot.docs.map((notification): INotification => {
                return ({
                    NOTF_ID: notification.id,
                    ...notification.data() as INotification
                })
            })

            // notificationDocs.sort((prevDate, currDate) => dayjs(prevDate.NOTF_DATE as string).isAfter(dayjs(currDate.NOTF_DATE as string)) ? 1 : -1)

            setNotifications(notificationDocs)
        }, (error) => {
            console.error('Attendance Context Error', error)
        })

        return () => {
            fetchNotificationsSnapshot()
            setLoad(false)
        }
    }, [user])

    const value = {
        notifications,
        setLoad,
        unReadNotifications,
        setToRead,
        getAttendanceNotifications,
        load
    }

    return (
        <NotificationContext.Provider value={value}>
            { children }
        </NotificationContext.Provider>
    )

}