import { Router } from "express";
import Navigation from "../controller/navigation.controller";

const navigationRouter = Router();

navigationRouter.post("/initialize", Navigation.initializeGraph);
navigationRouter.post("/generatePath", Navigation.generatePath);

export default navigationRouter