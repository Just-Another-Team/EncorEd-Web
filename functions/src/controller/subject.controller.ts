import dayjs from 'dayjs';
import {
    db,
    Timestamp
} from '../database';
import IBaseService from '../interfaces/IBaseService';
import ISubject from "../models/subject.model";
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { converter } from '../models/converter';
import ErrorController from '../types/ErrorController';
// import { viewUser, userCollection } from './user.controller';

export const subjectCollection = db.collection(`/subjects/`).withConverter(converter<ISubject>())

class SubjectService implements IBaseService {
    public async add(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        
        try {
            const reqSubject = req.body as ISubject;

            const subject: ISubject = {
                name: reqSubject.name,
                edpCode: reqSubject.edpCode,
                type: reqSubject.type,
                units: reqSubject.units,
                institution: reqSubject.institution.toLowerCase().trim().replace(/\s/g, ''),
                
                creationDate: reqSubject.creationDate,
                createdBy: reqSubject.createdBy,
                
                //updatedDate
                //updatedBy

                verifiedBy: reqSubject.verifiedBy,
                status: reqSubject.status
            }

            // const subjectDocRef = await subjectCollection
            const subjectDoc = await subjectCollection.doc(`${subject.institution}-${subject.name.toLowerCase().trim().replace(/\s/g, '')}`)

            await subjectDoc.create(subject)

            res.status(200).json({message: "Subject added successfully"})

        } catch (error) {
            if (error instanceof Error) {
                const subjectControllerError: ErrorController = {
                    name: "Subject",
                    error: true,
                    errorType: "Controller Error",
                    control: "Add",
                    message: error.message
                }
                
                res.status(400).json(subjectControllerError) //type: error.type, code: error.code
            }
        }

    }

    public async update(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        throw new Error('Method not implemented.');
    }

    public async delete(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        throw new Error('Method not implemented.');
    }

    public async view(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        throw new Error('Method not implemented.');
    }

    public async viewAll(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        throw new Error('Method not implemented.');
    }
}

// const addSubject = async (req, res) => {
//     try {
//         let subject = new Subject(
//             req.body.name,
//             req.body.edpCode,
//             req.body.type,
//             req.body.units,
//             new Date(req.body.creationDate),
//             req.body.createdBy,
//             req.body.verifiedBy,
//             req.body.status
//         )

//         const subjectDocRef = await db.doc(`/subjects/`).withConverter(subjectConverter)

//         await subjectDocRef.create(subject)
//             .then((result) => {
//                 res.status(200).json({message: "Subject added successfully"})
//             })
//             .catch((err) => {
//                 throw {message: err.message}
//             })

//     } catch (e) {
//         res.status(400).json({name: "Subject", type: "Add", error: e.message})
//     }
// }

// const viewAllSubject = async (req, res) => {
    
//     //const subjects = []

//     try {
//         const getSubjectDocs = await subjectCollection.get();

//         if (getSubjectDocs.empty)
//             throw new Error("Subject collection is empty");

//         const subjects = await Promise.all(getSubjectDocs.docs.map(async (subject) => {
//             const {creationDate, createdBy} = subject.data()

//             const user = await userCollection.doc(createdBy).get()
//                 .then(res => res.data())
//                 .catch((error) => {throw error}) // "Throw is expensive"

//             return ({
//                 id: subject.id, //This should have been an edp code
//                 ...subject.data(),
//                 createdBy: user,
//                 creationDate: dayjs(new Timestamp(creationDate.seconds, creationDate.nanoseconds).toDate()).format("MMMM DD, YYYY"),
//             })
//         }))

//         res.status(200).json(subjects)
//     }
//     catch(e) {
//         res.status(400).json({error: e.message})
//     }
// }

// const viewSubject = async (req, res) => {
//     const id = req.params.id

//     try {
//         const subjectRef = db.doc(`/subjects/${id}`).withConverter(subjectConverter)
//         const subjectDoc = await subjectRef.get();

//         res.status(200).json(subjectDoc.data())
//     }
//     catch (e) {
//         res.status(400).json({error: "Error", message: e.message})
//     }
// }

// const updateSubject = async (req, res) => {
//     const id = req.params.id;

//     try {
//         const subjectDocRef = await db.doc(`/subjects/${id}`).withConverter(subjectConverter);

//         let subject = new Subject(
//             req.body.name,
//             req.body.edpCode,
//             req.body.type,
//             req.body.units,
//             new Date(req.body.creationDate),
//             req.body.createdBy,
//             req.body.verifiedBy,
//             req.body.status
//         );

//         await subjectDocRef.update(Object.create({}, subject))
//             .then((result) => {
//                 res.status(200).json({message: "Data updated successfully!"})
//             })
//             .catch((err) => {
//                 throw {message: err.message}
//             })

//         // await updateDoc(subjectSnapshot, {
//         //     name: subject.getName,
//         //     edpCode: subject.getEdpCode,
//         //     type: subject.getType,
//         //     units: subject.getUnits,
//         //     creationDate: subject.getCreationDate,
//         //     createdBy: subject.getCreatedBy,
//         //     verifiedBy: subject.getVerifiedBy,
//         //     status: subject.getStatus,
//         // })
//     } catch (e) {
//         res.status(400).json({name: "Subject", type: "Update", error: e.message})
//     }
// }

// const deleteSubject = async (req, res) => {
//     const id = req.params.id;

//     try {
//         const subjectDocRef = db.doc(`/subjects/${id}`).withConverter(subjectConverter);

//         await subjectDocRef.delete()
//             .then((result) => {
//                 res.status(200).json("Data deleted successfully.")
//             })
//             .catch((err) => {
//                 throw {message: err.message}
//             })
//     } catch (e) {
//         res.status(400).json({name: "Subject", type: "Delete", error: e.message})
//     }
// }

// module.exports = {addSubject, viewAllSubject, viewSubject, updateSubject, deleteSubject}

export default new SubjectService;