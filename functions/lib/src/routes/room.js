"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const room_controller_1 = __importDefault(require("../controller/room.controller"));
const roomRouter = (0, express_1.Router)();
roomRouter.get("/view/all", room_controller_1.default.viewAll);
roomRouter.get("/view/s/:id", room_controller_1.default.view);
//roomRouter.get("/view/subject", room.viewWithSubjects);
roomRouter.post("/add", room_controller_1.default.add);
roomRouter.delete("/delete/:id", room_controller_1.default.delete);
roomRouter.patch("/update/:id", room_controller_1.default.update);
exports.default = roomRouter;
//# sourceMappingURL=room.js.map