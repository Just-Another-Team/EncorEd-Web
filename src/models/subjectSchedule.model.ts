export default interface ISubjectSchedule {
    id?: string;
    subId: string;
    roomId: string;
    assignedWeek: Array<string>;
    startTime: Date | string;
    endTime: Date | string;
    createdBy: string;
    verifiedBy: string;
    status: string;
}