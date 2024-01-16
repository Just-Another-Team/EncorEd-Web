export default interface IAttendance {
    id?: string;
    institution: string;
    roomName: string;
    submitBy: string;
    submitAt: Date | string;
    verifyBy: string;
    verifyAt: Date | string;
    status: string;
}