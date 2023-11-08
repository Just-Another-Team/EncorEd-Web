/* Assigning what to see is only possible at the Floor Plan Management */
viewMap,

/* - - - - - - - - - - */
viewSubject, Object
    value: boolean,

    viewSchedule: boolean,
    viewParticipants: boolean,
    viewAttendances: boolean

editSubject, Object
    value: boolean

    editSchedule: boolean,
    editParticipants: boolean,
    editAttendance: boolean,
    verifyEdit,
        value: boolean,
        by: userId
/* - - - - - - - - - - */
viewEvent,
    value: boolean,

    viewSchedule: boolean,
    viewParticipants: boolean,
    viewAttendances: boolean,

addEvent,
    -- value: boolean

    -- addSchedule: boolean,
    -- addParticipants: boolean,
    submitAttendance, boolean
    -- verifyAddEvent,
    --     value: boolean,
    --     by: userId

/* - - - - - - - - - - */
viewUser,

viewGroup,

viewRole,

viewInstitution