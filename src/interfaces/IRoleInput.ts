import { Permission } from "../models/permission.model.type";
import { TimestampProps } from "../types/TimestampProps";

export default interface IRoleInput {
    name: string;
    desc: string;
    institution: string;
	type?: string;

    permission?: Permission,

	creationDate?: TimestampProps,
	createdBy: string,

    updatedBy?: string,

	status?: string
}
