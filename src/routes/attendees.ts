import { Router } from "express";
const {
    addAttendee,
    deleteAttendee,
    updateAttendee,
    viewAllAttendees,
    viewAttendee
} = require("../controller/attendees.controller");

const attendeeRouter = Router()

attendeeRouter.post("/add", addAttendee);

attendeeRouter.put("/update/:id", updateAttendee)

attendeeRouter.delete("/delete/:id", deleteAttendee)

attendeeRouter.get("/list/all", viewAllAttendees)
attendeeRouter.get("/list/:id", viewAttendee)

export default attendeeRouter;