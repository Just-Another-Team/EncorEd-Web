import { createContext, Dispatch, useEffect, useState } from "react";
import IAttendance from "../data/IAttendance";
import IUser from "../data/IUser";
import { collection } from "firebase/firestore";
import { db, onSnapshot } from "../app/firebase/config";
import { converter } from "../types/converter";
import ISubject from "../data/ISubject";
import dayjs from "dayjs";
import { AttendanceStatus } from "../data/AttendanceStatus";
import { AttendanceSubmissionDate } from "../data/AttendanceSubmissionDate";
import { useSubject } from "../hooks/useSubject";
import { useAuth } from "../hooks/useAuth";
import { useUsers } from "../hooks/useUsers";

type AttendanceContextType = {
    attendances: Array<IAttendance>;
    getRecentAttendances: (userId: string) => IAttendance[] | undefined;
    getAttendancesByReduction: (attdArray: Array<IAttendance>) => Array<IAttendance>;
    getAttendancesByCurrentDay: () => Array<IAttendance>;
    getAttendances: () => IAttendance[];
    getCompleteAttendancesByCreator: (userCreatorId: string) => Array<IAttendance>
    getAttendancesBySubjectId: (subId: string) => Array<IAttendance>
    getAttendancesByInstructor: (instructorId: string) => Array<IAttendance>
    load: boolean;
    setLoad: Dispatch<React.SetStateAction<boolean>>
}

export const AttendanceContext = createContext<AttendanceContextType>({} as AttendanceContextType);


type AttendanceProviderType = {
    children: React.ReactNode;
}

export const AttendanceProvider = ({ children }: AttendanceProviderType) => {
    const { user } = useAuth()
    const { users } = useUsers()
    const { getSubjects } = useSubject()

    const [attendances, setAttendances] = useState<Array<IAttendance>>([]);
    const [load, setLoad] = useState<boolean>(true);

    const attendanceCollection = collection(db, '/Attendances/').withConverter(converter<IAttendance>())

    const getRecentAttendances = (userId: string) => {
        return attendances?.filter(attendance => (attendance.USER_ID as IUser).USER_ID === userId)
    }

    const getAttendancesByReduction = (attdArray: Array<IAttendance>) => {
        return attdArray.reduce((prev, curr, ind, _) => {
            //If one of the PREVIOUS ATTENDANCES and current attendance are the same subject and in the same day submitted
            const prevAttd = prev.find(attd => {
                const prevAttdSubDay = dayjs(attd.ATTD_SUBMISSIONDATE as string)
                const currAttdSubDay = dayjs(curr.ATTD_SUBMISSIONDATE as string)

                const prevAttdSubj = typeof attd.SUB_ID === "object" ? (attd.SUB_ID as ISubject).SUB_ID : attd.SUB_ID as string
                const currAttdSubj = typeof curr.SUB_ID === "object" ? (curr.SUB_ID as ISubject).SUB_ID : curr.SUB_ID as string

                return currAttdSubj === prevAttdSubj && currAttdSubDay.isSame(prevAttdSubDay, 'day')
            })

            // If there is no current attendance, then push the current attendance to the array
            if (prevAttd === undefined) {
                prev.push({
                    ...curr,
                    //ATTD_TEACHERSTATUS: "Incomplete"
                })
                return prev
            }

            const mergedAttendance: IAttendance = {
                ...prevAttd,
                ...curr,
                ATTD_TEACHERSTATUS: AttendanceStatus(prevAttd.ATTD_TEACHERSTATUS as string, curr.ATTD_TEACHERSTATUS as string),
                ATTD_SUBMISSIONDATE: {
                    firstSubmission: prevAttd.ATTD_SUBMISSIONDATE,
                    lastSubmission: curr.ATTD_SUBMISSIONDATE,
                } as AttendanceSubmissionDate,
            }

            // The mergedAttendance is duplicated from the previousAttendance
            // Replace or erase the previousAttendance with the mergedAttendance

            const newArray = prev.filter(pAttd => pAttd.ATTD_ID !== prevAttd.ATTD_ID)
            newArray.push(mergedAttendance)

            return newArray
        }, [] as Array<IAttendance>)
    }

    const getAttendancesByCurrentDay = () => {
        const currentAttendances = getAttendancesByReduction(attendances).filter((attendance) => {
            const currDay = dayjs()
            return dayjs((attendance.ATTD_SUBMISSIONDATE as AttendanceSubmissionDate).lastSubmission ? (attendance.ATTD_SUBMISSIONDATE as AttendanceSubmissionDate).lastSubmission as string : attendance.ATTD_SUBMISSIONDATE as string).isSame(currDay, 'day')
        })

        return currentAttendances
    }

    const getAttendances = () => {
        return attendances.map((attendance): IAttendance => {
            const user = users.find(user => user.USER_ID === attendance.USER_ID)
            const subject = getSubjects().find(subject => subject.SUB_ID === attendance.SUB_ID)

            return ({
                ...attendance,
                USER_ID: user ? user : null,
                SUB_ID: subject ? subject : null,
            })
        })
    }

    const getAttendancesByInstructor = (instructorId: string) => {
        return getAttendances().filter(attendance => {
            return (attendance.SUB_ID as ISubject).USER_ID !== null && ((attendance.SUB_ID as ISubject).USER_ID as IUser).USER_ID === instructorId
        })
    }

    const getAttendancesBySubjectId = (subId: string) => {
        return getAttendances().filter(attendance => (attendance.SUB_ID as ISubject).SUB_ID === subId)
    }

    const getCompleteAttendancesByCreator = (userCreatorId: string): Array<IAttendance> => {
        return getAttendancesByReduction(getAttendances().filter(attendance => (attendance.USER_ID as IUser).USER_CREATEDBY === userCreatorId)).map((attendance) => {
            return ({
                ...attendance as IAttendance,
                ATTD_SUBMISSIONDATE: typeof attendance.ATTD_SUBMISSIONDATE === "string" ? attendance.ATTD_SUBMISSIONDATE : (attendance.ATTD_SUBMISSIONDATE as AttendanceSubmissionDate).lastSubmission,
            })
        })
    }

    useEffect(() => {
        const fetchAttendancesSnapshot = onSnapshot(attendanceCollection, (snapshot) => {
            const attendanceDocs = snapshot.docs.map((attendance): IAttendance => {
                const attendanceData = attendance.data()

                return ({
                    ATTD_ID: attendance.id,
                    ...attendanceData,
                })
            })

            attendanceDocs.sort((prevDate, currDate) => dayjs(prevDate.ATTD_SUBMISSIONDATE as string).isAfter(dayjs(currDate.ATTD_SUBMISSIONDATE as string)) ? 1 : -1)

            setAttendances(attendanceDocs)
        }, (error) => {
            console.error('Attendance Context Error', error)
        })

        return () => {
            fetchAttendancesSnapshot()
            setLoad(false)
        }
    }, [user])

    const value = {
        attendances,
        getRecentAttendances,
        getAttendancesByReduction,
        getAttendancesByCurrentDay,
        getAttendances,
        getCompleteAttendancesByCreator,
        getAttendancesBySubjectId,
        getAttendancesByInstructor,
        setLoad,
        load
    }

    return (
        <AttendanceContext.Provider value={value}>
            { children }
        </AttendanceContext.Provider>
    )
}