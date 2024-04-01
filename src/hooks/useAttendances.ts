import { useContext } from "react";
import { AttendanceContext } from "../context/AttendanceContext";

export const useAttendances = () => {
    return useContext(AttendanceContext)
}