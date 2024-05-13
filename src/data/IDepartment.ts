import IFloor from "./IFloor";

export default interface IDepartment {
    DEPT_ID?: string;
    DEPT_NAME: string | null;
    DEPT_DEAN: string | null;
    DEPT_FLOORSASSIGNED: Array<IFloor> | Array<string>

    DEPT_NOOFUSERS?: number
}
