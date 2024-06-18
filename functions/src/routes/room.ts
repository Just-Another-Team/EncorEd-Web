import { Router } from "express";
import room from '../controller/room.controller'

const roomRouter = Router();

roomRouter.get("/view/all", room.viewAll);
roomRouter.get("/view/s/:id", room.view);
//roomRouter.get("/view/subject", room.viewWithSubjects);

roomRouter.post("/add", room.add);

roomRouter.delete("/delete/:id", room.delete)

roomRouter.patch("/update/:id", room.update)

export default roomRouter