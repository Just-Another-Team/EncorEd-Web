import { Router } from 'express'
import RoleUser from '../controller/role.controller';
import UserRole from '../controller/userRole.controller'
// const {
//     assignRole,
//     removeRole, 
//     viewAssignedRoles
// } = require('../controller/userRole.controller')

const roleRouter = Router();

/* CRUD Role */
roleRouter.post("/add", RoleUser.add)
roleRouter.get("/list/", RoleUser.viewAll)
roleRouter.get("/list/:id", RoleUser.view)
roleRouter.put("/update/:id", RoleUser.update)
//roleRouter.post("/update")
//roleRouter.post("delete")
// roleRouter.post("/admin/signUp", addAdminRole)
// //roleRouter.post("/admin/add", addAdminRole)
// //Update
// //Delete
// roleRouter.get("/list/") //List by App Admin
// roleRouter.get("/list/:id") //Select role from list
// roleRouter.get("/list/:institution") //Select role by institution
// roleRouter.get("/list/:institution/:id") //Select role by institution and by id

// /* Assigning Roles */
roleRouter.post("/assign", UserRole.assign)
roleRouter.get("/assign/user/:id", UserRole.viewAssignedRoles)
roleRouter.get("/assign/role/:id", UserRole.viewAssignedUsers)

export default roleRouter