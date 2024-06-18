import { Router } from "express";
import department from '../controller/department.controller'


const departmentRouter = Router();

departmentRouter.get("/view/all", department.viewAll);
departmentRouter.get("/view/s/:id", department.view);

departmentRouter.put("/update/:id", department.update);

departmentRouter.patch("/assign/:deptId/dean", department.assignDean)

departmentRouter.delete("/delete/:id", department.delete);

departmentRouter.post("/add", department.add);


export default departmentRouter