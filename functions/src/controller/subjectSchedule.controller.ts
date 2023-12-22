import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import {
    db,
    Timestamp
} from '../database';
import IService from '../interfaces/IBaseService';
import ISubjectSchedule from "../models/subjectSchedule.model"
import IBaseService from '../interfaces/IBaseService';
import { converter } from '../models/converter';
import ErrorController from '../types/ErrorController';

const subjectScheduleCollection = db.collection('/subjectSchedules/').withConverter(converter<ISubjectSchedule>())

class SubjectScheduleService implements IBaseService {
    public async viewAll(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        try {
            const subejctScheduleRef = await subjectScheduleCollection.get()

            const subjects = subejctScheduleRef.docs.map(schedule => ({id: schedule.id, ...schedule.data()}))

            res.status(200).json(subjects)

        } catch (error) {
            if (error instanceof Error) {
                const subjectControllerError: ErrorController = {
                    name: "Subject",
                    error: true,
                    errorType: "Controller Error",
                    control: "View All",
                    message: error.message
                }
                
                res.status(400).json(subjectControllerError) //Get this outside of the if statement
            }
        } 
    }
    add(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        throw new Error('Method not implemented.');
    }
    update(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        throw new Error('Method not implemented.');
    }
    public async delete(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        const subjectId = req.params.id;

        try {
            await subjectScheduleCollection.doc(subjectId).delete();

            res.status(200).json({ message: "Subject Schedule Deleted Successfully!" })

        } catch (error) {
            if (error instanceof Error) {
                const subjectControllerError: ErrorController = {
                    name: "Subject Schedule",
                    error: true,
                    errorType: "Controller Error",
                    control: "Delete",
                    message: error.message
                }
                
                res.status(400).json(subjectControllerError) //Get this outside of the if statement
            }
        } 
    }
    view(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        throw new Error('Method not implemented.');
    }
}

// const addSubjectSchedule = async (req, res) => {
    
//     try {
        
//         const {
//             subId,
//             roomId,
//             assignedWeek,
//             startTime,
//             endTime,
//             createdBy,
//             verifiedBy,
//             status
//         } = req.body
    
//         let subjectSchedule = new SubjectSchedule(
//             subId,
//             roomId,
//             assignedWeek, 
//             new Date(startTime),
//             new Date(endTime),
//             createdBy,
//             verifiedBy,
//             status
//         )
    
//         const subjectScheduleDocRef = db.doc(`/subjectSchedule/`).withConverter(subScheduleConverter)
    
//         await subjectScheduleDocRef.create(subjectSchedule)
//             .then((result) => {
//                 res.status(200).json({id: subjectScheduleDoc.id, message: "Subject Schedule added successfully"})
//             })
//             .catch((err) => {
//                 throw {name: "Subject Schedule", type: "Add", message: err.message}
//             })

//     } catch (e) {
//         res.status(400).json({error: e.message})
//     }
// }

// const updateSubjectSchedule = async (req, res) => {
//     const id = req.params.id;

//     try {
//         //If ID exist

//         let subjectSchedule = new SubjectSchedule(
//             req.body.subId,
//             req.body.roomId,
//             req.body.assignedWeek,
//             new Date(req.body.startTime),
//             new Date(req.body.endTime),
//             req.body.createdBy,
//             req.body.verifiedBy,
//             req.body.status
//         );

//         const subScheduleDocRef = db.doc(`/subjectSchedules/${id}`).withConverter(subScheduleConverter);

//         await subScheduleDocRef.update(Object.assign({}, subjectSchedule))
//             .then((result) => {
//                 res.status(200).json({message: "Data updated successfully!"})
//             })
//             .catch((err) => {
//                 throw {name: "Subject Schedule", type: "Update", message: err.message}
//             })
//     } catch (e) {
//         res.status(400).json({name: e.name, type: e.type, error: e.message})
//     }
// }

// const deleteSubjectSchedule = async (req, res) => {
//     const id = req.params.id;

//     try {
//         const subScheduleDocRef = db.doc(`/subjectSchedules/${id}`).withConverter(subjectScheduleCollection);

//         //If id exists

//         await subScheduleDocRef.delete();

//         res.status(200).json({message: "Data deleted successfully."})
//     } catch (e) {
//         res.status(400).json({name: "Subject Schedule", type: "Delete", error: e.message})
//     }
// }

// const viewAllSubjectSchedule = async (req, res) => {
//     const schedules = []

//     try {
//         const getSubSchedDocs = await subjectScheduleCollection.get();

//         if (getSubSchedDocs.empty)
//             throw {message: "Subject Schedule collections is empty"};

//         getSubSchedDocs.forEach((schedule) => {
//             const {
//                 subId,
//                 roomId,
//                 assignedWeek,
//                 startTime,
//                 endTime,
//                 createdBy,
//                 verifiedBy,
//                 status
//             } = schedule.data();

//             schedules.push({
//                 id: schedule.id,
//                 subId: subId,
//                 roomId: roomId,
//                 assignedWeek: assignedWeek,
//                 startTime: new Timestamp(startTime.seconds, startTime.nanoseconds).toDate(),
//                 endTime: new Timestamp(endTime.seconds, endTime.nanoseconds).toDate(),
//                 createdBy: createdBy,
//                 verifiedBy: verifiedBy,
//                 status: status
//             })
//         })

//         res.status(200).json(schedules)
//     }
//     catch(e) {
//         res.status(400).json({error: e.message})
//     }
// }

// const viewSubjectSchedule = async (req, res) => {
//     const id = req.params.id

//     try {
//         const subScheduleRef = doc(db, "subjectSchedules", id).withConverter(subScheduleConverter)
//         const subjectScheduleDoc = await getDoc(subScheduleRef)

//         if (subjectScheduleDoc.data() === undefined)
//             throw new Error(`${id} does not exist.`)

//         let subjectSchedule = new SubjectSchedule(
//             subjectScheduleDoc.data().subId,
//             subjectScheduleDoc.data().roomId,
//             subjectScheduleDoc.data().assignedWeek,
//             new Timestamp(subjectScheduleDoc.data().startTime.seconds, subjectScheduleDoc.data().startTime.nanoseconds).toDate(),
//             new Timestamp(subjectScheduleDoc.data().endTime.seconds, subjectScheduleDoc.data().endTime.nanoseconds).toDate(),
//             subjectScheduleDoc.data().createdBy,
//             subjectScheduleDoc.data().verifiedBy,
//             subjectScheduleDoc.data().status
//         )

//         res.status(200).json(subjectSchedule)
//     }
//     catch (e) {
//         res.status(400).json({error: "Error", message: e.message})
//     }
// }

export {
    subjectScheduleCollection
}

export default new SubjectScheduleService;