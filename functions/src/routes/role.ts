import { Router } from 'express'
import role from '../controller/role.controller';

const roleRouter = Router();

/* CRUD Role */
roleRouter.post("/add", role.add)

roleRouter.put("/update/:id", role.update)
roleRouter.delete("/delete/:id", role.delete)

roleRouter.get("/view/all", role.viewAll)
roleRouter.get("/view/:id", role.view)

// /* Assigning Roles */

export default roleRouter