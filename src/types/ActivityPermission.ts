import { VerificationPermission } from "./VerificationPermission";

export type ActivityPermission = {
    value: boolean | undefined;
    schedule: boolean | undefined;
    participants: boolean | undefined;
    attendance: boolean | undefined;
    verify: VerificationPermission | undefined;
}