import { ActivityPermission } from "./activityPermission.model.type";
import { VerificationPermission } from "./verificationPermission.model.type";

export type Permission = {
    viewMap: boolean | undefined;
    addMap: boolean | undefined;
    editMap: boolean | undefined;
    deleteMap: boolean | undefined;
    unlockMap: boolean | undefined;

    viewSubject: ActivityPermission | undefined;
    addSubject: ActivityPermission | undefined;
    editSubject: ActivityPermission | undefined;
    deleteSubject: ActivityPermission | undefined;

    viewEvent: ActivityPermission | undefined;
    addEvent: ActivityPermission | undefined;
    editEvent: ActivityPermission | undefined;
    deleteEvent: ActivityPermission | undefined;

    viewUser: boolean | undefined;
    addUser: boolean | undefined;
    editUser: boolean | undefined;
    deleteUser: boolean | undefined;
    verifyUser: VerificationPermission | undefined; //Verify Object
        // value: | undefined boolean,
        // by: | undefined userId

    viewGroup: boolean | undefined;
    addGroup: boolean | undefined;
    editGroup: boolean | undefined;
    deleteGroup: boolean | undefined;
    verifyGroup: VerificationPermission | undefined;

    viewRole: boolean | undefined;
    addRole: boolean | undefined;
    editRole: boolean | undefined;
    deleteRole: boolean | undefined;
    verifyRole: VerificationPermission | undefined; //Verify Object
        // value: | undefined boolean,
        // by: | undefined userId

    viewInstitution: boolean | undefined;
} | undefined