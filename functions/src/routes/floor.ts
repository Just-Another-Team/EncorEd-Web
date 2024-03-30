import { Router } from "express";
import floor from '../controller/floor.controller'

const floorRouter = Router();

floorRouter.get("/view/all", floor.viewAll);

floorRouter.post("/add", floor.add);
floorRouter.post("/add/all", floor.addMultiple);

export default floorRouter