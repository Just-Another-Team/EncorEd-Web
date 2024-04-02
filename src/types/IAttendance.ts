import IRoom from "./IRoom";
import ISubject from "./ISubject";
import IUser from "./IUser";

export default interface IAttendance {
    ATTD_ID?: string | null;
    ATTD_SCANDATE: Date | string | null;
    ATTD_SUBMISSIONDATE: Date | string | null;
    ATTD_COMMENT?: string | null;
    SUB_ID: ISubject | string;
    ROOM_ID: IRoom | string;
    USER_ID: IUser | string;
    ATTD_TEACHERSTATUS: string | null;
    ATTD_STATUS: string | null;
}