export default interface ISubjectAttendance {
    id?: string;
	subSchedId: string;
    parId: string;
    attendanceStatus: string;
    submitDateTime: Date | string;
    verifiedBy?: string;
    remarks: string;
}