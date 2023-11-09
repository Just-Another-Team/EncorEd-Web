import { Router } from 'express'
import userService from "../controller/user.controller"

const userRouter = Router();

//If user exists

userRouter.post("/add", userService.add);
userRouter.put("/update/:id", userService.update)

userRouter.get("/list/", userService.viewAll)
userRouter.get("/list/:id", userService.view)
userRouter.get("/list/institution/:id", userService.viewAllByInstitution)
userRouter.get("/list/auth/:email", userService.viewAuth)

//Add
//router.post("/add", isAuthentication, isAuthorized(['superadmin', 'admin']), addUser);
// userRouter.post("/signUp", signUp);
// userRouter.post("/admin/add", addAppAdmin)

// //Update

// userRouter.patch("/institution/assign", assignInstitution)

// //Delete
// userRouter.delete("/delete/:id", deleteUser)

//View
// userRouter.get("/list/u/:institution", viewAllUsersByInstitution)
// userRouter.get("/list/:id", viewUser)
// userRouter.get("/profile/:userName", viewUserByName)
//router.get("/list/:institution", <method for users based on institution>)

export default userRouter