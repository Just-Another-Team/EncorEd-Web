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
import IAttendance from '../models/attendance.model';

const attendanceCollection = db.collection(`/attendance/`).withConverter(converter<IAttendance>())

class attendance {
    public async viewAttendance(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        const institutionId = req.params.institution;

        try {
            const attendanceRef = await attendanceCollection.where('institution', '==', institutionId).get()

            const attendances = attendanceRef.docs.map(attendance => {
                return  {id: attendance.id, ...attendance.data() as IAttendance}
            })
            res.status(200).json(attendances)

        } catch (error) {
            if (error instanceof Error) {
                const attendanceControllerError: ErrorController = {
                    name: "Attendance",
                    error: true,
                    errorType: "Controller Error",
                    control: "View All",
                    message: error.message
                }
                
                res.status(400).json(attendanceControllerError) //Get this outside of the if statement
            }
        } 
    }
}

export default new attendance;