import { VerificationPermission } from "./verificationPermission.model.type";

export type AttendancePermissions = {
    value: boolean | undefined,
    verifyAttendance: VerificationPermission | undefined,
}