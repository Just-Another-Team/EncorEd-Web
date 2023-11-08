import { TimestampProps } from "../types/TimestampProps";

export default interface IInstitution {
    name: string;
    desc: string;
    createdBy: string;
    creationDate: TimestampProps;
    status: string;
}