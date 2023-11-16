import { QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export default interface IEventSchedule {
    eventId: string;
    roomId: string;
    venue: string;

    startDateTime: Date | string;
    endDateTime: Date | string;
    createdBy: string;

    //UpdatedBy?
    //UpdatedDate?

    verifiedBy: string;
    status: string;

    inCampus: boolean;
}