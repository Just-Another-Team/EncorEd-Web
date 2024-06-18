import IFloor from "./floor.model";
import ISubject from "./subject.model";
import ISchedule from "./schedule.model";

export default interface IRoom {
    ROOM_ID?: string;
    ROOM_NAME?: string;
    FLR_ID?: IFloor | string;

    SCHED_ID?: string | ISchedule | null
    OLD_SCHED_ID?: string | ISchedule | null
    
    ROOM_TYPE?: string
    ROOM_REMARKS?: string | null
    ROOM_ISDELETED?: boolean

    SUB_ID?: ISubject | string;
    SUBJECTS?: Array<ISubject>;
}
