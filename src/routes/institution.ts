import { Router } from "express";
const {
    addInstitution,
    updateInstitution,
    deleteInstitution,
    viewAllInstitutions,
    viewInstitution
} = require("../controller/institution.controller")

const institutionRouter = Router();

institutionRouter.post("/add", addInstitution);

institutionRouter.put("/update/:id", updateInstitution)

institutionRouter.delete("/delete/:id", deleteInstitution)

institutionRouter.get("/list/all", viewAllInstitutions);

institutionRouter.get("/list/:id", viewInstitution)

export default institutionRouter