import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

import { Request, Response } from 'express';
import { converter } from '../models/converter';
import IUser, { IUserAuth } from '../models/user.model';
import { db } from '../database';
import { adminAuth, } from '../authentication';
import IBaseService from '../interfaces/IBaseService';
import ErrorController from '../types/ErrorController';
import { roleCollection } from './role.controller';
import { DocumentReference } from 'firebase-admin/firestore';
import IRole from '../models/role.model';
import IDepartment from '../models/department.model';

export const userCollection = db.collection("/User/").withConverter(converter<IUser>())

class UserService implements IBaseService {
    public async getKey(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        try {
            const apiKey: string = process.env.APIKEY!;
            res.status(200).json(apiKey)
        } catch (error) {
            if (error instanceof Error) {
                const userControllerError: ErrorController = {
                    name: "User",
                    error: true,
                    errorType: "Controller Error",
                    control: "Get API Key",
                    message: error.message
                }
                
                res.status(400).json(userControllerError)
            }
        }
    }
    public async add(req: Request<ParamsDictionary, any, IUser, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        const user: IUser = {
            USER_USERNAME: req.body.USER_USERNAME,
            USER_PASSWORD: req.body.USER_PASSWORD, //Should not have include this in the Firestore
            ROLE_ID: db.doc(`Role/${req.body.ROLE_ID}`),
            DEPT_ID: db.doc(`Department/${req.body.DEPT_ID}`),
            USER_ISDELETED: req.body.USER_ISDELETED,
        }

        await adminAuth.createUser({
            email: req.body.USER_EMAIL,
            password: req.body.USER_PASSWORD,
            displayName: `${req.body.USER_FNAME} ${req.body.USER_MNAME} ${req.body.USER_LNAME}`,
        }).then((result) => {
            return userCollection.doc(result.uid).set(user)
                .catch((error) => Promise.reject(error))
        }).then(() => {
            res.status(200).json("User successfully added!")
        }).catch((error) => {
            res.status(400).json(error)
        })
    }
    update(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        throw new Error('Method not implemented.');
    }
    delete(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        throw new Error('Method not implemented.');
    }
    public async view(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        const { id } = req.params

        await userCollection.doc(id).get()
            .then((userDoc) => {
                return viewUserHelper(userDoc.id, userDoc.data() as IUser);
            })
            .then((result) => {
                res.status(200).json(result)
            })
            .catch((error) => {
                res.status(400).json(error)
            })
    }
    public async viewAll(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        // Promise Chaining
        //  - Get the user authentication displayName and email
        //  - Get the user Role data based on the role ID
        //  - Get the user Department data based on department ID

        // The Promise.All method provides the array of user data
        // Afterall, the userDoc.docs.map is basically mapping the Promises

        await userCollection.get()
            .then((userDoc) => {
                const users = userDoc.docs.map((doc) => {
                    return viewUserHelper(doc.id, doc.data() as IUser);
                })

                return Promise.all(users)
                    .then((result => {
                        res.status(200).json(result)
                    }))
                    .catch((error) => Promise.reject(error))
            })
            .catch((error) => {
                res.status(400).json(error)
            })
    }
}

export const viewUserHelper = (id: string, user: IUser) => {
    return adminAuth.getUser(id)
            .then((result): IUserAuth => ({
                USER_FULLNAME: result.displayName,
                USER_EMAIL: result.email
            }))
            .then((result) => {
                return (user.ROLE_ID as DocumentReference).get()
                    .then((role) => ({
                        ...result,
                        ROLE_ID: role.id,
                        ROLE_LABEL: role.data()?.ROLE_LABEL,
                    }))
                    .catch((error) => Promise.reject(error))
            })
            .then((result) => {
                return (user.DEPT_ID as DocumentReference).get()
                    .then((department): IUserAuth & IRole & IDepartment => ({
                        ...result,
                        DEPT_ID: department.id,
                        DEPT_NAME: department.data()!.DEPT_NAME,
                        DEPT_STATUS: department.data()!.DEPT_STATUS
                    }))
                    .catch((error) => Promise.reject(error))
            })
            .then((result):IUser => ({
                ...user,
                USER_ID: id,
                USER_FULLNAME: result.USER_FULLNAME,
                USER_EMAIL: result.USER_EMAIL,
                ROLE_ID: {
                    ROLE_ID: result.ROLE_ID,
                    ROLE_LABEL: result.ROLE_LABEL,
                } as IRole,
                DEPT_ID: {
                    DEPT_ID: result.DEPT_ID,
                    DEPT_NAME: result.DEPT_NAME,
                    DEPT_STATUS: result.DEPT_STATUS
                } as IDepartment
            }))
            .catch((error) => Promise.reject(error))
}

export default new UserService;