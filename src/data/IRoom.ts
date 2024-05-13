import IFloor from "./IFloor";
import ISchedule from "./ISchedule";
import ISubject from "./ISubject";
import { RoomType } from "./RoomType";

export default interface IRoom {
    ROOM_ID?: string;
    ROOM_NAME: string;
    FLR_ID: IFloor | string | null;

    SCHED_ID?: string | ISchedule | null
    OLD_SCHED_ID?: string | ISchedule | null

    ROOM_TYPE?: RoomType | null
    ROOM_REMARKS?: string
    ROOM_ISDELETED?: boolean

    SUB_ID?: ISubject;
    SUBJECTS?: Array<ISubject>
}
