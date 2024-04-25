import { DocumentReference } from "firebase-admin/firestore";
import ISubject from "./subject.model";
import IRoom from "./room.model";
import IUser from "./user.model";

export type AttendanceSubmissionDate = {
    firstSubmission: Date | string,
    lastSubmission: Date | string
}

export default interface IAttendance {
    ATTD_ID?: string;
    ATTD_SCANDATE: Date | string;
    ATTD_SUBMISSIONDATE: Date | string | AttendanceSubmissionDate;
    SUB_ID: ISubject | string;
    ROOM_ID: IRoom | string;
    USER_ID: IUser | string;
    ATTD_TEACHERSTATUS: string;
    ATTD_STATUS: string;
}