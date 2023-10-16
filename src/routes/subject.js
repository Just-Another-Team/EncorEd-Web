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
const {
    addSubAttendance,
    deleteSubAttendance,
    updateSubAttendance,
    viewAllSubAttendance
} = require("../controller/subjectAttendance.controller")

/* SUBJECT */
router.post("/add", addSubject)

router.put("/update/:id", updateSubject)

router.delete("/delete/:id", deleteSubject)

router.get("/list", viewAllSubject)
router.get("/list/:id", viewSubject)

// router.get("/list/:institutionId/") <- Get Subject By Institution
// router.get("/list/:institutionId/:id") <- Get Subject By Institution and by Id

/* SUBJECT SCHEDULE */
router.post("/schedule/add", addSubjectSchedule)

router.put("/schedule/update/:id", updateSubjectSchedule)

router.delete("/schedule/delete/:id", deleteSubjectSchedule)

router.get("/schedule/list", viewAllSubjectSchedule)
router.get("/schedule/list/:id", viewSubjectSchedule)

/* SUBJECT ATTENDANCE */
router.post("/attendance/add", addSubAttendance)

router.put("/attendance/update/:id", updateSubAttendance)

router.delete("/attendance/delete/:id", deleteSubAttendance)

router.get("/attendance/list", viewAllSubAttendance)

module.exports = router