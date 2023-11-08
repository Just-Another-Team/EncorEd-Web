export class ActivityPermission {
    private _value: boolean;
    private _schedule: boolean;
    private _participants: boolean;
    private _attendance: boolean;
    private _verify: object;
    
    constructor(
        _value = false,
        _schedule = false,
        _participants = false,
        _attendance = false,
        _verify: object,
    ) {
        this.value = _value
        this.schedule = _schedule
        this.participants = _participants
        this.attendance = _attendance
        this.verify = _verify
    }


    /**
     * Getter value
     * @return {boolean}
     */
	public get value(): boolean {
		return this._value;
	}

    /**
     * Getter schedule
     * @return {boolean}
     */
	public get schedule(): boolean {
		return this._schedule;
	}

    /**
     * Getter participants
     * @return {boolean}
     */
	public get participants(): boolean {
		return this._participants;
	}

    /**
     * Getter attendance
     * @return {boolean}
     */
	public get attendance(): boolean {
		return this._attendance;
	}

    /**
     * Getter verify
     * @return {object}
     */
	public get verify(): object {
		return this._verify;
	}

    /**
     * Setter value
     * @param {boolean} value
     */
	public set value(value: boolean) {
		this._value = value;
	}

    /**
     * Setter schedule
     * @param {boolean} value
     */
	public set schedule(value: boolean) {
		this._schedule = value;
	}

    /**
     * Setter participants
     * @param {boolean} value
     */
	public set participants(value: boolean) {
		this._participants = value;
	}

    /**
     * Setter attendance
     * @param {boolean} value
     */
	public set attendance(value: boolean) {
		this._attendance = value;
	}

    /**
     * Setter verify
     * @param {object} value
     */
	public set verify(value: object) {
		this._verify = value;
	}

}