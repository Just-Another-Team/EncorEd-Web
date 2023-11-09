import { TimestampProps } from "../types/TimestampProps";

export default interface IInstitution {
    id?: string;
    name: string;
    desc: string;
    createdBy: string;
    creationDate: Date | string;
    //updatedBy
    //updatedDate
    status: string;
}