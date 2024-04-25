import { DocumentReference } from "firebase-admin/firestore";
import IFloor from "./floor.model";
import ISubject from "./subject.model";

export default interface IRoom {
    ROOM_ID?: string;
    ROOM_NAME?: string;
    FLR_ID?: IFloor | string;

    SUB_ID?: ISubject | string;
    SUBJECTS?: Array<ISubject>;
}
