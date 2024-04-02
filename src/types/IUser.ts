import IDepartment from "./IDepartment";
import IRole from "./IRole";

export default interface IUser {
    USER_ID?: string;

    USER_FULLNAME?: string;
    USER_FNAME?: string | null;
    USER_LNAME?: string | null;
    USER_MNAME?: string | null;
    USER_EMAIL?: string | null;

    USER_USERNAME: string | null;
    USER_PASSWORD: string | null;
    ROLE_ID: IRole | string | null;
    DEPT_ID: IDepartment | string | null;
    USER_ISDELETED?: boolean;
}
