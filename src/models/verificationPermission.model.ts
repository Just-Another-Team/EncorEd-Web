export class VerificationPermission {
    private _value: boolean;
    private _by: string | null;

    constructor(
        _value = false,
        _by = null
    ) {
        this.value = _value
        this.by = _by
    }

    get value(): boolean {
        return this.value
    }
    set value(_value) {
        this.value = _value
    }

    get by(): string | null {
        return this.by
    }
    set by(_value) {
        this.by = _value
    }
}