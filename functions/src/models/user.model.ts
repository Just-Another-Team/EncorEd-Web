import { DocumentReference } from "firebase-admin/firestore";
import IRole from "./role.model";
import IDepartment from "./department.model";

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
    ROLE_ID: DocumentReference | IRole | string;
    DEPT_ID: DocumentReference | IDepartment | string | null;
    USER_ISDELETED: boolean;
}

export default interface IUser extends IUserAuth, IUserFireStore {
    USER_ID?: string;
}
