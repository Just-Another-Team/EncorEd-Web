/* Assigning what to see is only possible at the Floor Plan Management */
viewMap,

/* - - - - - - - - - - */
viewSubject, Object
    value: boolean,

    viewSchedule: boolean,

/* - - - - - - - - - - */
viewEvent,
    value: boolean,

    viewSchedule: boolean,
    viewParticipants: boolean,
    -- viewAttendances: boolean,

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