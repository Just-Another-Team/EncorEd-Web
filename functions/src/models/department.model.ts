import IFloor from "./floor.model";

export default interface IDepartment {
    DEPT_ID?: string;
    DEPT_NAME: string;
    DEPT_DEAN: string | null;
    DEPT_FLOORSASSIGNED: Array<IFloor> | Array<string>

    DEPT_NOOFUSERS?: number
    DEPT_ISDELETED?: boolean;
}