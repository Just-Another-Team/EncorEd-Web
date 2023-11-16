import { Router } from "express";
import Institution from "../controller/institution.controller"

const institutionRouter = Router();

institutionRouter.post("/add", Institution.add);
institutionRouter.put("/update/:id", Institution.update)
institutionRouter.delete("/delete/:id", Institution.delete)
institutionRouter.get("/list/all", Institution.viewAll);
institutionRouter.get("/list/:id", Institution.view)

export default institutionRouter