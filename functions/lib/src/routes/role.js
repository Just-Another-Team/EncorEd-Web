"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const role_controller_1 = __importDefault(require("../controller/role.controller"));
const roleRouter = (0, express_1.Router)();
/* CRUD Role */
roleRouter.post("/add", role_controller_1.default.add);
roleRouter.put("/update/:id", role_controller_1.default.update);
roleRouter.delete("/delete/:id", role_controller_1.default.delete);
roleRouter.get("/view/all", role_controller_1.default.viewAll);
roleRouter.get("/view/:id", role_controller_1.default.view);
// /* Assigning Roles */
exports.default = roleRouter;
//# sourceMappingURL=role.js.map