import IRoom from "./IRoom";
import IUser from "./IUser";

export interface IKioskLog {
    KILG_ID?: string;
    KILG_TYPE: "Search" | "Navigate"
    KILG_DATE: Date | string
    USER_ID: IUser | string | null;
    ROOM_ID: IRoom | string | null;
    KILG_ISREAD?: boolean
}