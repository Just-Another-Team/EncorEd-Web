import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

import { Request, Response } from 'express';
import { converter } from '../models/converter';
import IUser, { IUserAuth, IUserFireStore, IUserRole } from '../models/user.model';
import { db } from '../database';
import { adminAuth, } from '../authentication';
import IBaseService from '../interfaces/IBaseService';
import ErrorController from '../types/ErrorController';
import IDepartment from '../models/department.model';
import { viewDepartmentHelper } from './department.controller';
import { adminApp } from '../../config';
import { bucket, getDownloadURL, storage } from '../storage';
import { Stream } from 'stream';
import { fileType } from '../helper/base64FileType';

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
            USER_FNAME: req.body.USER_FNAME,
            USER_MNAME: req.body.USER_MNAME, //this was sent as null
            USER_LNAME: req.body.USER_LNAME,
            USER_USERNAME: req.body.USER_USERNAME,
            ROLE_ID: req.body.ROLE_ID,
            DEPT_ID: req.body.DEPT_ID,
            USER_ISDELETED: false,
            USER_CREATEDBY: req.body.USER_CREATEDBY,
            USER_UPDATEDBY: req.body.USER_UPDATEDBY,
            USER_ATTENDANCECHECKERSCHEDULE: req.body.USER_ATTENDANCECHECKERSCHEDULE,
        }

        console.log(req.body.USER_IMAGE)

        const role = user.ROLE_ID as IUserRole

        try {
            // const file = bucket.file(`Lost${fileType(base64EncodedString.charAt(0))}`)

            // bufferStream.pipe(file.createWriteStream())
            //     .on('error', (error) => {
            //         res.status(400).json(error.message)
            //     })
            //     .on('finish', () => {
            //         res.status(200).json("File upload complete")
            //     })

            await adminAuth.createUser({
                email: req.body.USER_EMAIL,
                password: role.teacher ? `${user.USER_LNAME?.toLowerCase()}123456` : req.body.USER_PASSWORD, //If teacher, then password === 123456
                displayName: `${req.body.USER_FNAME} ${req.body.USER_MNAME !== null ? req.body.USER_MNAME : ""} ${req.body.USER_LNAME}`,
            }).then(async (result) => {
                if (!req.body.USER_IMAGE || req.body.USER_IMAGE === "")
                    return result

                const base64EncodedString = req.body.USER_IMAGE!.replace(/^data:\w+\/\w+;base64,/, '')
                const bufferStream = new Stream.PassThrough();
                bufferStream.end(Buffer.from(base64EncodedString, 'base64'))

                const file = bucket.file(`${result.uid}${fileType(base64EncodedString.charAt(0))}`)

                bufferStream.pipe(file.createWriteStream())
                    .on('error', (error) => {
                        console.error(error.message)
                    })
                    .on('finish', () => {
                        console.log("File uploaded successfully!")
                    })

                return result
            }).then((result) => {
                return userCollection.doc(result.uid).set(user)
                    .catch((error) => Promise.reject(error))
            }).then(() => {
                res.status(200).json("User added successfully!")
            }).catch((error) => {
                console.error(error)
                res.status(400).json(error)
            })
        } catch (error) {
            res.status(400).json((error as any).message)
        }
    }
    public async addKiosk(req: Request<ParamsDictionary, any, IUser, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        const user: IUser = {
            USER_USERNAME: req.body.USER_USERNAME,
            ROLE_ID: req.body.ROLE_ID,
            DEPT_ID: req.body.DEPT_ID,
            USER_ISDELETED: false,
            USER_CREATEDBY: req.body.USER_CREATEDBY,
            USER_UPDATEDBY: req.body.USER_UPDATEDBY,
        }

        //Firestore first before Auth or Auth before Firestore?

        await adminAuth.createUser({
            email: req.body.USER_EMAIL,
            password: req.body.USER_PASSWORD,
            displayName: `${user.USER_USERNAME}`,
        }).then((result) => {
            return userCollection.doc(result.uid).set(user)
                .catch((error) => Promise.reject(error))
        }).then(() => {
            res.status(200).json("Kiosk added successfully!")
        }).catch((error) => {
            console.error(error)
            res.status(400).json(error.message)
        })
    }
    public async addFCMToken(req: Request<ParamsDictionary, any, { fcmToken: string }, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        const { id } = req.params

        await userCollection.doc(id).update({
            USER_FCMTOKEN: req.body.fcmToken,
        })
            .then(() => {
                console.log("FCM Token added to user successfully!")
                res.status(200).json("FCM Token added to user successfully!")
            })
            .catch((error) => {
                console.error(error)
                res.status(400).json(error)
            })
    }
    public async update(req: Request<ParamsDictionary, any, IUser, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        const { id } = req.params

        const user: IUser = {
            USER_FNAME: req.body.USER_FNAME,
            USER_MNAME: req.body.USER_MNAME,
            USER_LNAME: req.body.USER_LNAME,
            USER_USERNAME: req.body.USER_USERNAME,
            ROLE_ID: req.body.ROLE_ID,
            DEPT_ID: req.body.DEPT_ID,
            USER_UPDATEDBY: req.body.USER_UPDATEDBY,
            USER_ISDELETED: false,
            USER_ATTENDANCECHECKERSCHEDULE: req.body.USER_ATTENDANCECHECKERSCHEDULE,
        }

        const role = user.ROLE_ID as IUserRole

        await userCollection.doc(id).update(user)
            .then(() => {
                if (!req.body.USER_IMAGE || req.body.USER_IMAGE === "")
                    return

                const base64EncodedString = req.body.USER_IMAGE.replace(/^data:\w+\/\w+;base64,/, '')
                const bufferStream = new Stream.PassThrough();
                bufferStream.end(Buffer.from(base64EncodedString, 'base64'))

                const file = bucket.file(`${id}${fileType(base64EncodedString.charAt(0))}`)

                bufferStream.pipe(file.createWriteStream())
                    .on('error', (error) => {
                        console.error(error.message)
                    })
                    .on('finish', () => {
                        console.log("File updated successfully!")
                    })
            })
            .then(() => {
                return adminAuth.updateUser(id, {
                    email: req.body.USER_EMAIL,
                    displayName: `${req.body.USER_FNAME} ${req.body.USER_MNAME} ${req.body.USER_LNAME}`,
                    password: role.teacher ? `${user.USER_LNAME?.toLowerCase()}123456` : req.body.USER_PASSWORD 
                })
            })
            .then(() => {
                res.status(200).json("User updated successfully!")
            })
            .catch((error) => {
                console.error(error)
                res.status(400).json(error.message)
            })
    }
    public async updateKiosk(req: Request<ParamsDictionary, any, IUser, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        const { id } = req.params

        await userCollection.doc(id).update({
            USER_USERNAME: req.body.USER_USERNAME,
            USER_UPDATEDBY: req.body.USER_UPDATEDBY
        })
            .then(() => {
                return adminAuth.updateUser(id, {
                    email: req.body.USER_EMAIL,
                    displayName: req.body.USER_USERNAME,
                    password: req.body.USER_PASSWORD,
                })
            })
            .then(() => {
                res.status(200).json("Kiosk updated successfully!")
            })
            .catch((error) => {
                console.error(error)
                res.status(400).json(error)
            })
    }
    public async delete(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        const { id } = req.params

        //Delete user and disable user from logging in

        await userCollection.doc(id).update({
            USER_ISDELETED: true,
        })
            .then(() => {
                res.status(200).json("User is deleted successfully!")
            })
            .catch((error) => {
                console.error(error)
                res.status(400).json(error)
            })
    }
    public async assignDepartment(req: Request<ParamsDictionary, any, IDepartment, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        const { id } = req.params


    }
    public async view(req: Request<ParamsDictionary, any, IUser, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        const { id } = req.params

        if ((await userCollection.doc(id).get()).data() === undefined) {
            res.status(400).json("There is no user found in the database. Please try to register again.")
            return
        }

        await userCollection.doc(id).get()
            .then((userDoc) => {
                return viewUser.viewWithData(userDoc.id, userDoc.data() as IUser);
            })
            .then((result) => {
                res.status(200).json(result)
            })
            .catch((error) => {
                console.error('User Controller\n', error)
                res.status(400).json(error.message)
            })
    }
    public async viewAuth(req: Request<ParamsDictionary, any, IUser, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        const { id } = req.params

        await adminAuth.getUser(id)
            .then((result) => {
                res.status(201).json(result)
            })
            .catch((error) => {
                res.status(400).json(error.message)
            })
    }
    public async viewAll(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        // Promise Chaining
        //  - Get the user authentication displayName and email
        //  - Get the user Role data based on the role ID
        //  - Get the user Department data based on department ID

        // The Promise.All method provides the array of user data
        // Afterall, the userDoc.docs.map is basically mapping the Promises
        const users = (req.body as Array<IUser>).map((user) => {
            return viewUser.viewWithData(user.USER_ID as string, user)
        })

        Promise.all(users)
            .then((result => {
                res.status(200).json(result.filter(user => !user.USER_ISDELETED))
            }))
            .catch((error) => {
                console.error(error)
                res.status(400).json(error)
            })
    }
}

class ViewUser {
    public async viewWithData (id: string, user: IUser): Promise<IUser> {
        const authData = await adminAuth.getUser(id)
        const department = await viewDepartmentHelper(user.DEPT_ID as string)
    
        return ({
            ...user,
            USER_ID: id,
            DEPT_ID: department,
            USER_EMAIL: authData.email,
            USER_FULLNAME: authData.displayName
        })
    }
    
    public async view (id: string): Promise<IUser> {
        const user = await userCollection.doc(id).get()

        const authData = await adminAuth.getUser(id)
        const department = await viewDepartmentHelper((user.data() as IUser).DEPT_ID as string)
    
        return ({
            ...user.data() as IUser,
            USER_ID: id,
            DEPT_ID: department,
            USER_EMAIL: authData.email,
            USER_FULLNAME: authData.displayName
        })
    }
}

export const viewUser = new ViewUser
export default new UserService;