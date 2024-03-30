"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const attendance_controller_1 = __importDefault(require("../controller/attendance.controller"));
const attendanceRouter = (0, express_1.Router)();
attendanceRouter.get("/view/all", attendance_controller_1.default.viewAttendances);
attendanceRouter.get("/view/s/:id", attendance_controller_1.default.viewAttendances);
attendanceRouter.post("/add", attendance_controller_1.default.addAttendance);
exports.default = attendanceRouter;
//# sourceMappingURL=attendance.js.map