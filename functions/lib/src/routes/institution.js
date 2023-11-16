"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const institution_controller_1 = __importDefault(require("../controller/institution.controller"));
const institutionRouter = (0, express_1.Router)();
institutionRouter.post("/add", institution_controller_1.default.add);
institutionRouter.put("/update/:id", institution_controller_1.default.update);
institutionRouter.delete("/delete/:id", institution_controller_1.default.delete);
institutionRouter.get("/list/all", institution_controller_1.default.viewAll);
institutionRouter.get("/list/:id", institution_controller_1.default.view);
exports.default = institutionRouter;
//# sourceMappingURL=institution.js.map