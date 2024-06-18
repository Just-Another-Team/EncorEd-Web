import ISubject from "../data/ISubject";

export type QRCodeType = {
    ROOM_ID: string | null;
    SUB_ID: Array<ISubject> | string | null;
}