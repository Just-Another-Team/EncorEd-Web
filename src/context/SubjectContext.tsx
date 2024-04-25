import { createContext, useEffect, useState } from "react";
import subjectService from "../app/api/subject-service";
import ISubject from "../data/ISubject";
import IRoom from "../data/IRoom";
import { QRCodeType } from "../types/QRCodeType";
import { AxiosResponse } from "axios";
import ISchedule from "../data/ISchedule";
import dayjs from "dayjs";
import { collection, onSnapshot } from "firebase/firestore";
import { converter } from "../types/converter";
import { db } from "../app/firebase/config";
import { useAuth } from "../hooks/useAuth";
import { useUsers } from "../hooks/useUsers";

type SubjectContextType = {
    subjects: Array<ISubject>
    load: boolean,
    addSubject: (data: ISubject) => Promise<AxiosResponse<any, any>>
    updateSubject: (data: ISubject) => Promise<AxiosResponse<any, any>>
    deleteSubject: (subId: string) => Promise<AxiosResponse<any, any>>
    setLoad: React.Dispatch<React.SetStateAction<boolean>>;
    getSubjects: () => Array<ISubject>
    getOngoingSubjects: (currentTime: string) => Array<ISubject>
    getSubjectsByRoom: (roomId: string) => Array<ISubject>;
    assignSubjectToRoom: (data: QRCodeType) => Promise<AxiosResponse<any, any>>;
}

export const SubjectContext = createContext<SubjectContextType>({} as SubjectContextType);

type SubjectProviderType = {
    children: React.ReactNode;
}

export const SubjectProvider = ({ children }: SubjectProviderType) => {
    const { user } = useAuth()
    const { users } = useUsers()

    const [subjects, setSubjects] = useState<Array<ISubject>>([]);
    const [schedules, setSchedules] = useState<Array<ISchedule>>([]);
    const [load, setLoad] = useState<boolean>(true);

    const assignSubjectToRoom = (data: QRCodeType) => {
        return subjectService.assignRoom(data)
    }

    const addSubject = (data: ISubject) => {
        setLoad(true)
        return subjectService.add(data)
    }

    const updateSubject = (data: ISubject) => {
        setLoad(true)
        return subjectService.update(data)
    }

    const deleteSubject = (subId: string) => {
        setLoad(true)
        return subjectService.deleteSubject(subId)
    }

    const getSubjects = (): Array<ISubject> => {
        return subjects.map(subject => {
            const schedule = schedules.find(schedule => schedule.SCHED_ID === subject.SCHED_ID)
            const user = users.find(user => user.USER_ID === subject.USER_ID)
            return ({
                ...subject,
                SCHED_ID: schedule ? schedule : null,
                USER_ID: user ? user : null,
            })
        })
    }
    
    const getOngoingSubjects = (currentTime: string) => {
        return getSubjects().filter((subject) => {
            const schedule = subject.SCHED_ID as ISchedule

            const currentTimeFormat = dayjs(currentTime).format("HH:mm:ss")
            const startTimeFormat = dayjs(schedule.SCHED_STARTTIME).format("HH:mm:ss")
            const endTimeFormat = dayjs(schedule.SCHED_ENDTIME).format("HH:mm:ss")

            const currentTimeVal = dayjs(`2001-01-01 ${currentTimeFormat}`)
            const startTime = dayjs(`2001-01-01 ${startTimeFormat}`)
            const endTime = dayjs(`2001-01-01 ${endTimeFormat}`)

            return schedule.SCHED_WEEKASSIGNED.find((week) => week.toLowerCase() === dayjs(currentTime).format("dddd").toLowerCase()) && (currentTimeVal.isAfter(startTime) && currentTimeVal.isBefore(endTime))
        })
    }

    const getSubjectsByRoom = (roomId: string) => {
        return getSubjects().filter(subject => subject.ROOM_ID !== null ? subject.ROOM_ID === roomId : false)
    }

    const subjectCollection = collection(db, '/Subject/').withConverter(converter<ISubject>())
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

        const fetchSubjectSnapshot = onSnapshot(subjectCollection, (snapshot) => {
            const scheduleDocs = snapshot.docs.map((subject):ISubject => {
                return({
                    SUB_ID: subject.id,
                    ...subject.data(),
                })
            })

            setSubjects(scheduleDocs)
        }, (error) => {
            console.error('Schedule Context Error', error)
        })

        return () => {
            fetchScheduleSnapshot()
            fetchSubjectSnapshot()

            setLoad(false)
        }
    }, [user])

    const value = {
        subjects,
        load,
        addSubject,
        updateSubject,
        deleteSubject,
        setLoad,
        getSubjectsByRoom,
        getOngoingSubjects,
        getSubjects,
        assignSubjectToRoom
    }

    return (
        <SubjectContext.Provider value={value}>
            { children }
        </SubjectContext.Provider>
    )
}