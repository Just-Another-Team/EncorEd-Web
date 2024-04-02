import IFloor from "./IFloor";
import ISubject from "./ISubject";

export default interface IRoom {
    ROOM_ID?: string;
    ROOM_NAME: string;
    FLR_ID: IFloor;

    SUB_ID?: ISubject;
    SUBJECTS?: Array<ISubject>
}
