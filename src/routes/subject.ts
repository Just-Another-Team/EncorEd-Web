import { Router } from 'express'
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

const subjectRouter = Router();

/* SUBJECT */
subjectRouter.post("/add", addSubject)

subjectRouter.put("/update/:id", updateSubject)

subjectRouter.delete("/delete/:id", deleteSubject)

subjectRouter.get("/list", viewAllSubject)
subjectRouter.get("/list/:id", viewSubject)

// subjectRouter.get("/list/:institutionId/") <- Get Subject By Institution
// subjectRouter.get("/list/:institutionId/:id") <- Get Subject By Institution and by Id

/* SUBJECT SCHEDULE */
subjectRouter.post("/schedule/add", addSubjectSchedule)

subjectRouter.put("/schedule/update/:id", updateSubjectSchedule)

subjectRouter.delete("/schedule/delete/:id", deleteSubjectSchedule)

subjectRouter.get("/schedule/list", viewAllSubjectSchedule)
subjectRouter.get("/schedule/list/:id", viewSubjectSchedule)

/* SUBJECT ATTENDANCE */
subjectRouter.post("/attendance/add", addSubAttendance)

subjectRouter.put("/attendance/update/:id", updateSubAttendance)

subjectRouter.delete("/attendance/delete/:id", deleteSubAttendance)

subjectRouter.get("/attendance/list", viewAllSubAttendance)

export default subjectRouter