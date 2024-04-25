import IAttendance from "./attendance.model";
import { IKioskLog } from "./kioskLog.model";

export interface INotification {
    NOTF_ID?: string;
    NOTF_TYPE: "Attendance" | "Kiosk";
    NOTF_DATA: IAttendance | IKioskLog;
    NOTF_ISREAD: boolean;
    NOTF_DATE: Date | string;
    //Submitted by
}