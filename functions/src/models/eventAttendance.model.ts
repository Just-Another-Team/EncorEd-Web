import { QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export default interface IEventAttendance {
    id?: string;
    eventSchedId: string;
    attendeeId: string;
    status: string;
    submittedDate: Date | string;
    //verifiedBy?
    remarks: string;
}