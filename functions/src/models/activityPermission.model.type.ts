import { AttendancePermissions } from "./attendancePermission.model.type";
import { VerificationPermission } from "./verificationPermission.model.type";

export type ActivityPermission = {
    value: boolean | undefined;
    schedule: boolean | undefined;
    participants: boolean | undefined;
    attendance: AttendancePermissions | undefined;
    verify: VerificationPermission | undefined;
}