import { Dayjs } from "dayjs";

export default interface ISchedule {
    SCHED_ID?: string;
    SCHED_STARTTIME: Date | Dayjs | string;
    SCHED_ENDTIME: Date | Dayjs | string;
    SCHED_WEEKASSIGNED: Array<string>
}