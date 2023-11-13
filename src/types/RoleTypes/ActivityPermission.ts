import { AttendancePermissions } from "./AttendancePermission";
import { VerificationPermission } from "./VerificationPermission";

export type ActivityPermission = {
    value: boolean | undefined;
    schedule: boolean | undefined;
    participants: boolean | undefined;
    attendance: AttendancePermissions | undefined;
    verify: VerificationPermission | undefined;
}