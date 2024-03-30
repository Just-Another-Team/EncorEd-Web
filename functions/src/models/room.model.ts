import { DocumentReference } from "firebase-admin/firestore";
import IFloor from "./floor.model";
import ISubject from "./subject.model";

export default interface IRoom {
    ROOM_ID?: string;
    ROOM_NAME?: string;
    FLR_ID?: DocumentReference | IFloor | string;

    SUB_ID?: DocumentReference | ISubject | string;
    SUBJECTS?: Array<ISubject>;
}
