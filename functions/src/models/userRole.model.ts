import { FieldValue } from "firebase-admin/firestore";

export default interface IUserRole {
    id?: string;
    userId: string;
    roleId: string;
}