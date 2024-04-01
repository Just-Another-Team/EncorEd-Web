import { createContext, useEffect, useState } from "react";
import IAttendance from "../types/IAttendance";
import attendanceService from "../app/api/attendance-service";
import IUser from "../types/IUser";

type AttendanceContextType = {
    attendances: Array<IAttendance> | null | undefined;
    getRecentAttendances: (userId: string) => IAttendance[] | undefined;
    load: boolean;
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

    useEffect(() => {
        const fetchAttendances = async () => {
            let attendanceResponse =  await attendanceService.viewAttendances();
            let attendanceData = attendanceResponse.data

            setAttendances(attendanceData)
            setLoad(false)
        } 

        fetchAttendances()
    }, [])

    const value = {
        attendances,
        getRecentAttendances,
        load
    }

    return (
        <AttendanceContext.Provider value={value}>
            { children }
        </AttendanceContext.Provider>
    )
}