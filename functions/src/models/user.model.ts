import { DocumentReference } from "firebase-admin/firestore";
import IRole from "./role.model";
import IDepartment from "./department.model";

export interface IUserRole {
    campusDirector?: boolean
    dean?: boolean
    attendanceChecker?: boolean
    teacher?: boolean
    kiosk?: boolean
}

export interface IUserAuth {
    USER_PASSWORD?: string;

    USER_FULLNAME?: string;
    USER_FNAME?: string;
    USER_LNAME?: string;
    USER_MNAME?: string;
    USER_EMAIL?: string;
}

export interface IUserFireStore {
    USER_USERNAME: string;
    ROLE_ID: IRole | IUserRole | string;
    DEPT_ID: IDepartment | string | null;
    USER_ISDELETED: boolean;
}

export default interface IUser extends IUserAuth, IUserFireStore {
    USER_ID?: string;
    USER_CREATEDBY?: string;
    USER_UPDATEDBY: string;
}
