import { QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

class EventAttendance {
    private _eventSchedId: string | null;
    private _attendeeId: string | null;
    private _status: string | null;
    private _submittedDate: Date | null;
    private _remarks: string | null;

    constructor(
        _eventSchedId = null,
        _attendeeId = null,
        _status = null,
        _submittedDate = null,
        _remarks = null,
    ) {
        this.eventSchedId = _eventSchedId
        this.attendeeId = _attendeeId
        this.status = _status
        this.submittedDate = _submittedDate
        this.remarks = _remarks
    }

	public get eventSchedId(): string | null  {
		return this._eventSchedId;
	}
	public get attendeeId(): string | null  {
		return this._attendeeId;
	}
	public get status(): string | null  {
		return this._status;
	}
	public get submittedDate(): Date | null  {
		return this._submittedDate;
	}
	public get remarks(): string | null  {
		return this._remarks;
	}

	public set eventSchedId(value: string | null ) {
		this._eventSchedId = value;
	}
	public set attendeeId(value: string | null ) {
		this._attendeeId = value;
	}
	public set status(value: string | null ) {
		this._status = value;
	}
	public set submittedDate(value: Date | null ) {
		this._submittedDate = value;
	}
	public set remarks(value: string | null ) {
		this._remarks = value;
	}
}

const eventAttendanceConverter = {
    toFirestore: (eventAttendance: EventAttendance) => {
        return {
            eventSchedId: eventAttendance.eventSchedId,
            attendeeId: eventAttendance.attendeeId,
            status: eventAttendance.status,
            submittedDate: eventAttendance.submittedDate,
            remarks: eventAttendance.remarks
        }
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
        const data = snapshot.data(options)
        return new EventAttendance(
            data.eventSchedId,
            data.attendeeId,
            data.status,
            data.submittedDate,
            data.remarks
        )
    }
}

export {EventAttendance, eventAttendanceConverter}