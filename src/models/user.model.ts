import { TimestampProps } from "../types/TimestampProps";

export default interface IUser {
    id?: string;
    
    institution?: string;
    firstName?: string;
    lastName?: string;
    email: string;
    userName?: string;
    password?: string;
    addedBy?: string;
    joinDate?: Date | string;
    isalumni?: string;
    status?: string;
}
