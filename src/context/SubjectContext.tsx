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
import { useSchedules } from "../hooks/useSchedules";
import { dayName } from "../helper/dayName";

type SubjectContextType = {
    subjects: Array<ISubject>
    load: boolean,
    addSubject: (data: ISubject) => Promise<AxiosResponse<any, any>>
    addSubjects: (data: Array<ISubject>) => Promise<AxiosResponse<any, any>>
    updateSubject: (data: ISubject) => Promise<AxiosResponse<any, any>>
    deleteSubject: (subId: string) => Promise<AxiosResponse<any, any>>
    setLoad: React.Dispatch<React.SetStateAction<boolean>>;
    getSubjects: () => Array<ISubject>
    getSubjectsByCreator: (creatorId: string) => Array<ISubject>
    getOngoingSubjects: (currentTime: string) => Array<ISubject>
    getSubjectsByRoom: (roomId: string) => Array<ISubject>;
    assignSubjectToRoom: (data: QRCodeType) => Promise<AxiosResponse<any, any>>;
    assignTeacherToSubject: (data: { SUB_ID: string; USER_ID: string; }) => Promise<AxiosResponse<any, any>>
    getSubject: (subjectId: string) => ISubject | undefined
    getAllSubjects: () => Array<ISubject>
    removeAssignedTeacher: (data: Array<string>) => Promise<AxiosResponse<any, any>>
}

export const SubjectContext = createContext<SubjectContextType>({} as SubjectContextType);

type SubjectProviderType = {
    children: React.ReactNode;
}

export const SubjectProvider = ({ children }: SubjectProviderType) => {
    const { user } = useAuth()
    const { users } = useUsers()
    const { getSchedule } = useSchedules()

    const [subjects, setSubjects] = useState<Array<ISubject>>([]);
    const [load, setLoad] = useState<boolean>(true);

    const assignSubjectToRoom = (data: QRCodeType) => {
        return subjectService.assignRoom(data)
    }

    const addSubject = (data: ISubject) => {
        setLoad(true)
        return subjectService.add(data)
    }

    const addSubjects = (data: Array<ISubject>) => {
        setLoad(true)
        return subjectService.addBatch(data)
    }

    const updateSubject = (data: ISubject) => {
        setLoad(true)
        return subjectService.update(data)
    }

    const deleteSubject = (subId: string) => {
        setLoad(true)
        return subjectService.deleteSubject(subId)
    }

    const assignTeacherToSubject = (data: { SUB_ID: string, USER_ID: string }) => {
        return subjectService.assignInstructor(data)
    }

    const removeAssignedTeacher = (data: Array<string>) => {
        return subjectService.removeAssignInstructor(data)
    }

    const getSubjects = (): Array<ISubject> => {
        return subjects.filter(subject => !subject.SUB_ISDELETED).map(subject => {
            const user = users.find(user => user.USER_ID === subject.USER_ID)
            
            const schedule = getSchedule(subject.SCHED_ID as string)
            schedule?.SCHED_WEEKASSIGNED.sort((a, b) => {
                return dayName[a] - dayName[b]
            })

            return ({
                ...subject,
                SCHED_ID: schedule ? schedule : null,
                USER_ID: user ? user : null,
            })
        })
    }

    const getAllSubjects = (): Array<ISubject> => {
        return subjects.map(subject => {
            const schedule = getSchedule(subject.SCHED_ID as string)
            const user = users.find(user => user.USER_ID === subject.USER_ID)
            return ({
                ...subject,
                SCHED_ID: schedule ? schedule : null,
                USER_ID: user ? user : null,
            })
        })
    }

    const getSubject = (subjectId: string) => {
        return getSubjects().find(subject => subject.SUB_ID === subjectId)
    }

    const getSubjectsByCreator = (creatorId: string): Array<ISubject> => {
        return getSubjects().filter(subject => subject.SUB_CREATEDBY === creatorId)
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

    useEffect(() => {
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
            fetchSubjectSnapshot()

            setLoad(false)
        }
    }, [user])

    const value = {
        subjects,
        load,
        addSubject,
        addSubjects,
        updateSubject,
        deleteSubject,
        setLoad,
        getSubjectsByRoom,
        getOngoingSubjects,
        getSubjects,
        getSubjectsByCreator,
        assignSubjectToRoom,
        assignTeacherToSubject,
        getSubject,
        getAllSubjects,
        removeAssignedTeacher
    }

    return (
        <SubjectContext.Provider value={value}>
            { children }
        </SubjectContext.Provider>
    )
}