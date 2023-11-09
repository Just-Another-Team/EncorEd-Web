export default interface IEvent {
    id?: string;
    name: string;
    desc: string;
    creationDate: Date;
    createdBy: string;
    verifiedBy: string;
    status: string;
}