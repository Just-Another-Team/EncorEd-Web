import IAttendance from "./IAttendance";
import { IKioskLog } from "./IKioskLog";

export interface INotification {
    NOTF_ID?: string;
    NOTF_DESCRIPTION?: string;
    NOTF_TYPE: "Attendance" | "Kiosk";
    NOTF_DATA: IAttendance | IKioskLog;
    NOTF_DATE: Date | string
    NOTF_ISREAD: boolean;
}