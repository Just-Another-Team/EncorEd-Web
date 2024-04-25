"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const department_controller_1 = __importDefault(require("../controller/department.controller"));
const departmentRouter = (0, express_1.Router)();
departmentRouter.get("/view/all", department_controller_1.default.viewAll);
departmentRouter.get("/view/s/:id", department_controller_1.default.view);
departmentRouter.put("/update/:id", department_controller_1.default.update);
departmentRouter.delete("/delete/:id", department_controller_1.default.delete);
departmentRouter.post("/add", department_controller_1.default.add);
exports.default = departmentRouter;
//# sourceMappingURL=department.js.map