export default interface INotification {
    id?: string;
    institution: string;
    roomName: string;
    submitBy: string;
    submitAt: Date | string;
    verifyBy: string;
    verifyAt: Date | string;
}