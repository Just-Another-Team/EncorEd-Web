import { Router } from "express";
import attendance from '../controller/attendance.controller'


const attendanceRouter = Router();

attendanceRouter.get("/view/all", attendance.viewAttendances);
attendanceRouter.get("/view/reduced", attendance.viewReduceAttendances);
attendanceRouter.get("/view/s/:id", attendance.viewAttendances);


attendanceRouter.post("/add", attendance.addAttendance);


export default attendanceRouter