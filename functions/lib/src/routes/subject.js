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
subjectRouter.get("/view/q/", subject_controller_1.default.viewBySchedule);
subjectRouter.get("/view/all", subject_controller_1.default.viewAll);
subjectRouter.get("/view/s/:id", subject_controller_1.default.view);
subjectRouter.put("/update/:id", subject_controller_1.default.update);
subjectRouter.delete("/delete/:id", subject_controller_1.default.delete);
subjectRouter.patch("/assign/:subId/room", subject_controller_1.default.assignRoom);
exports.default = subjectRouter;
//# sourceMappingURL=subject.js.map