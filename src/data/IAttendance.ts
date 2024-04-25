import { AttendanceSubmissionDate } from "./AttendanceSubmissionDate";
import IRoom from "./IRoom";
import ISubject from "./ISubject";
import IUser from "./IUser";

export default interface IAttendance {
    ATTD_ID?: string | null;
    ATTD_SCANDATE: Date | string | null;
    ATTD_SUBMISSIONDATE: Date | string | AttendanceSubmissionDate | null;
    ATTD_COMMENT?: string | null;
    SUB_ID: ISubject | string | null;
    ROOM_ID: IRoom | string | null;
    USER_ID: IUser | string | null;
    ATTD_TEACHERSTATUS: string | null;
    ATTD_STATUS: string | null;
}