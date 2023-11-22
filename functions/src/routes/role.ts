import { Router } from 'express'
import RoleUser from '../controller/role.controller';
import UserRole from '../controller/userRole.controller'

const roleRouter = Router();

/* CRUD Role */
roleRouter.post("/add", RoleUser.add)
roleRouter.put("/update/:id", RoleUser.update)
roleRouter.delete("/delete/:id", RoleUser.delete)

roleRouter.get("/list/", RoleUser.viewAll)
roleRouter.get("/list/:id", RoleUser.view)
roleRouter.get("/list/u/:institution", RoleUser.viewAllByInsitution)
//roleRouter.post("/update")
//roleRouter.post("delete")
// roleRouter.post("/admin/signUp", addAdminRole)
// //roleRouter.post("/admin/add", addAdminRole)
// //Update
// //Delete
// roleRouter.get("/list/") //List by App Admin
// roleRouter.get("/list/:id") //Select role from listy
// roleRouter.get("/list/:institution") //Select role by institution
// roleRouter.get("/list/:institution/:id") //Select role by institution and by id

// /* Assigning Roles */
roleRouter.post("/assign", UserRole.assign)
roleRouter.get("/assign/user/:id", UserRole.viewAssignedRoles)
roleRouter.get("/debug/user/:id", UserRole.viewAssignedRolesDebug)

roleRouter.get("/assign/role/:id", UserRole.viewAssignedUsers)

export default roleRouter