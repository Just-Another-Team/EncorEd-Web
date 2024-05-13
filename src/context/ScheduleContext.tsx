import { createContext, useEffect, useState } from "react";
import ISchedule from "../data/ISchedule";
import { collection, onSnapshot } from "firebase/firestore";
import { converter } from "../types/converter";
import { db } from "../app/firebase/config";
import { useAuth } from "../hooks/useAuth";

type ScheduleContextType = {
    schedules: Array<ISchedule>;
    getSchedule: (schedId: string | undefined) => ISchedule | undefined 
}

export const ScheduleContext = createContext<ScheduleContextType>({} as ScheduleContextType);

type ScheduleProviderType = {
    children: React.ReactNode;
}

export const ScheduleProvider = ({
    children
}: ScheduleProviderType) => {
    const { user } = useAuth()

    const [schedules, setSchedules] = useState<Array<ISchedule>>([]);
    const [load, setLoad] = useState<boolean>(true);

    const getSchedule = (schedId: string | undefined) => {
        return schedules.find(sched => sched.SCHED_ID === schedId)
    }

    const scheduleCollection = collection(db, '/Schedule/').withConverter(converter<ISchedule>())

    useEffect(() => {
        const fetchScheduleSnapshot = onSnapshot(scheduleCollection, (snapshot) => {
            const scheduleDocs = snapshot.docs.map((schedule):ISchedule => {
                return({
                    ...schedule.data(),
                    SCHED_ID: schedule.id,
                })
            })

            setSchedules(scheduleDocs)
        }, (error) => {
            console.error('Schedule Context Error', error)
        })

        return () => {
            fetchScheduleSnapshot()
            setLoad(false)
        }
    }, [user])

    const value = {
        schedules,
        getSchedule
    }

    return (
        <ScheduleContext.Provider value={value}>
            { children }
        </ScheduleContext.Provider>
    )
}

export default ScheduleProvider