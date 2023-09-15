const router = require('express').Router()
const {
    addAttendee,
    deleteAttendee,
    updateAttendee,
    viewAllAttendees,
    viewAttendee
} = require("../controller/attendees.controller");

router.post("/add", addAttendee);

router.put("/update/:id", updateAttendee)

router.delete("/delete/:id", deleteAttendee)

router.get("/list/all", viewAllAttendees)
router.get("/list/:id", viewAttendee)

module.exports = router;