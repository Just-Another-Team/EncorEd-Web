import { QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

class SubjectAttendance {

    private _subSchedId: string | null;
    private _parId: string | null;
    private _attendanceStatus: string | null;
    private _submitDateTime: Date | null;
    private _remarks: string | null;
    private _verifiedBy: string | null;

	constructor(
		_subSchedId = null,
		_parId = null,
		_attendanceStatus = null,
		_submitDateTime = null,
		_remarks = null,
		_verifiedBy = null,
	) {
		this.subSchedId = _subSchedId;
		this.parId = _parId;
		this.attendanceStatus = _attendanceStatus;
		this.submitDateTime = _submitDateTime;
		this.remarks = _remarks;
		this.verifiedBy = _verifiedBy;
	}

	public get subSchedId(): string | null  {
		return this._subSchedId;
	}
	public get parId(): string | null  {
		return this._parId;
	}
	public get attendanceStatus(): string | null  {
		return this._attendanceStatus;
	}
	public get submitDateTime(): Date | null  {
		return this._submitDateTime;
	}
	public get remarks(): string | null  {
		return this._remarks;
	}
	public get verifiedBy(): string | null  {
		return this._verifiedBy;
	}

	public set subSchedId(value: string | null ) {
		this._subSchedId = value;
	}
	public set parId(value: string | null ) {
		this._parId = value;
	}
	public set attendanceStatus(value: string | null ) {
		this._attendanceStatus = value;
	}
	public set submitDateTime(value: Date | null ) {
		this._submitDateTime = value;
	}
	public set remarks(value: string | null ) {
		this._remarks = value;
	}
	public set verifiedBy(value: string | null ) {
		this._verifiedBy = value;
	}
    
}

const subjectAttendanceConverter = {
    toFirestore: (subjectAttendance: SubjectAttendance) => {
        return {
            subSchedId: subjectAttendance.subSchedId,
            parId: subjectAttendance.parId,
            attendanceStatus: subjectAttendance.attendanceStatus,
            submitDateTime: subjectAttendance.submitDateTime,
            remarks: subjectAttendance.remarks,
            verifiedBy: subjectAttendance.verifiedBy
        }
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
        const data = snapshot.data(options)
        return new SubjectAttendance(
            data.subSchedId,
            data.parId,
            data.attendanceStatus,
            data.submitDateTime,
            data.remarks,
            data.verifiedBy,
        )
    }
}

export {SubjectAttendance, subjectAttendanceConverter}