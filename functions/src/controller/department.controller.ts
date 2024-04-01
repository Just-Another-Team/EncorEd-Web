

import { Request, Response } from 'express';
import { converter } from '../models/converter';
import { db } from '../database';
import { adminAuth } from '../authentication';
import IBaseService from '../interfaces/IBaseService';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import ErrorController from '../types/ErrorController';
import IDepartment from '../models/department.model';

export const departmentCollection = db.collection("/Department/").withConverter(converter<IDepartment>())

class DepartmentService implements IBaseService {
    public async add(req: Request<ParamsDictionary, any, IDepartment, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        const department: IDepartment = {
            DEPT_NAME: req.body.DEPT_NAME,
            DEPT_ISDELETED: false
        }
        
        await departmentCollection.doc().set(department)
            .then(() => {
                res.status(200).json("Department added successfully!")
            })
            .catch((error) => {
                res.status(400).json(error)
            })
    }
    public async update(req: Request<ParamsDictionary, any, IDepartment, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        const { id } = req.params
        
        await departmentCollection.doc(id).update({
            DEPT_NAME: req.body.DEPT_NAME
        })
            .then(() => {
                res.status(200).json("Department updated successfully!")
            })
            .catch((error) => {
                console.error(error)
                res.status(400).json(error)
            })
    }
    public async delete(req: Request<ParamsDictionary, any, IDepartment, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        const { id } = req.params
        
        await departmentCollection.doc(id).update({
            DEPT_ISDELETED: true,
        })
            .then(() => {
                res.status(200).json("Department is deleted successfully!")
            })
            .catch((error) => {
                console.error(error)
                res.status(400).json(error)
            })
    }
    public async view(req: Request<ParamsDictionary, any, IDepartment, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        throw new Error('Method not implemented.');
    }
    public async viewAll(req: Request<ParamsDictionary, any, IDepartment, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        await departmentCollection.get()
            .then((departmentDocs) => {
                let departments = departmentDocs.docs.map((department): IDepartment => ({
                    DEPT_ID: department.id,
                    ...department.data() as IDepartment
                }))

                res.status(200).json(departments.filter((department) => !department.DEPT_ISDELETED))
            })
            .catch((error) => {
                console.error(error)
                res.status(400).json(error.message)
            })
    }
}

export default new DepartmentService