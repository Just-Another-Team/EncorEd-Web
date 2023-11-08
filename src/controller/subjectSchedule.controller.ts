import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import {
    db,
    Timestamp,
    serverTimestamp,
} from '../database';
import IService from '../interfaces/IService';
import {
    SubjectSchedule,
    subScheduleConverter
} from "../models/subjectSchedule.model"

const subjectScheduleCollection = db.collection('/subjectSchedules/').withConverter(subScheduleConverter)

class SubjectScheduleService implements IService {
    add(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        throw new Error('Method not implemented.');
    }
    update(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        throw new Error('Method not implemented.');
    }
    delete(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        throw new Error('Method not implemented.');
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