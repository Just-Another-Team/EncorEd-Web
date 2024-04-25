import { Router } from 'express'
import userService from "../controller/user.controller"

const userRouter = Router();

//If user exists
userRouter.post("/add", userService.add);
userRouter.post("/kiosk/add", userService.addKiosk);

userRouter.delete("/delete/:id", userService.delete)

userRouter.put("/update/:id", userService.update)
userRouter.put("/kiosk/update/:id", userService.updateKiosk)

userRouter.patch("/:id/department", userService.assignDepartment)

userRouter.get("/view/s/:id", userService.view)
userRouter.get("/view/s/auth/:id", userService.viewAuth)
userRouter.get("/view/all", userService.viewAll)

export default userRouter