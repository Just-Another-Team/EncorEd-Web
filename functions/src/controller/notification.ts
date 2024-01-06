import {
    db,
    Timestamp,
    Filter,
} from '../database'
import { converter } from '../models/converter'
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import ErrorController from '../types/ErrorController';
import INotification from '../models/notification.model';

const notificationCollection = db.collection(`/notification/`).withConverter(converter<INotification>())

class notification {
    public async viewNotification(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        const institutionId = req.params.institution;

        try {
            const notificationRef = await notificationCollection.where('institution', '==', institutionId).get()

            const notifications = notificationRef.docs.map(notification => {
                return  {id: notification.id, ...notification.data() as INotification}
            })
            res.status(200).json(notifications)

        } catch (error) {
            if (error instanceof Error) {
                const notificationControllerError: ErrorController = {
                    name: "Notification",
                    error: true,
                    errorType: "Controller Error",
                    control: "View All",
                    message: error.message
                }
                
                res.status(400).json(notificationControllerError) //Get this outside of the if statement
            }
        } 
    }
}

export default new notification;