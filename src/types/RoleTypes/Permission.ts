import { ActivityPermission } from "./ActivityPermission";
import { VerificationPermission } from "./VerificationPermission";

export type Permission = {
    viewMap?: boolean;
    addMap?: boolean;
    editMap?: boolean;
    deleteMap?: boolean;
    unlockMap?: boolean;

    viewSubject?: ActivityPermission;
    addSubject?: ActivityPermission;
    editSubject?: ActivityPermission;
    deleteSubject?: ActivityPermission;

    viewEvent?: ActivityPermission;
    addEvent?: ActivityPermission;
    editEvent?: ActivityPermission;
    deleteEvent?: ActivityPermission;

    viewUser?: boolean;
    addUser?: boolean;
    editUser?: boolean;
    deleteUser?: boolean;
    verifyUser?: VerificationPermission; 

    viewGroup?: boolean;
    addGroup?: boolean;
    editGroup?: boolean;
    deleteGroup?: boolean;
    verifyGroup?: VerificationPermission;

    viewRole?: boolean;
    addRole?: boolean;
    editRole?: boolean;
    deleteRole?: boolean;
    verifyRole?: VerificationPermission;

    viewInstitution?: boolean;
}