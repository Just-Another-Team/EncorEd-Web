import { Institution } from "./InstitutionInput";

export type RegisterFormCredential = {
    id?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    userName?: string,
    password?: string,
    confirmPassword?: string,
    agree?: boolean;

    newPassword?: string,
    
    addedBy?: string;
    isalumni?: boolean

    institution?: Institution;
}