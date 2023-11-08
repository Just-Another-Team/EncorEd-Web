import { QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

class EventSchedule {
    private _eventId: string | null;
    private _roomId: string | null;
    private _venue: string | null;

    private _startDateTime: Date | null;
    private _endDateTime: Date | null;
    private _createdBy: string | null;
    private _verifiedBy: string | null;
    private _status: string | null;

    private _inCampus: boolean;

    constructor(
        _eventId = null,
        _roomId = null,
        _venue = null,

        _startDateTime = null,
        _endDateTime = null,
        _createdBy = null,
        _verifiedBy = null,
        _status = null,

        _inCampus = false
    ) {
        this.eventId = _eventId
        this.roomId = _roomId
        this.venue = _venue
        this.startDateTime = _startDateTime
        this.endDateTime = _endDateTime
        this.createdBy = _createdBy
        this.verifiedBy = _verifiedBy
        this.status = _status
        this.inCampus = _inCampus
    }

	public get eventId(): string | null  {
		return this._eventId;
	}
	public get roomId(): string | null  {
		return this._roomId;
	}
	public get venue(): string | null  {
		return this._venue;
	}
	public get startDateTime(): Date | null  {
		return this._startDateTime;
	}
	public get endDateTime(): Date | null  {
		return this._endDateTime;
	}
	public get createdBy(): string | null  {
		return this._createdBy;
	}
	public get verifiedBy(): string | null  {
		return this._verifiedBy;
	}
	public get status(): string | null  {
		return this._status;
	}
	public get inCampus(): boolean {
		return this._inCampus;
	}

	public set eventId(value: string | null ) {
		this._eventId = value;
	}
	public set roomId(value: string | null ) {
		this._roomId = value;
	}
	public set venue(value: string | null ) {
		this._venue = value;
	}
	public set startDateTime(value: Date | null ) {
		this._startDateTime = value;
	}
	public set endDateTime(value: Date | null ) {
		this._endDateTime = value;
	}
	public set createdBy(value: string | null ) {
		this._createdBy = value;
	}
	public set verifiedBy(value: string | null ) {
		this._verifiedBy = value;
	}
	public set status(value: string | null ) {
		this._status = value;
	}
	public set inCampus(value: boolean) {
		this._inCampus = value;
	}
}

const eventScheduleConverter = {
    toFirestore: (eventSchedule: EventSchedule) => {
        return {
            eventId: eventSchedule.eventId,
            roomId: eventSchedule.roomId,
            venue: eventSchedule.venue,
            startDateTime: eventSchedule.startDateTime,
            endDateTime: eventSchedule.endDateTime,
            createdBy: eventSchedule.createdBy,
            verifiedBy: eventSchedule.verifiedBy,
            status: eventSchedule.status,
            inCampus: eventSchedule.inCampus
        }
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
        const data = snapshot.data(options)
        
        return new EventSchedule(
            data.eventId,
            data.roomId,
            data.venue,
            data.startDateTime,
            data.endDateTime,
            data.createdBy,
            data.verifiedBy,
            data.status,
            data.inCampus
        )
    }
}

export {EventSchedule, eventScheduleConverter}