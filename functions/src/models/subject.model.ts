import { DocumentReference } from "firebase-admin/firestore";
import ISchedule from "./schedule.model";
import IUser from "./user.model";
import IRoom from "./room.model";

export default interface ISubject {
    SUB_ID?: string;
    SUB_CODE: string;
    SUB_DESCRIPTION: string;
    SCHED_ID?: ISchedule | string | null;
    USER_ID?: IUser | string | null;
    ROOM_ID?: IRoom | string | null;
    SUB_ISDELETED?: boolean
    SUB_CREATEDBY?: string
    SUB_UPDATEDBY: string
}