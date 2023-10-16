const router = require('express').Router()
const {
    addEvent,
    updateEvent,
    deleteEvent,
    viewAllEvents,
    viewEvent
} = require("../controller/event.controller")
const {
    addEventSchedule,
    updateEventSchedule,
    deleteEventSchedule,
    viewAllEventSchedules,
    viewEventSchedule
} = require("../controller/eventSchedule.controller")
const {
    addEventAttendance,
    deleteEventAttendance,
    updateEventAttendace,
    viewAllEventAttendances
} = require("../controller/eventAttendance.controller")

/* EVENT */
router.post("/add", addEvent);

router.put("/update/:id", updateEvent)

router.delete("/delete/:id", deleteEvent)

router.get("/list/", viewAllEvents)
router.get("/list/:id", viewEvent)

//router.get("/list/:institution/")
//router.get("/list/:institution/:id")

/* EVENT SCHEDULE */
router.post("/schedule/add", addEventSchedule)

router.put("/schedule/update/:id", updateEventSchedule)

router.delete("/schedule/delete/:id", deleteEventSchedule)

router.get("/schedule/list/", viewAllEventSchedules)
router.get("/schedule/list/:id", viewEventSchedule)

/* EVENT ATTENDANCE */
router.post("/attendees/add", addEventAttendance)

router.put("/attendees/update/:id", updateEventAttendace)

router.delete("/attendees/delete/:id", deleteEventAttendance)

router.get("/attendees/list/all", viewAllEventAttendances)
// router.get("/attendees/list/:id", viewEventSchedule)

module.exports = router