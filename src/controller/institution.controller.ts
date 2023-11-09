import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import {
    db,
    Timestamp,
} from '../database';
import IBaseService from '../interfaces/IBaseService';
import { converter } from '../models/converter';
import IInstitution from "../models/institution.model"
import ErrorController from '../types/ErrorController';

export const institutionCollection = db.collection(`/institutions/`).withConverter(converter<IInstitution>())

class Institution implements IBaseService {
    public async add(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        try {
            const reqInstitution = req.body as IInstitution;

            const institution: IInstitution = {
                id: reqInstitution.name.toLowerCase().replace(/\s/g,''),
                name: reqInstitution.name,
                desc: reqInstitution.desc,
                createdBy: reqInstitution.createdBy,
                creationDate: new Date().toISOString(),
                status: "Open"
            }

            await institutionCollection.doc(institution.id!).create(institution)

            res.status(200).json({message: "Institution added successfully"})
        } catch (error) {
            if (error instanceof Error) {
                const institutionControllerError: ErrorController = {
                    name: "Institution",
                    error: true,
                    errorType: "Controller Error",
                    control: "Add",
                    message: error.message
                }
                
                res.status(400).json(institutionControllerError) //type: error.type, code: error.code
            }
        }
    }

    public async update(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        const insitutionId = req.params.id;

        try {
            //const institutionDocRef = db.doc(`/institutions/${id}`).withConverter(institutionConverter);
            const institutionDoc = institutionCollection.doc(insitutionId)

            //If ID exist
            const oldInstitution = await institutionDoc.get().then(institutionRecord => ({id: institutionRecord.id, ...institutionRecord.data()}))

            const reqInstitution = req.body as IInstitution;

            const institution: IInstitution = {
                id: reqInstitution.name.toLowerCase().replace(/\s/g,''), 
                name: reqInstitution.name,
                desc: reqInstitution.desc,
                createdBy: reqInstitution.createdBy,
                creationDate: oldInstitution.creationDate!,
                status: "Open"
            }

            await institutionDoc.set(institution)
                .then(() => {
                    console.log("Successfully Updated Institution - Firestore (Set New)")
                })
            
            //Delete Old Id
            if (oldInstitution.id !== institution.id)
                await institutionDoc.delete()
                    .then(() => {
                        console.log("Successfully Updated Institution - Firestore (Delete Old)")
                    })

            res.status(200).json({message: "Institution updated successfully!"})
        } catch (error) {
            if (error instanceof Error) {
                const institutionControllerError: ErrorController = {
                    name: "Institution",
                    error: true,
                    errorType: "Controller Error",
                    control: "Update",
                    message: error.message
                }
                
                res.status(400).json(institutionControllerError) //type: error.type, code: error.code
            }
        }
    }
    
    public async delete(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        //Delete institution by status
    }

    public async view(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        try {
            const institutionId = req.params.id;

            const institution = await institutionCollection.doc(institutionId).get()
                .then((institutionRecord) => {
                    return ({
                        id: institutionRecord.id,
                        ...institutionRecord.data(),
                    })
                });

            res.status(200).json(institution);   
        } catch (error) {
            if (error instanceof Error) {
                const userControllerError: ErrorController = {
                    name: "Institution",
                    error: true,
                    errorType: "Controller Error",
                    control: "View",
                    message: error.message
                }
                
                res.status(400).json(userControllerError) //type: error.type, code: error.code
            }        
        }
    }

    public async viewAll(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        try {
            const institutionDoc = await institutionCollection.get();

            const institutions = institutionDoc.docs.map(institutionRecord => {
                const institution: IInstitution = {
                    id: institutionRecord.id,
                    ...institutionRecord.data()
                }

                return institution
            })

            res.status(200).json(institutions);   
        } catch (error) {
            if (error instanceof Error) {
                const institutionControllerError: ErrorController = {
                    name: "Institution",
                    error: true,
                    errorType: "Controller Error",
                    control: "View",
                    message: error.message
                }
                
                res.status(400).json(institutionControllerError) //type: error.type, code: error.code
            }
        }
    } 
}

export default new Institution