"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const floor_controller_1 = __importDefault(require("../controller/floor.controller"));
const floorRouter = (0, express_1.Router)();
floorRouter.get("/view/all", floor_controller_1.default.viewAll);
floorRouter.post("/add", floor_controller_1.default.add);
floorRouter.post("/add/all", floor_controller_1.default.addMultiple);
exports.default = floorRouter;
//# sourceMappingURL=floor.js.map