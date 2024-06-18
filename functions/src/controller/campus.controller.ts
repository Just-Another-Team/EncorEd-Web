

import { Request, Response } from 'express';
import { converter } from '../models/converter';
import { db } from '../database';
import IBaseService from '../interfaces/IBaseService';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import IDepartment from '../models/department.model';
import { ICampus } from '../models/campus.model';

export const campusCollection = db.collection("/Campus/").withConverter(converter<ICampus>())

class CampusController implements IBaseService {
    view(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        throw new Error('Method not implemented.');
    }
    viewAll(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        throw new Error('Method not implemented.');
    }
    public async add(req: Request<ParamsDictionary, any, ICampus, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        const campus: ICampus = {
            ...req.body,
            CMPS_ISDELETED: false
        }
        
        await campusCollection.doc().set(campus)
            .then(() => {
                res.status(200).json("Campus added successfully!")
            })
            .catch((error) => {
                res.status(400).json(error)
            })
    }
    public async update(req: Request<ParamsDictionary, any, ICampus, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        const { id } = req.params
        
        await campusCollection.doc(id).update({
            ...req.body,
            CMPS_ISDELETED: false
        })
            .then(() => {
                res.status(200).json("Campus updated successfully!")
            })
            .catch((error) => {
                console.error(error)
                res.status(400).json(error)
            })
    }
    public async delete(req: Request<ParamsDictionary, any, IDepartment, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        const { id } = req.params
        
        await campusCollection.doc(id).update({
            CMPS_ISDELETED: true,
        })
            .then(() => {
                res.status(200).json("Campus is deleted successfully!")
            })
            .catch((error) => {
                console.error(error)
                res.status(400).json(error)
            })
    }
}

export default new CampusController