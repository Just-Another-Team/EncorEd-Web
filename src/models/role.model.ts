import { Permission } from "../types/Permission";
import { TimestampProps } from "../types/TimestampProps";

export default interface IRole {
    id?: string;
    name: string;
    desc: string;
	institution: string;
	type?: string;

    appAdmin: boolean;
	admin: boolean
	employee: Permission | boolean; // Permission type
		
	teacher: Permission | boolean, // Permission type
	student: Permission | boolean, // Permission type
	visitor: Permission | boolean, // Permission type

	creationDate: TimestampProps,
	createdBy: string,

	updatedDate: TimestampProps,
	updatedBy: string,

	status: string
}
