import { QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

class SubjectSchedule {
    private _subId: string | null;
    private _roomId: string | null;
    private _assignedWeek: Array<string> | null;
    private _startTime: Date | null;
    private _endTime: Date | null;
    private _createdBy: string | null;
    private _verifiedBy: string | null;
    private _status: string | null;

    constructor(
        _subId = null,
        _roomId = null,
        _assignedWeek = null,
        _startTime = null,
        _endTime = null,
        _createdBy = null,
        _verifiedBy = null,
        _status = null
    ) {
        this.subId = _subId;
        this.roomId = _roomId;
        this.assignedWeek = _assignedWeek;
        this.startTime = _startTime;
        this.endTime = _endTime;
        this.createdBy = _createdBy;
        this.verifiedBy = _verifiedBy;
        this.status = _status;
    }

    public set subId(_subId: string | null) {
        this.subId = _subId;
    }
    public get subId(): string | null {
        return this.subId;
    }

    public set roomId(_roomId: string | null) {
        this.roomId = _roomId;
    }
    public get roomId(): string | null {
        return this.roomId;
    }

    public set assignedWeek(_assignedWeek: Array<string> | null) {
        this.assignedWeek = _assignedWeek;
    }
    public get assignedWeek(): Array<string> | null {
        return this.assignedWeek;
    }

    public set startTime(_startTime: Date | null) {
        this.startTime = _startTime;
    }
    public get startTime(): Date | null {
        return this.startTime;
    }

    public set endTime(_endTime: Date | null) {
        this.endTime = _endTime;
    }
    public get endTime(): Date | null {
        return this.endTime;
    }

    public set createdBy(_createdBy: string | null) {
        this.createdBy = _createdBy;
    }
    public get createdBy(): string | null {
        return this.createdBy;
    }

    public set verifiedBy(_verifiedBy: string | null) {
        this.verifiedBy = _verifiedBy;
    }
    public get verifiedBy(): string | null {
        return this.verifiedBy;
    }

    public set status(_status: string | null) {
        this.status = _status;
    }
    public get status(): string | null {
        return this.status
    }
}

const subScheduleConverter = {
    toFirestore: (subjectSchedule: SubjectSchedule) => {
        return {
            subId: subjectSchedule.subId,
            roomId: subjectSchedule.roomId,
            assignedWeek: subjectSchedule.assignedWeek,
            startTime: subjectSchedule.startTime,
            endTime: subjectSchedule.endTime,
            createdBy: subjectSchedule.createdBy,
            verifiedBy: subjectSchedule.verifiedBy,
            status: subjectSchedule.status
        }
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
        const data = snapshot.data(options)
        return new SubjectSchedule(
            data.subId,
            data.roomId,
            data.assignedWeek,
            data.startTime,
            data.endTime,
            data.createdBy,
            data.verifiedBy,
            data.status
        )
    }
}

export {SubjectSchedule, subScheduleConverter}