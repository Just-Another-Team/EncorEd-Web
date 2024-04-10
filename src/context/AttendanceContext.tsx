import { createContext, Dispatch, useEffect, useState } from "react";
import IAttendance from "../data/IAttendance";
import IUser from "../data/IUser";
import { collection, query } from "firebase/firestore";
import { db, onSnapshot } from "../app/firebase/config";
import { converter } from "../types/converter";
import userService from "../app/api/user-service";
import subjectService from "../app/api/subject-service";
import ISubject from "../data/ISubject";
import dayjs from "dayjs";
import { AttendanceStatus } from "../data/AttendanceStatus";
import { AttendanceSubmissionDate } from "../data/AttendanceSubmissionDate";

type AttendanceContextType = {
    attendances: Array<IAttendance> | null | undefined;
    getRecentAttendances: (userId: string) => IAttendance[] | undefined;
    getAttendancesByReduction: () => Array<IAttendance>
    load: boolean;
    setLoad: Dispatch<React.SetStateAction<boolean>>
}

export const AttendanceContext = createContext<AttendanceContextType>({} as AttendanceContextType);

type AttendanceProviderType = {
    children: React.ReactNode;
}

export const AttendanceProvider = ({ children }: AttendanceProviderType) => {
    const [attendances, setAttendances] = useState<Array<IAttendance>>([]);
    const [load, setLoad] = useState<boolean>(true);

    const getRecentAttendances = (userId: string) => {
        return attendances?.filter(attendance => (attendance.USER_ID as IUser).USER_ID === userId)
    }

    //reduce attendances
    const getAttendancesByReduction = () => {
        const reduceAttendances = attendances.reduce((prev, curr, ind, _) => {
            const previousAttendanceArray = prev as Array<IAttendance>
            const currentAttendance = curr as IAttendance

            //If one of the PREVIOUS ATTENDANCES and current attendance are the same subject and in the same day submitted
            //Sort by date
            const previousAttendance = previousAttendanceArray.find(prevAttd => {
                const previousAttendanceSubmissionDay = dayjs(prevAttd.ATTD_SUBMISSIONDATE as string)
                const currentAttendanceSubmissionDay = dayjs(currentAttendance.ATTD_SUBMISSIONDATE as string)

                const previousAttendanceSubject = prevAttd.SUB_ID as ISubject
                const currentAttendanceSubject = currentAttendance.SUB_ID as ISubject

                return currentAttendanceSubject.SUB_ID === previousAttendanceSubject.SUB_ID && currentAttendanceSubmissionDay.isSame(previousAttendanceSubmissionDay, 'day')
            })

            // If there is no current attendance, then
            if (previousAttendance === undefined) {
                prev.push(curr)
                return prev
            }

            const mergedAttendance: IAttendance = {
                ...previousAttendance,
                ...currentAttendance,
                ATTD_TEACHERSTATUS: AttendanceStatus(previousAttendance.ATTD_TEACHERSTATUS as string, currentAttendance.ATTD_TEACHERSTATUS as string),
                ATTD_SUBMISSIONDATE: {
                    firstSubmission: previousAttendance.ATTD_SUBMISSIONDATE,
                    lastSubmission: currentAttendance.ATTD_SUBMISSIONDATE,
                } as AttendanceSubmissionDate
            }

            // The mergedAttendance is duplicated from the previousAttendance
            // Replace or erase the previousAttendance with the mergedAttendance

            const newArray = previousAttendanceArray.filter(prevAttd => prevAttd.ATTD_ID !== previousAttendance.ATTD_ID)
            newArray.push(mergedAttendance)

            return newArray
        }, [] as Array<IAttendance>)

        return reduceAttendances
    }

    const attendanceCollection = query(collection(db, '/Attendances/').withConverter(converter<IAttendance>()))

    useEffect(() => {
        const fetchAttendancesSnapshot = onSnapshot(attendanceCollection, async (snapshot) => {
            const attendanceDocs = snapshot.docs.map(async (attendance): Promise<IAttendance> => {

                const user = await userService.getUser(attendance.data().USER_ID as string)
                const subject = await subjectService.view(attendance.data().SUB_ID as string)

                return ({
                    ATTD_ID: attendance.id,
                    ...attendance.data() as IAttendance,
                    USER_ID: user.data as IUser,
                    SUB_ID: subject.data as ISubject,
                })
            })

            const attendancesArray = await Promise.all(attendanceDocs)
            attendancesArray.sort((prevDate, currDate) => dayjs(prevDate.ATTD_SUBMISSIONDATE as string).isAfter(dayjs(currDate.ATTD_SUBMISSIONDATE as string)) ? 1 : -1)

            setAttendances(attendancesArray)
        }, (error) => {
            console.error('Attendance Context Error', error)
        })

        // const fetchAttendances = async () => {
        //     const attendanceResponse =  await attendanceService.viewAttendances();
        //     const attendanceData = attendanceResponse.data

        //     setAttendances(attendanceData)
        //     setLoad(false)
        // }


        return () => {
            fetchAttendancesSnapshot()
            setLoad(false)
        }
    }, [load])

    const value = {
        attendances,
        getRecentAttendances,
        getAttendancesByReduction,
        setLoad,
        load
    }

    return (
        <AttendanceContext.Provider value={value}>
            { children }
        </AttendanceContext.Provider>
    )
}