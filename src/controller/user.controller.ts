import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

import { Request, Response } from 'express';
import { converter } from '../models/converter';
import IUser from '../models/user.model';
import { db } from '../database';
import {
    adminAuth,
} from '../authentication';
import IBaseService from '../interfaces/IBaseService';
import ErrorController from '../types/ErrorController';
import { getAuth } from 'firebase-admin/auth';

import { userRoleCollection } from './userRole.controller';
import IUserRole from '../models/userRole.model';

// const { userRoleCollection } = require('./userRole.controller');
// const { UserRole } = require('../models/userRole.model');

export const userCollection = db.collection("/users/").withConverter(converter<IUser>())

class UserService implements IBaseService {
    public async add(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        try {
            const reqUser = req.body as IUser;

            const user: IUser = {
                institution: reqUser.institution,
                firstName: reqUser.firstName,
                lastName: reqUser.lastName,
                email: reqUser.email,
                userName: reqUser.userName,
                addedBy: reqUser.addedBy,
                joinDate: new Date().toISOString(),
                isalumni: reqUser.isalumni,
                status: "Open",
            }

            console.log(reqUser)

            //Authentication
            await adminAuth.createUser({
                email: user.email,
                password: reqUser.password,
                displayName: `${user.firstName} ${user.lastName}`,
            })
                .then((userRec) => {
                    console.log("Successfully Added - Authentication", userRec)
                })
                .catch((error) => {
                    console.log(error)
                    throw {type: "Authentication", message: error.message, code: error.code}
                })

            // Firestore - Possibly separate this one from the inner then... but idk
            const userDoc = userCollection.doc(user.email);
                
            await userDoc.create(user)
                .then(() => {
                    console.log("Successfully Added - Firestore")
                })

            res.status(200).json({type: "User", message: "Account created successfully"});
        }
        catch (error) {
            if (error instanceof Error) {
                const userControllerError: ErrorController = {
                    name: "User",
                    error: true,
                    errorType: "Controller Error",
                    control: "Add",
                    message: error.message
                }
                
                res.status(400).json(userControllerError) //type: error.type, code: error.code
            }
        }
    }

    public async update(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        const userIdparam = req.params.id;

        //Update authentication as well

        try{
            const userDoc = userCollection.doc(userIdparam);

            const reqUser = req.body as IUser;

            const oldUser = await userDoc.get()
                .then(user => ({id: user.id, ...user.data()}));

            const user: IUser = {
                institution: oldUser.institution,
                firstName: reqUser.firstName,
                lastName: reqUser.lastName,
                email: reqUser.email,
                userName: reqUser.userName,
                password: reqUser.password,
                addedBy: oldUser.addedBy,
                joinDate: oldUser.joinDate?.toLocaleString(),
                isalumni: oldUser.isalumni,
                status: oldUser.status,
            }

            const uid = await adminAuth.getUserByEmail(oldUser.id)
                .then(userRecord => userRecord.uid)
                .catch(error => {throw error})

            //Update Authentication
            await adminAuth.updateUser(uid, {
                email: user.email,
                password: user.password,//user.password?.length > 0 ? user.password : undefined,
                displayName: `${user.firstName} ${user.lastName}`,
            })
                .then(() => {
                    console.log("Successfully Updated Authentication - Firebase Auth")
                })
                .catch((error) => {throw {type: "Authentication", error: error}})
                
            //Update Firestore
            await userCollection.doc(user.email).set(user)
                .then(() => {
                    console.log("Successfully Updated Authentication - Firestore (Set)")
                })

            if (oldUser.id !== reqUser.email)
                await userDoc.delete()
                    .then(() => {
                        console.log("Successfully Updated Authentication - Firestore (Delete Old)")
                    })

            //Update user Role
            const assignedRoleDocs = await userRoleCollection.where('userId', '==', oldUser.id).get();

            // if (assignedRoleDocs.empty)
            //     throw {message: "User Id not found"}

            //Get Roles 
            const assignedRoles = assignedRoleDocs.docs.map((userRole) => {
                return userRole.data()
            })

            //Delete old user role and assign new based on new userId
            assignedRoles.forEach(async (userRole) => {
                let newUserRole: IUserRole = {
                    userId: user.email,
                    roleId: userRole.roleId
                }
                
                const newId = `${newUserRole.userId}-${newUserRole.roleId}`
                const oldId = `${oldUser.id}-${userRole.roleId}`

                await userRoleCollection.doc(newId).set(newUserRole)
                if (newId !== oldId)
                    await userRoleCollection.doc(oldId).delete()
            })

            //Assign New

            //Update User Role
            //await userRoleCollection.doc(`${id}-${userRole.roleId}`).update()

            res.status(200).json("Data updated successfully")
        }
        catch(error) {
            if (error instanceof Error) {
                const userControllerError: ErrorController = {
                    name: "User",
                    error: true,
                    errorType: "Controller Error",
                    control: "Update",
                    message: error.message,
                    stack: error.stack
                }
                
                res.status(400).json(userControllerError) //type: error.type, code: error.code
            }
        }
    }

    public async delete(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        const userId = req.params.id;

        // Instead of deleting the user completely, why not use the status?

        try{
            await userCollection.doc(`/users/${userId}`).delete();

            //Delete UserRole assigned

            res.status(200).json("User delete successfully")
        }
        catch(error) {
            if (error instanceof Error) {
                const userControllerError: ErrorController = {
                    name: "User",
                    error: true,
                    errorType: "Controller Error",
                    control: "Delete",
                    message: error.message
                }
                
                res.status(400).json(userControllerError) //type: error.type, code: error.code
            }
        }
    }

    public async view(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        try {
            const userId = req.params.id;

            const userDoc = await userCollection.doc(userId).get()

            if (!userDoc.exists)
                throw {code: 'firestore/missing-email', message: `User with id: ${userId} does not exist.`}

            res.status(200).json({id: userDoc.id, ...userDoc.data()});   
        }
        catch (error) {
            if (error instanceof Error) {
                const userControllerError: ErrorController = {
                    name: "User",
                    error: true,
                    code: 'firestore/missing-email',
                    errorType: "Controller Error",
                    control: "View",
                    message: error.message
                }
                
                res.status(400).json(userControllerError) //type: error.type, code: error.code
            }        
        }
    }

    public async isExist(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        const userId = req.params.id;

        const exist = await (await userCollection.doc(userId).get()).exists

        res.status(200).json(exist); 
    }

    public async viewAll(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        try {
            const userRef = await userCollection.get();

            const users = userRef.docs.map(userRecord => {
                const user: IUser = {
                    id: userRecord.id,
                    ...userRecord.data(),
                }

                return user
            })

            res.status(200).json(users);   
        }
        catch (error) {
            if (error instanceof Error) {
                const userControllerError: ErrorController = {
                    name: "User",
                    error: true,
                    errorType: "Controller Error",
                    control: "View",
                    message: error.message
                }
                
                res.status(400).json(userControllerError) //type: error.type, code: error.code
            }
        }
    }

    public async viewAllByInstitution(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        const institutionId = req.params.institution
        
        try {
            const userRef = await userCollection.where('institution', '==', institutionId).get(); 

            const users = userRef.docs.map(userRecord => ({id: userRecord.id, ...userRecord.data()}))

            res.status(200).json(users);   
        }
        catch (error) {
            if (error instanceof Error) {
                const userControllerError: ErrorController = {
                    name: "User",
                    error: true,
                    errorType: "Controller Error",
                    control: "View",
                    message: error.message
                }
                
                res.status(400).json(userControllerError) //type: error.type, code: error.code
            }
        }
    }

    public async viewAuth(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        try {
            const userId = req.params.email;

            const user = await getAuth().getUserByEmail(userId)
                .then(userRecord => userRecord);

            res.status(200).json(user);   
        }
        catch (error) {
            if (error instanceof Error) {
                const userControllerError: ErrorController = {
                    name: "User",
                    error: true,
                    errorType: "Controller Error",
                    control: "View",
                    message: error.message
                }
                
                res.status(400).json(userControllerError) //type: error.type, code: error.code
            }        
        }
    }
}

class AdminService implements IBaseService {
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
    viewAll(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        throw new Error('Method not implemented.');
    }

}

class AppAdminService implements IBaseService {
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
    viewAll(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        throw new Error('Method not implemented.');
    }


}

// // Add User. Not Institutional Admins
// // Okay maybe this goes for institutional admins already
// const addUser = async (req: Request, res: Response) => {
//     try{
//         const { institution, firstName, lastName, email, userName, password, addedBy } = req.body;

//         // const userInput = {
//         //     institution,
//         //     firstName,
//         //     lastName,
//         //     email,
//         //     userName,
//         //     password,
//         //     joinDate: serverTimestamp,
//         //     addedBy,
//         //     isAlumni: false,
//         //     status: "Open",
//         // }

//         // let user = {};

//         // /* Middleware shenanigans must be located here */

//         // const userVal = new User(
//         //     userInput.institution,
//         //     userInput.firstName,
//         //     userInput.lastName,
//         //     userInput.email,
//         //     userInput.userName,
//         //     userInput.password,
//         //     userInput.addedBy,
//         //     userInput.joinDate,
//         //     userInput.isAlumni,
//         //     userInput.status,
//         // )

//         // await adminAuth.createUser({
//         //     email: userVal.getEmail,
//         //     password: userVal.getPassword,
//         //     displayName: `${userVal.getFirstName} ${userVal.getLastName}`,
//         // })
//         //     .then((userRec) => {
//         //         console.log("Successfully Added - Authentication")

//         //         user = userRec
//         //     })
//         //     .catch((error) => {
//         //         console.log(error)
//         //         throw {type: "Authentication", message: error.message, code: error.code}
//         //     })

//         // // FIRESTORE FUNCTIONS - Possibly separate this one from the inner then... but idk
//         // const userDoc = userCollection.doc(email).withConverter(userConverter)
            
//         // await userDoc.create(userVal)
//         //     .then((result) => {
//         //         console.log("Successfully Added - Firestore")
//         //     })
//         //     .catch((error) => {
//         //         throw {type: "Firestore", message: error.message}
//         //     })

//         //await adminAuth.setCustomUserClaims(user.uid, { role });
//         res.status(200).json({type: "User", message: "Account created successfully"});
//     }
//     catch(e) {
//         res.status(400).json({name: "User", error: "Controller Error", type: e.type, message: e.message, code: e.code})
//     }
// }

// const updateUser = async (req: Request, res: Response) => {
//     const paramId = req.params.id;

//     //Update authentication as well

//     try{
//         const userDoc = userCollection.doc(paramId);

//         const { data, id } = await userDoc.get();

//         const userVal = new User(
//             data()?.institution,
//             req.body.firstName,
//             req.body.lastName,
//             req.body.email,
//             data()?.userName,
//             req.body.password,
//             data()?.addedBy,
//             data()?.joinDate,
//             data()?.isalumni,
//             data()?.status
//         );

//         const uid = await adminAuth.getUserByEmail(id)
//             .then(userRecord => userRecord.toJSON().uid)
//             .catch(error => {throw error})

//         //Update Authentication
//         await adminAuth.updateUser(uid, {
//             email: req.body.email !== id ? userVal.getEmail : undefined,
//             password: userVal.getPassword.length > 0 ? userVal.getPassword : undefined,
//             displayName: `${userVal.getFirstName} ${userVal.getLastName}`,
//         })
//             .then(() => {
//                 console.log("Successfully Updated Authentication - Firebase Auth")
//             })
//             .catch((error) => {throw {type: "Authentication", error: error}})
            
//         //Update Firestore
//         await userCollection.doc(userVal.getEmail).set(userVal)

//         if (id !== req.body.email)
//             await userDoc.delete()

//         const assignedRoleDocs = await userRoleCollection.where('userId', '==', id).get();

//         if (assignedRoleDocs.empty)
//             throw {message: "User Id not found"}

//         //Get Roles 
//         const assignedRoles = assignedRoleDocs.docs.map((userRole) => {
//             return userRole.data()
//         })

//         //Delete old user role and assign new
//         assignedRoles.forEach(async (userRole) => {
//             let newUserRole = new UserRole(
//                 userVal.getEmail,
//                 userRole._roleId
//             )
            
//             const newId = `${newUserRole._userId}-${newUserRole._roleId}`
//             const oldId = `${id}-${userRole._roleId}`

//             await userRoleCollection.doc(newId).set(newUserRole)
//             if (newId !== oldId)
//                 await userRoleCollection.doc(oldId).delete()
//         })

//         //Assign New

//         //Update User Role
//         //await userRoleCollection.doc(`${id}-${userRole.roleId}`).update()

//         res.status(200).json("Data updated successfully")
//     }
//     catch(e) {
//         res.status(400).json({name: "User", error: "Controller Error", control: "Update", type: e.type, message: e.message, ...e})
//     }
// }

// const deleteUser = async (req: Request, res: Response) => {
//     const id = req.params.id;

//     // Instead of deleting the user completely, why not use the status?

//     try{
//         const userDoc = db.doc(`/users/${id}`).withConverter(userConverter);
//         await userDoc.delete();

//         res.status(200).json("Data delete successfully")
//     }
//     catch(e) {
//         res.status(400).json(`Error Occured: ${e}`)
//     }
// }

// const viewAllUser = async (req: Request, res: Response) => {
//     try {
//         const getUserDocs = await userCollection.get();

//         const docRef = getUserDocs.docs.map(doc => ({id:doc.id, ...doc.data()}))
//         console.log(docRef)

//         res.status(200).json(docRef);    
//     }
//     catch (e) {
//         res.status(400).json({error: true, message: e.message})
//     }
// }

// const viewAllUsersByInstitution = async (req: Request, res: Response) => {
//     try {
//         const getUserDocs = await userCollection.where('institution', '==', req.params.institution).get(); 

//         const docRef = getUserDocs.docs.map(doc => ({id:doc.id, ...doc.data()}))
//         console.log(docRef)

//         res.status(200).json(docRef);    
//     }
//     catch (e) {
//         res.status(400).json({error: true, message: e.message})
//     }
// }
// const viewUserByName = async (req: Request, res: Response) => {
//     try {
//         const getUserDocs = await userCollection.where('userName', '==', req.params.userName).get(); 

//         const docRef = getUserDocs.docs.map(doc => ({id:doc.id, ...doc.data()}))
//         console.log(docRef)

//         res.status(200).json(docRef);
//     }
//     catch (e) {
//         res.status(400).json({error: true, message: e?.message})
//     }
// }
// const viewUser = async (req: Request, res: Response) => {
//     const id = req.params.id;

//     try {
//         const userRef = await userCollection.doc(id).get();

//         if (!userRef.exists)
//             throw {code: 'firestore/missing-email', message: `User with id: ${id} does not exist.`}
//         //console.log(userRef.data())
//         //const userDoc = await getDoc(userRef);

//         res.status(200).json({id: userRef.id, ...userRef.data()})
//     }
//     catch (e) {
//         res.status(400).json({error: "Error", code: e.code, message: e.message})
//     }
// }

// // Add Institutional admins
// const signUp = async (req: Request, res: Response) => {
//     try{
//         const { firstName, lastName, email, userName, password } = req.body;
    
//         const userInput = {
//             firstName,
//             lastName,
//             email,
//             userName,
//             password,
//             joinDate: serverTimestamp,
//             addedBy: "admin",
//             isAlumni: false,
//             status: "Open"
//         }

//         /* Middleware shenanigans must be located here */

//         const userVal = new User(
//             null,
//             userInput.firstName,
//             userInput.lastName,
//             userInput.email,
//             userInput.userName,
//             userInput.password,
//             userInput.addedBy,
//             userInput.joinDate,
//             userInput.isAlumni,
//             userInput.status
//         )

//         const userRec = await adminAuth.createUser({
//             email: userVal.getEmail,
//             password: userVal.getPassword,
//             displayName: `${userVal.getFirstName} ${userVal.getLastName}`,
//         })

//         //const userDoc = await db.doc(`/users/${userRec.email}`).withConverter(userConverter).create(userVal)
//         await userCollection.doc(userRec.email).set(userVal).then((result) => {console.log(result)})

//         const userDoc = await userCollection.doc(userRec.email).get()

//         const user = {
//             id: userDoc.id,
//             displayName: userRec.displayName,
//             email: userRec.email,
//             ...userDoc.data()
//         }

//         //What does this do?
//         //await adminAuth.setCustomUserClaims(user.uid, { role });
//         res.status(200).json({type: "Admin", user, message: "Account created successfully"});
//     }
//     catch(e) {
//         res.status(400).json({name: "User", error: "Controller Error", type: "Sign Up", message: e.message, code: e.code})
//     }
// }

// const assignInstitution = async (req: Request, res: Response) => {
//     try {
//         const { institution, userId } = req.body;

//         const userVal = new User()
//         userVal.setInstitution = institution

//         await userCollection.doc(`${userId}`).update({institution: userVal.getInstitution})
//             // .then(() => {
//             //     res.status(200).json({message: "Assign institution success"})
//             // })
//             // .catch((error) => {
//             //     throw {message: error.message}
//             // })

//         res.status(200).json({message: "Assign institution success"})
//     } catch (error) {
//         res.status(400).json({name: "Institution", error: "Controller Error", message: error.message})
//     }
// }

// /* Application Admin */
// const addAppAdmin = async (req: Request, res: Response) => {
//     try{
//         const { firstName, lastName, email, userName, password } = req.body;
    
//         const userInput = {
//             firstName,
//             lastName,
//             email,
//             userName,
//             password,
//             joinDate: serverTimestamp,
//             addedBy: null,
//             isAlumni: false,
//             status: "Open"
//         }

//         /* Middleware shenanigans must be located here */

//         const userVal = new User(
//             null,
//             userInput.firstName,
//             userInput.lastName,
//             userInput.email,
//             userInput.userName,
//             userInput.password,
//             userInput.addedBy,
//             userInput.joinDate,
//             userInput.isAlumni,
//             userInput.status
//         )

//         await adminAuth.createUser({
//             email: userVal.getEmail,
//             password: userVal.getPassword,
//             displayName: `${userVal.getFirstName} ${userVal.getLastName}`,
//         })
//             .then(async (userRec) => {
//                 console.log("Successfully Added - Authentication")
//             })
//             .catch((error) => {
//                 console.log(error)
//                 throw {type: "Authentication", message: error.message, code: error.code}
//             })

//         // FIRESTORE FUNCTIONS - Possibly separate this one from the inner then... but idk -- It should
//         const userDoc = db.doc(`/users/${email}`).withConverter(userConverter)
                    
//         await userDoc.create(userVal)
//             .then((result) => {
//                 console.log("Successfully Added - Firestore")
//             })
//             .catch((error) => {
//                 throw {type: "Firestore", message: error.message}
//             })

//         //Assign role as superadmin
        
//         res.status(200).json({type: "App Admin", message: "Account created successfully"});
//     }
//     catch(e) {
//         res.status(400).json({name: "User", error: "Controller Error", type: e.type, message: e.message, code: e.code})
//     }
// }

export default new UserService;