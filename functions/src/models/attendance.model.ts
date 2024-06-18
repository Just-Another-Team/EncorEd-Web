import { DocumentReference, FieldValue } from "firebase-admin/firestore";
import ISubject from "./subject.model";
import IRoom from "./room.model";
import IUser from "./user.model";

export type AttendanceSubmissionDate = {
    firstSubmission: Date | string,
    lastSubmission: Date | string
}

export default interface IAttendance {
    ATTD_ID?: string | null;
    ATTD_SCANDATE?: Date | string | null;
    ATTD_SUBMISSIONDATE?: Date | string | AttendanceSubmissionDate | null;
    ATTD_COMMENT?: string | null;
    SUB_ID: ISubject | string;
    ROOM_ID: IRoom | string;
    USER_ID: IUser | string;
    ATTD_TEACHERSTATUS: string;
    ATTD_STATUS: string | null;
    ATTD_TARGETTEACHER?: string | null
}