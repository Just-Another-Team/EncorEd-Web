class Permission {
    
    private _viewMap: boolean;
    private _addMap: boolean;
    private _editMap: boolean;
    private _deleteMap: boolean;
    private _unlockMap: boolean;

    private _viewSubject: object | boolean;
    private _addSubject: object | boolean;
    private _editSubject: object | boolean;
    private _deleteSubject: object | boolean;

    private _viewEvent: object | boolean;
    private _addEvent: object | boolean;
    private _editEvent: object | boolean;
    private _deleteEvent: object | boolean;

    private _viewUser: boolean;
    private _addUser: boolean;
    private _deleteUser: boolean;
    private _verifyUser: object | boolean;

    private _viewGroup: boolean;
    private _addGroup: boolean;
    private _editGroup: boolean;
    private _deleteGroup: boolean;
    private _verifyGroup: object | boolean;

    private _viewRole: boolean;
    private _addRole: boolean;
    private _editRole: boolean;
    private _deleteRole: boolean;
    private _verifyRole: object | boolean;

    private _viewInstitution: boolean;

    constructor (
        _viewMap = false,
        _addMap = false,
        _editMap = false,
        _deleteMap = false,
        _unlockMap = false,
        _viewSubject = false,
        _addSubject = false,
        _editSubject = false,
        _deleteSubject = false,
        _viewEvent = false,
        _addEvent = false,
        _editEvent = false,
        _deleteEvent = false,
        _viewUser = false,
        _addUser = false,
        _deleteUser = false,
        _verifyUser = false,
        _viewGroup = false,
        _addGroup = false,
        _editGroup = false,
        _deleteGroup = false,
        _verifyGroup = false,
        _viewRole = false,
        _addRole = false,
        _editRole = false,
        _deleteRole = false,
        _verifyRole = false,
        _viewInstitution = false,
    ) {
        this.viewMap = _viewMap
        this.addMap = _addMap
        this.editMap = _editMap
        this.deleteMap = _deleteMap
        this.unlockMap = _unlockMap

        this.viewSubject = _viewSubject
        this.addSubject = _addSubject
        this.editSubject = _editSubject
        this.deleteSubject = _deleteSubject

        this.viewEvent = _viewEvent
        this.addEvent = _addEvent
        this.editEvent = _editEvent
        this.deleteEvent = _deleteEvent

        this.viewUser = _viewUser
        this.addUser = _addUser
        this.deleteUser = _deleteUser
        this.verifyUser = _verifyUser

        this.viewGroup = _viewGroup
        this.addGroup = _addGroup
        this.editGroup = _editGroup
        this.deleteGroup = _deleteGroup
        this.verifyGroup = _verifyGroup

        this.viewRole = _viewRole
        this.addRole = _addRole
        this.editRole = _editRole
        this.deleteRole = _deleteRole
        this.verifyRole = _verifyRole

        this.viewInstitution = _viewInstitution
    }
	public get viewMap(): boolean {
		return this._viewMap;
	}
	public get addMap(): boolean {
		return this._addMap;
	}
	public get editMap(): boolean {
		return this._editMap;
	}
	public get deleteMap(): boolean {
		return this._deleteMap;
	}
	public get unlockMap(): boolean {
		return this._unlockMap;
	}
	public get viewSubject(): object | boolean  {
		return this._viewSubject;
	}
	public get addSubject(): object | boolean  {
		return this._addSubject;
	}
	public get editSubject(): object | boolean  {
		return this._editSubject;
	}
	public get deleteSubject(): object | boolean  {
		return this._deleteSubject;
	}
	public get viewEvent(): object | boolean  {
		return this._viewEvent;
	}
	public get addEvent(): object | boolean  {
		return this._addEvent;
	}
	public get editEvent(): object | boolean  {
		return this._editEvent;
	}
	public get deleteEvent(): object | boolean  {
		return this._deleteEvent;
	}
	public get viewUser(): boolean {
		return this._viewUser;
	}
	public get addUser(): boolean {
		return this._addUser;
	}
	public get deleteUser(): boolean {
		return this._deleteUser;
	}
	public get verifyUser(): object | boolean  {
		return this._verifyUser;
	}
	public get viewGroup(): boolean {
		return this._viewGroup;
	}
	public get addGroup(): boolean {
		return this._addGroup;
	}
	public get editGroup(): boolean {
		return this._editGroup;
	}
	public get deleteGroup(): boolean {
		return this._deleteGroup;
	}
	public get verifyGroup(): object | boolean  {
		return this._verifyGroup;
	}
	public get viewRole(): boolean {
		return this._viewRole;
	}
	public get addRole(): boolean {
		return this._addRole;
	}
	public get editRole(): boolean {
		return this._editRole;
	}
	public get deleteRole(): boolean {
		return this._deleteRole;
	}
	public get verifyRole(): object | boolean  {
		return this._verifyRole;
	}
	public get viewInstitution(): boolean {
		return this._viewInstitution;
	}

	public set viewMap(value: boolean) {
		this._viewMap = value;
	}
	public set addMap(value: boolean) {
		this._addMap = value;
	}
	public set editMap(value: boolean) {
		this._editMap = value;
	}
	public set deleteMap(value: boolean) {
		this._deleteMap = value;
	}
	public set unlockMap(value: boolean) {
		this._unlockMap = value;
	}
	public set viewSubject(value: object | boolean ) {
		this._viewSubject = value;
	}
	public set addSubject(value: object | boolean ) {
		this._addSubject = value;
	}
	public set editSubject(value: object | boolean ) {
		this._editSubject = value;
	}
	public set deleteSubject(value: object | boolean ) {
		this._deleteSubject = value;
	}
	public set viewEvent(value: object | boolean ) {
		this._viewEvent = value;
	}
	public set addEvent(value: object | boolean ) {
		this._addEvent = value;
	}
	public set editEvent(value: object | boolean ) {
		this._editEvent = value;
	}
	public set deleteEvent(value: object | boolean ) {
		this._deleteEvent = value;
	}
	public set viewUser(value: boolean) {
		this._viewUser = value;
	}
	public set addUser(value: boolean) {
		this._addUser = value;
	}
	public set deleteUser(value: boolean) {
		this._deleteUser = value;
	}
	public set verifyUser(value: object | boolean ) {
		this._verifyUser = value;
	}
	public set viewGroup(value: boolean) {
		this._viewGroup = value;
	}
	public set addGroup(value: boolean) {
		this._addGroup = value;
	}
	public set editGroup(value: boolean) {
		this._editGroup = value;
	}
	public set deleteGroup(value: boolean) {
		this._deleteGroup = value;
	}
	public set verifyGroup(value: object | boolean ) {
		this._verifyGroup = value;
	}
	public set viewRole(value: boolean) {
		this._viewRole = value;
	}
	public set addRole(value: boolean) {
		this._addRole = value;
	}
	public set editRole(value: boolean) {
		this._editRole = value;
	}
	public set deleteRole(value: boolean) {
		this._deleteRole = value;
	}
	public set verifyRole(value: object | boolean ) {
		this._verifyRole = value;
	}
	public set viewInstitution(value: boolean) {
		this._viewInstitution = value;
	}
}

export {Permission}