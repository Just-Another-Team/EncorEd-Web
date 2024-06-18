"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const navigation_controller_1 = __importDefault(require("../controller/navigation.controller"));
const navigationRouter = (0, express_1.Router)();
navigationRouter.get("/token", navigation_controller_1.default.getAccessToken);
navigationRouter.post("/add/log", navigation_controller_1.default.addLog);
navigationRouter.post("/initialize", navigation_controller_1.default.initializeGraph);
navigationRouter.post("/generate", navigation_controller_1.default.generatePath);
exports.default = navigationRouter;
//# sourceMappingURL=navigation.js.map