import { DocumentReference } from "firebase-admin/firestore";
import ISubject from "./subject.model";
import IRoom from "./room.model";
import IUser from "./user.model";

export default interface IAttendance {
    ATTD_ID?: string;
    ATTD_SCANDATE: Date | string;
    ATTD_SUBMISSIONDATE: Date | string;
    SUB_ID: DocumentReference | ISubject | string;
    ROOM_ID: DocumentReference | IRoom | string;
    USER_ID: DocumentReference | IUser | string;
    ATTD_TEACHERSTATUS: string;
    ATTD_STATUS: string;
}