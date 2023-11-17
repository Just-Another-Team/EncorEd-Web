import { Router } from 'express'
import SubjectService from "../controller/subject.controller"
// import {
//     addSubjectSchedule,
//     deleteSubjectSchedule,
//     viewAllSubjectSchedule,
//     viewSubjectSchedule,
//     updateSubjectSchedule
// } from "../controller/subjectSchedule.controller";
// import {
//     addSubAttendance,
//     deleteSubAttendance,
//     updateSubAttendance,
//     viewAllSubAttendance
// } from "../controller/subjectAttendance.controller"

const subjectRouter = Router();

/* SUBJECT */
subjectRouter.post("/add", SubjectService.add)
subjectRouter.put("/update/:id", SubjectService.update)
subjectRouter.delete("/delete/:id", SubjectService.delete)
subjectRouter.get("/list", SubjectService.viewAll)
subjectRouter.get("/list/:id", SubjectService.view)
subjectRouter.get("/list/u/:institution", SubjectService.viewAllByInstitution)

// subjectRouter.get("/list/:institutionId/") <- Get Subject By Institution
// subjectRouter.get("/list/:institutionId/:id") <- Get Subject By Institution and by Id

/* SUBJECT SCHEDULE */
// subjectRouter.post("/schedule/add", addSubjectSchedule)
// subjectRouter.put("/schedule/update/:id", updateSubjectSchedule)
// subjectRouter.delete("/schedule/delete/:id", deleteSubjectSchedule)
// subjectRouter.get("/schedule/list", viewAllSubjectSchedule)
// subjectRouter.get("/schedule/list/:id", viewSubjectSchedule)

/* SUBJECT ATTENDANCE */
// subjectRouter.post("/attendance/add", addSubAttendance)
// subjectRouter.put("/attendance/update/:id", updateSubAttendance)
// subjectRouter.delete("/attendance/delete/:id", deleteSubAttendance)
// subjectRouter.get("/attendance/list", viewAllSubAttendance)

export default subjectRouter