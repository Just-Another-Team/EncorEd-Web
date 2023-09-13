const router = require('express').Router()
const {
    addSubject,
    deleteSubject,
    updateSubject,
    viewAllSubject,
    viewSubject
} = require("../controller/subject.controller")
const {
    addSubjectSchedule,
    deleteSubjectSchedule,
    viewAllSubjectSchedule,
    viewSubjectSchedule,
    updateSubjectSchedule
} = require("../controller/subjectSchedule.controller");

/* SUBJECT */
router.post("/add", addSubject)

router.put("/update/:id", updateSubject)

router.delete("/delete/:id", deleteSubject)

router.get("/list", viewAllSubject)
router.get("/list/:id", viewSubject)

/* SUBJECT SCHEDULE */
router.post("/schedule/add", addSubjectSchedule)

router.put("/schedule/update/:id", updateSubjectSchedule)

router.delete("/schedule/delete/:id", deleteSubjectSchedule)

router.get("/schedule/list", viewAllSubjectSchedule)
router.get("/schedule/list/:id", viewSubjectSchedule)

/* SUBJECT PARTICIPANTS */

module.exports = router