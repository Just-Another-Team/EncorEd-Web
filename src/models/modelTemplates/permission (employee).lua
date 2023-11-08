/* Assigning what to see is only possible at the Floor Plan Management */
Role {
    viewMap,
    addMap,
    editMap,
    deleteMap,
    unlockMap,

    viewSubject, Object
        value: boolean,
        viewSchedule: boolean,
        viewParticipants: boolean,
        viewAttendances,
            self: boolean,
            all: boolean
    addSubject, Object
        value: boolean
        addSchedule: boolean,
        addParticipants: boolean,
        submitAttendance,
            value: boolean,
            verifyAttendance,
                value: boolean,
                by: userId
        verifyAddSubject,
            value: boolean,
            by: userId
    editSubject, Object
        value: boolean
        editSchedule: boolean,
        editParticipants: boolean,
        editAttendance: boolean,
        verifySubject,
            value: boolean,
            by: userId
    deleteSubject, Object
        value: boolean
        deleteSchedule: boolean,
        deleteParticipants: boolean,
        deleteAttendance: boolean,
        verifyDeleteSubject,
            value: boolean,
            by: userId
    /* - - - - - - - - - - */
    viewEvent,
        value: boolean,

        viewSchedule: boolean,
        viewParticipants: boolean,
        viewAttendances,
            self: boolean,
            all: boolean

    addEvent,
        value: boolean

        addSchedule: boolean,
        addParticipants: boolean,
        submitAttendance,
            value: boolean,
            verifyAttendance,
                value: boolean,
                by: userId
        verifyAddEvent,
            value: boolean,
            by: userId

    editEvent,
        value: boolean

        editSchedule: boolean,
        editParticipants: boolean,
        editAttendance: boolean,
        verifyEditEvent,
            value: boolean,
            by: userId

    deleteEvent,
        value: boolean

        deleteSchedule: boolean,
        deleteParticipants: boolean,
        deleteAttendance: boolean,
        verifyDeleteEvent,
            value: boolean,
            by: userId
    /* - - - - - - - - - - */
    viewUser,
    addUser,
    editUser,
    deleteUser,
    verifyUser,
        value: boolean,
        by: userId

    canViewGroup,
    canAddGroup,
    canEditGroup,
    canDeleteGroup,

    canViewRole,
    canAddRole,
    canEditRole,
    canDeleteRole,
    verifyRole,
        value: boolean,
        by: userId

    viewInstitution
}
