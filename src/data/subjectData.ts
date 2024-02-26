export enum SubStatusEnum {
    Active,
    Inactive
}

export  type SubjectType = {
    subId: string;
    subCode: string;
    subDescription: string;
    subStartSchedule: Date | string;
    subEndSchedule: Date | string;
    subWeekAssigned: Array<string>;
    userId: string;
    roomId: string;
    subStatus: SubStatusEnum;
}

export const Subjects: Array<SubjectType> = [
    {
        subId: "1231",
        subCode: "SUB-12345",
        subDescription: "Subject Protocol 1 Lit",
        subStartSchedule: "",
        subEndSchedule: "",
        subWeekAssigned: [
            "Monday",
            "Wednesday",
            "Friday",
        ],
        userId: "user101",
        roomId: "1_room103",
        subStatus: SubStatusEnum.Active,
    },
    {
        subId: "1232",
        subCode: "SUB-12345",
        subDescription: "Subject Protocol 1 Lab",
        subStartSchedule: "",
        subEndSchedule: "",
        subWeekAssigned: [
            "Tuesday",
            "Thursday",
        ],
        userId: "user101",
        roomId: "1_room101",
        subStatus: SubStatusEnum.Active,
    },
]