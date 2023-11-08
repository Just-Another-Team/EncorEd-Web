import { Router } from 'express'
import userService from "../controller/user.controller"

const userRouter = Router();

//If user exists

//Add
//router.post("/add", isAuthentication, isAuthorized(['superadmin', 'admin']), addUser);
userRouter.post("/add", userService.add);
// userRouter.post("/signUp", signUp);
// userRouter.post("/admin/add", addAppAdmin)

// //Update
userRouter.put("/update/:id", userService.update)
// userRouter.patch("/institution/assign", assignInstitution)

// //Delete
// userRouter.delete("/delete/:id", deleteUser)

//View
userRouter.get("/list", userService.view)
// userRouter.get("/list/u/:institution", viewAllUsersByInstitution)
// userRouter.get("/list/:id", viewUser)
// userRouter.get("/profile/:userName", viewUserByName)
//router.get("/list/:institution", <method for users based on institution>)

export default userRouter