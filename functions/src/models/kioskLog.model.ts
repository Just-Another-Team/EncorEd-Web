export interface IKioskLog {
    KILG_ID?: string;
    KILG_TYPE: "Search" | "Navigate"
    KILG_DATE: Date | string
    USER_ID: string;
    ROOM_ID: string;
    KILG_ISREAD: boolean
}