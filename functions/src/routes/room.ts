import { Router } from "express";
import room from '../controller/room.controller'

const roomRouter = Router();

roomRouter.get("/view/all", room.viewAll);
roomRouter.get("/view/s/:id", room.view);
//roomRouter.get("/view/subject", room.viewWithSubjects);

roomRouter.post("/add", room.add);

export default roomRouter