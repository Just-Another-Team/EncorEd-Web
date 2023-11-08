import { Router } from "express"
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

const eventRouter = Router()

/* EVENT */
eventRouter.post("/add", addEvent);

eventRouter.put("/update/:id", updateEvent)

eventRouter.delete("/delete/:id", deleteEvent)

eventRouter.get("/list/", viewAllEvents)
eventRouter.get("/list/:id", viewEvent)

//eventRouter.get("/list/:institution/")
//eventRouter.get("/list/:institution/:id")

/* EVENT SCHEDULE */
eventRouter.post("/schedule/add", addEventSchedule)

eventRouter.put("/schedule/update/:id", updateEventSchedule)

eventRouter.delete("/schedule/delete/:id", deleteEventSchedule)

eventRouter.get("/schedule/list/", viewAllEventSchedules)
eventRouter.get("/schedule/list/:id", viewEventSchedule)

/* EVENT ATTENDANCE */
eventRouter.post("/attendees/add", addEventAttendance)

eventRouter.put("/attendees/update/:id", updateEventAttendace)

eventRouter.delete("/attendees/delete/:id", deleteEventAttendance)

eventRouter.get("/attendees/list/all", viewAllEventAttendances)
// eventRouter.get("/attendees/list/:id", viewEventSchedule)

export default eventRouter