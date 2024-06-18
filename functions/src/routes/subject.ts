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
subjectRouter.post("/add/multiple", SubjectService.addMultiple)

subjectRouter.get("/view/q/", SubjectService.viewBySchedule)
subjectRouter.get("/view/all", SubjectService.viewAll)
subjectRouter.get("/view/s/:id", SubjectService.view)

subjectRouter.put("/update/:id", SubjectService.update)
subjectRouter.delete("/delete/:id", SubjectService.delete)
subjectRouter.patch("/assign/teacher/remove", SubjectService.removeAssignInstructor)

subjectRouter.patch("/assign/:subId/teacher", SubjectService.assignInstructor)
subjectRouter.patch("/assign/:subId/room", SubjectService.assignRoom)

export default subjectRouter