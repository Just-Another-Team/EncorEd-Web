export class ViewAttendancePermission {
    private _self: boolean;
    private _all: boolean;

    constructor (
        _self = false,
        _all = false
    ) {
        this.self = _self
        this.all = _all
    }

    public get self(): boolean {
        return this.self
    }
    public set self(_value) {
        this.self = _value
    }

    public get all(): boolean {
        return this._all
    }
    public set all(_value) {
        this.all = _value
    }
}