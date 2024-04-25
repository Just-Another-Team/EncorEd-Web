import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import IBaseService from "../interfaces/IBaseService";

import { db } from '../database';

import IRole from "../models/role.model";
import { converter } from "../models/converter";

export const roleCollection = db.collection(`/Role/`).withConverter(converter<IRole>())

class Role implements IBaseService {
    public async add(req: Request<ParamsDictionary, any, IRole, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        await roleCollection.add(req.body)
            .then(() => {
                res.status(200).json("Role successfully added!")
            })
            .catch((error) => {
                res.status(400).json(error)
            })
    }
    public async update(req: Request<ParamsDictionary, any, IRole, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        throw new Error("Method not implemented.");
    }
    public async delete(req: Request<ParamsDictionary, any, IRole, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        throw new Error("Method not implemented.");
    }
    public async view(req: Request<ParamsDictionary, any, IRole, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        throw new Error("Method not implemented.");
    }
    public async viewAll(req: Request<ParamsDictionary, any, IRole, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        await roleCollection.get()
            .then((roleDocuments) => {
                const roles = roleDocuments.docs.map((role):IRole => ({
                    ROLE_ID: role.id,
                    ROLE_LABEL: role.data().ROLE_LABEL as string,
                }))

                res.status(200).json(roles)
            })
            .catch((error) => {
                res.status(400).json(error)
            })
    }
}

export const viewRoleHelper = async (id: string): Promise<IRole> => {
    const roleData = await roleCollection.doc(id).get()

    return ({
        ROLE_ID: roleData.id,
        ROLE_LABEL: (roleData.data() as IRole).ROLE_LABEL
    })
}

export default new Role;