export default interface ISchedule {
    SCHED_ID?: string;
    SCHED_STARTTIME: Date | string;
    SCHED_ENDTIME: Date | string;
    SCHED_WEEKASSIGNED: Array<string>
}
