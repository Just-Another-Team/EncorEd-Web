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
userRouter.get("/view/s/:id", user_controller_1.default.view);
userRouter.get("/view/all", user_controller_1.default.viewAll);
exports.default = userRouter;
//# sourceMappingURL=user.js.map