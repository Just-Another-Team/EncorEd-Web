

import { Request, Response } from 'express';
import { converter } from '../models/converter';
import { db } from '../database';
import IBaseService from '../interfaces/IBaseService';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import IDepartment from '../models/department.model';
import IFloor from '../models/floor.model';

export const departmentCollection = db.collection("/Department/").withConverter(converter<IDepartment>())

class DepartmentService implements IBaseService {
    public async add(req: Request<ParamsDictionary, any, IDepartment, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        const department: IDepartment = {
            DEPT_NAME: req.body.DEPT_NAME,
            DEPT_DEAN: req.body.DEPT_DEAN,
            DEPT_FLOORSASSIGNED: req.body.DEPT_FLOORSASSIGNED,
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
            DEPT_NAME: req.body.DEPT_NAME,
            DEPT_DEAN: req.body.DEPT_DEAN,
            DEPT_FLOORSASSIGNED: req.body.DEPT_FLOORSASSIGNED,
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
    public async assignDean(req: Request<ParamsDictionary, any, { USER_ID: string }, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        const { deptId } = req.params

        await departmentCollection.doc(deptId).update({
            DEPT_DEAN: req.body.USER_ID
        })
            .then(() => {
                res.status(200).json("Dean is assigned to Department successfully!")
            })
            .catch((error) => {
                res.status(400).json(error)
            })
    }
    public async view(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        const { id } = req.params
        
        await viewDepartmentHelper(id)
            .then((departmentDocs) => {
                res.status(200).json(departmentDocs)
            })
            .catch((error) => {
                console.error(error)
                res.status(400).json(error.message)
            })
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

export const viewDepartmentHelper = (id: string) => {
    return departmentCollection.doc(id).get()
        .then((department): IDepartment => ({
            DEPT_ID: department.id,
            DEPT_DEAN: department.data()?.DEPT_DEAN as string,
            DEPT_FLOORSASSIGNED: department.data()?.DEPT_FLOORSASSIGNED as Array<IFloor>,
            DEPT_NAME: department.data()?.DEPT_NAME as string
        }))
        .catch((error) => Promise.reject(error))
}

export default new DepartmentService