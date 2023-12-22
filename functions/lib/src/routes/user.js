"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controller/user.controller"));
const userRouter = (0, express_1.Router)();
//If user exists
userRouter.post("/add", user_controller_1.default.add);
userRouter.put("/update/:id", user_controller_1.default.update);
userRouter.get("/exist/:id", user_controller_1.default.isExist);
userRouter.get("/list/", user_controller_1.default.viewAll);
userRouter.get("/list/:id", user_controller_1.default.view);
userRouter.get("/list/auth/:email", user_controller_1.default.viewAuth);
//Add
//router.post("/add", isAuthentication, isAuthorized(['superadmin', 'admin']), addUser);
// userRouter.post("/signUp", signUp);
// userRouter.post("/admin/add", addAppAdmin)
// //Update
// userRouter.patch("/institution/assign", assignInstitution)
//Delete
userRouter.put("/delete/:id", user_controller_1.default.delete);
//View
userRouter.get("/list/u/:institution/:user", user_controller_1.default.viewAllByInstitution);
userRouter.get("/profile/:id", user_controller_1.default.viewUser);
// userRouter.get("/profile/:userName", viewUserByName)
//router.get("/list/:institution", <method for users based on institution>)
exports.default = userRouter;
//# sourceMappingURL=user.js.map