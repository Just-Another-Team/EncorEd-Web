import { Router } from "express";
import notification from '../controller/notification'


const notificationRouter = Router();

notificationRouter.get("/report/:institution", notification.viewNotification);

export default notificationRouter