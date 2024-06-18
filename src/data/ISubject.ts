import IRoom from "./IRoom";
import ISchedule from "./ISchedule";
import IUser from "./IUser";

export default interface ISubject {
    SUB_ID?: string;
    SUB_EDP_CODE: number | string | null | undefined;
    SUB_CODE: string | null;
    SUB_DESCRIPTION: string | null;
    SCHED_ID?: ISchedule | string | null;
    USER_ID?: IUser | string | null;
    ROOM_ID?: IRoom | string | null;
    SUB_STATUS?: string
    SUB_CREATEDBY?: string
    SUB_UPDATEDBY?: string

    SUB_ISDELETED?: boolean
}