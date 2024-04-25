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
userRouter.post("/kiosk/add", user_controller_1.default.addKiosk);
userRouter.delete("/delete/:id", user_controller_1.default.delete);
userRouter.put("/update/:id", user_controller_1.default.update);
userRouter.put("/kiosk/update/:id", user_controller_1.default.updateKiosk);
userRouter.patch("/:id/department", user_controller_1.default.assignDepartment);
userRouter.get("/view/s/:id", user_controller_1.default.view);
userRouter.get("/view/s/auth/:id", user_controller_1.default.viewAuth);
userRouter.get("/view/all", user_controller_1.default.viewAll);
exports.default = userRouter;
//# sourceMappingURL=user.js.map