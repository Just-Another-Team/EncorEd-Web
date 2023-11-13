import { Institution } from "./InstitutionInput";

export type RegisterFormCredential = {
    firstName?: string,
    lastName?: string,
    email?: string,
    userName?: string,
    password?: string,
    confirmPassword?: string,
    agree?: boolean;

    addedBy?: string;
    isalumni?: boolean

    institution?: Institution;
}