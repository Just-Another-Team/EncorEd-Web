import { QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore"

class Event {
    private _name: string | null;
    private _desc: string | null;
    private _creationDate: Date | null;
    private _createdBy: string | null;
    private _verifiedBy: string | null;
    private _status: string | null;

    constructor(
        _name = null,
        _desc = null,
        _creationDate = null,
        _createdBy = null,
        _verifiedBy = null,
        _status = null,
    ) {
        this.name = _name
        this.desc = _desc
        this.creationDate = _creationDate
        this.createdBy = _createdBy
        this.verifiedBy = _verifiedBy
        this.status = _status
    }

	public get name(): string | null  {
		return this._name;
	}
	public get desc(): string | null  {
		return this._desc;
	}
	public get creationDate(): Date | null  {
		return this._creationDate;
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

	public set name(value: string | null ) {
		this._name = value;
	}
	public set desc(value: string | null ) {
		this._desc = value;
	}
	public set creationDate(value: Date | null ) {
		this._creationDate = value;
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
}

const eventConverter = {
    toFirestore: (event: Event) => {
        return {
            name: event.name,
            desc: event.desc,
            creationDate: event.creationDate,
            createdBy: event.createdBy,
            verifiedBy: event.verifiedBy,
            status: event.status
        }
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
        const data = snapshot.data(options)
        
        return new Event(
            data.name,
            data.desc,
            data.creationDate,
            data.createdBy,
            data.verifiedBy,
            data.status
        )
    }
}

export {Event, eventConverter}