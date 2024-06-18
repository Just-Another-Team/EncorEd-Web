
import { Router } from 'express'
import navigation from '../controller/navigation.controller';

const navigationRouter = Router();

navigationRouter.get("/token", navigation.getAccessToken)

navigationRouter.post("/add/log", navigation.addLog)

navigationRouter.post("/initialize", navigation.initializeGraph)
navigationRouter.post("/generate", navigation.generatePath)


export default navigationRouter