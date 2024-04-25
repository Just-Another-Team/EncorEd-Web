import IDepartment from "./IDepartment";

export type UserRole = {
    admin?: boolean,
    campusDirector?: boolean
    dean?: boolean
    attendanceChecker?: boolean
    teacher?: boolean
    kiosk?: boolean
}


export default interface IUser {
    USER_ID?: string;

    USER_FULLNAME?: string;
    USER_FNAME?: string | null;
    USER_LNAME?: string | null;
    USER_MNAME?: string | null;
    USER_EMAIL?: string | null;

    USER_USERNAME: string | null;
    USER_PASSWORD: string | null;
    ROLE_ID: UserRole | string | null | undefined;
    DEPT_ID: IDepartment | string | null;
    USER_ISDELETED?: boolean;

    USER_CREATEDBY?: string;
    USER_UPDATEDBY?: string;
}
