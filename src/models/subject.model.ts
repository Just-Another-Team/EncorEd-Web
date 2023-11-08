import { QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

class Subject {
    private _name: string | null;
    private _edpCode: string | null;
    private _type: string | null;
    private _units: number | null;
    private _creationDate: Date | null;
    private _createdBy: string | null;
    private _verifiedBy: string | null;
    private _status: string | null

    constructor(
        _name = null,
        _edpCode = null,
        _type = null,
        _units = null,
        _creationDate = null,
        _createdBy = null,
        _verifiedBy = null,
        _status = null
    ) {
        this.name = _name;
        this.edpCode = _edpCode;
        this.type = _type;
        this.units = _units;
        this.creationDate = _creationDate;
        this.createdBy = _createdBy;
        this.verifiedBy = _verifiedBy;
        this.status = _status;
    }

	public get name(): string | null  {
		return this._name;
	}
	public get edpCode(): string | null  {
		return this._edpCode;
	}
	public get type(): string | null  {
		return this._type;
	}
	public get units(): number | null  {
		return this._units;
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
	public set edpCode(value: string | null ) {
		this._edpCode = value;
	}
	public set type(value: string | null ) {
		this._type = value;
	}
	public set units(value: number | null ) {
		this._units = value;
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

const subjectConverter = {
    toFirestore: (subject: Subject) => {
        return {
            name: subject.name,
            edpCode: subject.edpCode,
            type: subject.type,
            units: subject.units,
            creationDate: subject.creationDate,
            createdBy: subject.createdBy,
            verifiedBy: subject.verifiedBy,
            status: subject.status
        }
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
        const data = snapshot.data(options)
        return new Subject(
            data.name,
            data.edpCode,
            data.type,
            data.units,
            data.creationDate,
            data.createdBy,
            data.verifiedBy,
            data.status
        )
    }
}

export {Subject, subjectConverter}