"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subject_controller_1 = __importDefault(require("../controller/subject.controller"));
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
const subjectRouter = (0, express_1.Router)();
/* SUBJECT */
subjectRouter.post("/add", subject_controller_1.default.add);
subjectRouter.put("/update/:id", subject_controller_1.default.update);
subjectRouter.delete("/delete/:id", subject_controller_1.default.delete);
subjectRouter.get("/list", subject_controller_1.default.viewAll);
subjectRouter.get("/list/:id", subject_controller_1.default.view);
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
exports.default = subjectRouter;
//# sourceMappingURL=subject.js.map