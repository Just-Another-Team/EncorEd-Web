import dayjs from 'dayjs';
import {
    db,
} from '../database';
import IBaseService from '../interfaces/IBaseService';
import ISubject from "../models/subject.model";
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { converter } from '../models/converter';
import ErrorController from '../types/ErrorController';
// import { viewUser, userCollection } from './user.controller';

export const subjectCollection = db.collection(`/subjects/`).withConverter(converter<ISubject | SubjectInput>())

type SubjectInput = {
    details?: ISubject;
    schedule?: object;
    assignedRoom?: object;

    createdBy?: string;
    creationDate?: string;
    updatedBy?: string;
    updatedDate?: string;

    institution?: string;
}

class SubjectService implements IBaseService {
    public async add(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        const reqSubject = req.body as ISubject;

        try {
            const subject: ISubject = {
                name: reqSubject.name,
                edpCode: reqSubject.edpCode,
                type: reqSubject.type,
                units: reqSubject.units,
                institution: reqSubject.institution!.toLowerCase().trim().replace(/\s/g, ''),
                
                creationDate: new Date().toISOString(),
                createdBy: reqSubject.createdBy,
                
                updatedDate: new Date().toISOString(),
                updatedBy: reqSubject.createdBy,

                verifiedBy: null, //Soon
                status: "Open"
            }

            // const subjectDocRef = await subjectCollection
            await subjectCollection.doc(`${subject.institution}-${subject.type.substring(0, 3).toLowerCase()}-${subject.name.toLowerCase().trim().replace(/\s/g, '')}`).create(subject)

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
                
                res.status(400).json(subjectControllerError) //Get this outside of the if statement
            }
        }

    }

    public async addAll(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        const reqSubject = req.body as Array<SubjectInput>

        try {
            const batch = db.batch();

            reqSubject.map((el) => {
                if (!!el.details) {
                    const reqSubjectDetails = el.details! as ISubject

                    const subject: ISubject = {
                        name: reqSubjectDetails.name,
                        edpCode: reqSubjectDetails.edpCode,
                        type: reqSubjectDetails.type,
                        units: reqSubjectDetails.units,
                        institution: el.institution!.toLowerCase().trim().replace(/\s/g, ''),
                        
                        creationDate: new Date().toISOString(),
                        createdBy: el.createdBy!,
                        
                        updatedDate: new Date().toISOString(),
                        updatedBy: el.createdBy!,
        
                        verifiedBy: null, //Soon
                        status: "Open"
                    }

                    const subjectDetailRef = subjectCollection.doc(`${subject.institution}-${subject.type.substring(0, 3).toLowerCase()}-${subject.name.toLowerCase().trim().replace(/\s/g, '')}`)
                    batch.create(subjectDetailRef, subject)
                }

                if (!!el.schedule) {
                    console.log("Schedule")
                }

                if (!!el.assignedRoom) {
                    console.log("Assigned Room")
                }
            })
    
            await batch.commit();

            res.status(200).json("Subjects added successfully!")
        } catch (error) {
            console.log(error)
            if (error instanceof Error) {
                const subjectControllerError: ErrorController = {
                    name: "Subject",
                    error: true,
                    errorType: "Controller Error",
                    control: "Add Bulk",
                    message: error.message
                }
                
                res.status(400).json(subjectControllerError) //Get this outside of the if statement
            }
        }
    }

    public async update(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        const subjectParamId = req.params.id;
        const reqSubject = req.body as ISubject;

        try{
            
            const subjectDoc = subjectCollection.doc(subjectParamId);

            const oldSubject = await subjectDoc.get()
                                                .then(subject => ({id: subject.id, ...subject.data()} as ISubject))
                                                .catch(error => { throw new Error(error) })

            const newSubject: ISubject = {
                name: reqSubject.name !== undefined ? reqSubject.name : oldSubject.name,

                edpCode: reqSubject.edpCode !== undefined ? reqSubject.edpCode : oldSubject.edpCode,
                type: reqSubject.type !== undefined ? reqSubject.type : oldSubject.type,
                units: reqSubject.units !== undefined ? reqSubject.units : oldSubject.units,

                institution: reqSubject.institution !== undefined ? reqSubject.institution.toLowerCase().trim().replace(/\s/g, '') : oldSubject.institution,
                
                creationDate: oldSubject.creationDate,
                createdBy: oldSubject.createdBy,
                
                updatedDate: reqSubject.updatedDate,
                updatedBy: reqSubject.updatedBy,

                verifiedBy: reqSubject.verifiedBy !== undefined ? reqSubject.verifiedBy : oldSubject.verifiedBy,
                status: oldSubject.status
            }

            const newSubId = `${newSubject.institution}-${newSubject.type.substring(0, 3).toLowerCase()}-${newSubject.name.toLowerCase().trim().replace(/\s/g, '')}`;

            if (oldSubject.id !== newSubId) {
                await subjectDoc.delete().then(() => { console.log("Successfully Updated Subject - Firestore (Delete Old)") }).catch(error => { throw new Error(error) })
                await subjectCollection.doc(newSubId).set(newSubject)
            }
            else await subjectCollection.doc(newSubId).update(newSubject)

            res.status(200).json({ message: "Subject updated successfully" })
        }
        catch(error) {
            if (error instanceof Error) {
                const subjectControllerError: ErrorController = {
                    name: "Subject",
                    error: true,
                    errorType: "Controller Error",
                    control: "Update",
                    message: error.message,
                    stack: error.stack
                }
                console.error(error)
                
                res.status(400).json(subjectControllerError) //type: error.type, code: error.code
            }
        }
    }

    public async delete(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        const subjectId = req.params.id;

        try {
            await subjectCollection.doc(subjectId).delete();

            res.status(200).json({ message: "Subject Deleted Successfully!" })

        } catch (error) {
            if (error instanceof Error) {
                const subjectControllerError: ErrorController = {
                    name: "Subject",
                    error: true,
                    errorType: "Controller Error",
                    control: "View",
                    message: error.message
                }
                
                res.status(400).json(subjectControllerError) //Get this outside of the if statement
            }
        } 
    }

    public async view(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        const subjectId = req.params.id;

        try {
            const subjectRef = await subjectCollection.doc(subjectId).get()

            res.status(200).json({id: subjectRef.id, ...subjectRef.data()})

        } catch (error) {
            if (error instanceof Error) {
                const subjectControllerError: ErrorController = {
                    name: "Subject",
                    error: true,
                    errorType: "Controller Error",
                    control: "View",
                    message: error.message
                }
                
                res.status(400).json(subjectControllerError) //Get this outside of the if statement
            }
        } 
    }

    public async viewAll(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        try {
            const subjectRef = await subjectCollection.get()

            const subjects = subjectRef.docs.map(subject => ({id: subject.id, ...subject.data()}))

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

    public async viewAllByInstitution(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        const institutionId = req.params.institution;

        try {
            const subjectRef = await subjectCollection.where('institution', '==', institutionId)
                                                        .where('status', '==', 'Open')
                                                        .get()

            console.log("Is this being searched??")

            const subjects = subjectRef.docs.map(subject => ({
                details: {id: subject.id, ...subject.data() as ISubject},
            }))

            // details?: ISubject;
            // schedule?: object;
            // assignedRoom?: object;

            // createdBy?: string;
            // creationDate?: string;
            // updatedBy?: string;
            // updatedDate?: string;

            // institution?: string;

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