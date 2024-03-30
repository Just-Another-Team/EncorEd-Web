import { Router } from 'express'
import userService from "../controller/user.controller"

const userRouter = Router();

//If user exists

userRouter.post("/add", userService.add);
userRouter.get("/view/s/:id", userService.view)
userRouter.get("/view/all", userService.viewAll)

export default userRouter