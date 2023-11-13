import { VerificationPermission } from "./VerificationPermission";

export type AttendancePermissions = {
    value: boolean | undefined,
    verifyAttendance: VerificationPermission | undefined,
}