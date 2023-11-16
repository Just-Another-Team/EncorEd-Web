"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const role_controller_1 = __importDefault(require("../controller/role.controller"));
const userRole_controller_1 = __importDefault(require("../controller/userRole.controller"));
const roleRouter = (0, express_1.Router)();
/* CRUD Role */
roleRouter.post("/add", role_controller_1.default.add);
roleRouter.put("/update/:id", role_controller_1.default.update);
roleRouter.delete("/delete/:id", role_controller_1.default.delete);
roleRouter.get("/list/", role_controller_1.default.viewAll);
roleRouter.get("/list/:id", role_controller_1.default.view);
roleRouter.get("/list/u/:institution", role_controller_1.default.viewAllByInsitution);
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
roleRouter.post("/assign", userRole_controller_1.default.assign);
roleRouter.get("/assign/user/:id", userRole_controller_1.default.viewAssignedRoles);
roleRouter.get("/assign/role/:id", userRole_controller_1.default.viewAssignedUsers);
exports.default = roleRouter;
//# sourceMappingURL=role.js.map