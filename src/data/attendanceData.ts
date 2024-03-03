export enum AttendanceTeacherStatus {
    Present,
    Missing
}

export enum AttendanceStatus {
    Active,
    Inactive
}

export type AttendanceType = {
    attdId: string;
    attdScanDate: Date | string;
    attdSubmissionDate: Date | string;
    subId: string;
    roomId: string;
    userId: string;
    attdTeacherStatus: AttendanceTeacherStatus;
    attdStatus: AttendanceStatus;
}

export const Attendances: Array<AttendanceType> = [
    //Same room, same subject
    {
        attdId: "1_attd101",
        attdScanDate: "No Date",
        attdSubmissionDate: "No Date",
        subId: "1231",
        roomId: "1_room101",
        userId: "1_user105",
        attdTeacherStatus: AttendanceTeacherStatus.Present,
        attdStatus: AttendanceStatus.Active,
    },
    {
        attdId: "1_attd102",
        attdScanDate: "No Date",
        attdSubmissionDate: "No Date",
        subId: "1231",
        roomId: "1_room101",
        userId: "user105",
        attdTeacherStatus: AttendanceTeacherStatus.Present,
        attdStatus: AttendanceStatus.Active,
    },

    {
        attdId: "1_attd103",
        attdScanDate: "No Date",
        attdSubmissionDate: "No Date",
        subId: "1232",
        roomId: "1_room102",
        userId: "1_user106",
        attdTeacherStatus: AttendanceTeacherStatus.Present,
        attdStatus: AttendanceStatus.Active,
    },
    {
        attdId: "1_attd104",
        attdScanDate: "No Date",
        attdSubmissionDate: "No Date",
        subId: "1232",
        roomId: "1_room102",
        userId: "user106",
        attdTeacherStatus: AttendanceTeacherStatus.Present,
        attdStatus: AttendanceStatus.Active,
    },
]
