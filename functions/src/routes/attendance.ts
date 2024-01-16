import { Router } from "express";
import attendance from '../controller/attendance.controller'


const attendanceRouter = Router();

attendanceRouter.get("/report/:institution", attendance.viewAttendance);

export default attendanceRouter