import { useContext } from "react";
import { ScheduleContext } from "../context/ScheduleContext";

export const useSchedules = () => {
    return useContext(ScheduleContext)
}