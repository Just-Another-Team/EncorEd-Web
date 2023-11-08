class Permission {

    constructor (
        viewMap,
        addMap,
        editMap,
        deleteMap,
        unlockMap,
        viewSubject,
        addSubject,
        editSubject,
        deleteSubject,
        viewEvent,
        addEvent,
        editEvent,
        deleteEvent,
        viewUser,
        addUser,
        deleteUser,
        verifyUser,
        viewGroup,
        addGroup,
        editGroup,
        deleteGroup,
        verifyGroup,
        viewRole,
        addRole,
        editRole,
        deleteRole,
        verifyRole,
        viewInstitution,
    ) {
        this.setViewMap = viewMap
        this.setAddMap = addMap
        this.setEditMap = editMap
        this.setDeleteMap = deleteMap
        this.setUnlockMap = unlockMap

        this.setViewSubject = viewSubject
        this.setAddSubject = addSubject
        this.setEditSubject = editSubject
        this.setDeleteSubject = deleteSubject

        this.setViewEvent = viewEvent
        this.setAddEvent = addEvent
        this.setEditEvent = editEvent
        this.setDeleteEvent = deleteEvent

        this.setViewUser = viewUser
        this.setAddUser = addUser
        this.setDeleteUser = deleteUser
        this.setVerifyUser = verifyUser

        this.setViewGroup = viewGroup
        this.setAddGroup = addGroup
        this.setEditGroup = editGroup
        this.setDeleteGroup = deleteGroup
        this.verifyGroup = verifyGroup

        this.setViewRole = viewRole
        this.setAddRole = addRole
        this.setEditRole = editRole
        this.setDeleteRole = deleteRole
        this.setVerifyRole = verifyRole

        this.setViewInstitution = viewInstitution
    }

    get getViewMap() {
        return this.viewMap
    }
    set setViewMap(value) {
        this.viewMap = value
    }

    get getAddMap() {
        return this.addMap
    }
    set setAddMap(value) {
        this.addMap = value
    }

    get getEditMap() {
        return this.editMap
    }
    set setEditMap(value) {
        this.editMap = value
    }

    get getDeleteMap() {
        return this.deleteMap
    }
    set setDeleteMap(value) {
        this.deleteMap = value
    }

    get getUnlockMap() {
        return this.unlockMap
    }
    set setUnlockMap(value) {
        this.unlockMap = value
    }

    get getViewSubject() {
        return this.viewSubject;
    }
    set setViewSubject(value) {
        this.viewSubject = value;
    }
    get getAddSubject() {
        return this.addSubject;
    }
    set setAddSubject(value) {
        this.addSubject = value;
    }
    get getEditSubject() {
        return this.editSubject;
    }
    set setEditSubject(value) {
        this.editSubject = value;
    }
    get getDeleteSubject() {
        return this.deleteSubject;
    }
    set setDeleteSubject(value) {
        this.deleteSubject = value;
    }
    
    get getViewEvent() {
        return this.viewEvent
    }
    set setViewEvent(value) {
        this.viewEvent = value
    }
    get getAddEvent() {
        return this.addEvent
    }
    set setAddEvent(value) {
        this.addEvent = value
    }
    get getEditEvent() {
        return this.editEvent
    }
    set setEditEvent(value) {
        this.editEvent = value
    }
    get getDeleteEvent() {
        return this.deleteEvent
    }
    set setDeleteEvent(value) {
        this.deleteEvent = value
    }

    get getViewUser() {
        return this.viewUser
    }
    set setViewUser(value) {
        this.viewUser = value
    }
    get getAddUser() {
        return this.addUser
    }
    set setAddUser(value) {
        this.addUser = value
    }
    get getDeleteUser() {
        return this.deleteUser
    }
    set setDeleteUser(value) {
        this.deleteUser = value
    }
    get getVerifyUser() {
        return this.verifyUser
    }
    set setVerifyUser(value) {
        this.verifyUser = value
    }

    get getViewGroup() {
        return this.viewGroup
    }
    set setViewGroup(value) {
        this.viewGroup = value
    }
    get getAddGroup() {
        return this.addGroup
    }
    set setAddGroup(value) {
        this.addGroup = value
    }
    get getEditGroup() {
        return this.editGroup
    }
    set setEditGroup(value) {
        this.editGroup = value
    }
    get getDeleteGroup() {
        return this.deleteGroup
    }
    set setDeleteGroup(value) {
        this.deleteGroup = value
    }
    get getVerifyGroup() {
        return this.verifyGroup
    }
    set setVerifyGroup(value) {
        this.verifyGroup = value
    }

    get getViewRole() {
        return this.viewRole
    }
    set setViewRole(value) {
        this.viewRole = value
    }
    get getAddRole() {
        return this.addRole
    }
    set setAddRole(value) {
        this.addRole = value
    }
    get getEditRole() {
        return this.editRole
    }
    set setEditRole(value) {
        this.editRole = value
    }
    get getDeleteRole() {
        return this.deleteRole
    }
    set setDeleteRole(value) {
        this.deleteRole = value
    }
    get getVerifyRole() {
        return this.verifyRole
    }
    set setVerifyRole(value) {
        this.verifyRole = value
    }

    get getViewInstitution() {
        return this.viewInstitution
    }
    set setViewInstitution(value) {
        this.viewInstitution = value
    }
}

class VerificationPermission {
    constructor(value, by) {
        this.setValue = value
        this.setBy = by
    }

    get getValue() {
        return this.value
    }
    set setValue(_value) {
        this.value = _value
    }

    get getBy() {
        return this.by
    }
    set setBy(_value) {
        this.by = _value
    }
}

class AttendancePermission {
    constructor(value, verifyAttendance) {
        this.setValue = value
        this.setVerifyAttendance = verifyAttendance
    }

    get getValue() {
        return this.value
    }
    set setValue(_value) {
        this.value = _value
    }

    get getVerifyAttendance() {
        return this.verifyAttendance
    }
    set setVerifyAttendance(_value) {
        this.verifyAttendance = _value
    }
}

class ActivityPermission {
    constructor(value, schedule, participants, attendance, verify) {
        this.setValue = value
        this.setSchedule = schedule
        this.setParticipants = participants
        this.setAttendance = attendance
        this.setVerify = verify
    }

    get getValue() {
        return this.value
    }
    set setValue(_value) {
        this.value = _value
    }

    get getSchedule() {
        return this.schedule
    }
    set setSchedule(_value) {
        this.schedule = _value
    }

    get getParticipants() {
        return this.participants
    }
    set setParticipants(_value) {
        this.participants = _value
    }

    get getAttendance() {
        return this.attendance
    }
    set setAttendance(_value) {
        this.attendance = _value
    }

    get getVerify() {
        return this.verify
    }
    set setVerify(_value) {
        this.verify = _value
    }
}

class ViewAttendancePermission {
    constructor (self, all) {
        this.setSelf = self
        this.setAll = all
    }

    get getSelf() {
        return this.self
    }
    set setSelf(_value) {
        this.self = _value
    }

    get getAll() {
        return this.all
    }
    set setAll(_value) {
        this.all = _value
    }
}