


export class AttendancePermission {

    private _value: boolean;
    private _verifyAttendance: object;

    constructor(
        _value = false,
        _verifyAttendance: object,
    ) {
        this.value = _value
        this.verifyAttendance = _verifyAttendance
    }

	public get value(): boolean {
		return this._value;
	}
	public get verifyAttendance(): object {
		return this._verifyAttendance;
	}

	public set value(value: boolean) {
		this._value = value;
	}
	public set verifyAttendance(value: object) {
		this._verifyAttendance = value;
	}
}