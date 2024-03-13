import IFloor from "./IFloor";

export default interface IRoom {
    ROOM_ID?: string;
    ROOM_NAME: string;
    FLR_ID: IFloor;
}
