import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { FieldPath, db } from '../database';
import IAssignService from '../interfaces/IAssignService';
import { converter } from '../models/converter';
import IUserRole from '../models/userRole.model';
import { roleCollection } from './role.controller';
import { userCollection } from './user.controller';

export const userRoleCollection = db.collection(`/userRole/`).withConverter(converter<IUserRole>())

class UserRole implements IAssignService {
    public async assign(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        try {
            const reqUserRole = req.body as IUserRole;

            const userRole:IUserRole = {
                userId: reqUserRole.userId,
                roleId: reqUserRole.roleId
                //Assigned by
                //Assigned Date
            }

            await userRoleCollection.doc(`${userRole.userId}-${userRole.roleId}`).create(userRole)

            res.status(200).json({message: "User Role assigned successfully"})
        } catch (error) {
            if (error instanceof Error) res.status(400).json({name: "User Role", type: "Assign", message: error.message})
        }
    }

    public async remove(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        try {
            const reqUserRole = req.body as IUserRole;

            const userRole: IUserRole = {
                userId: reqUserRole.userId,
                roleId: reqUserRole.roleId
            }

            await userRoleCollection.doc(`${userRole.userId}-${userRole.roleId}`).delete();

            res.status(200).json({message: "User Role assigned successfully"})
        } catch (error) {
            if (error instanceof Error) res.status(400).json({name: "User Role", type: "Assign", message: error.message})
        }
    }

    public async view(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        try {
            const userRoleDoc = await userRoleCollection.get();

            const userRoles = userRoleDoc.docs.map(userRole => ({id: userRole.id, ...userRole.data()}))

            res.status(200).json(userRoles);   
        }
        catch (error) {
            if (error instanceof Error) res.status(400).json({error: true, message: error.message})
        }
    }

    public async viewAssignedRoles(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        const userId = req.params.id

        try {
            const userIdRef = await userRoleCollection.where('userId', '==', userId).get();

            // if (userRoleRef.empty)
            //     throw {message: "User Id not found"}

            const roleIds = userIdRef.docs.map(data => data.data().roleId)

            const roleRef = await roleCollection.where(FieldPath.documentId(), 'in', roleIds).get()

            // if (roleRef.empty)
            //     throw {message: "User does not contain any roles"}

            const roles = roleRef.docs.map(role => ({id: role.id, ...role.data()}))

            res.status(200).json(roles)
        } catch(error) {
            if (error instanceof Error) res.status(400).json({name: "User Role", type: "View", message: error.message})
        }
    }

    public async viewAssignedUsers(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        const roleId = req.params.id

        try {
            const roleIdRef = await userRoleCollection.where('roleId', '==', roleId).get();

            // if (roleIdRef.empty)
            //     throw {message: "Role Id not found"}

            const userIds = roleIdRef.docs.map(data => data.data().userId)

            const userRef = await userCollection.where(FieldPath.documentId(), 'in', userIds).get()

            // if (userRef.empty)
            //     throw {message: "Role is not assigned to any users"}

            const users = userRef.docs.map(user => ({id: user.id, ...user.data()}))

            res.status(200).json(users)
        } catch(error) {
            if (error instanceof Error) res.status(400).json({name: "User Role", type: "View", message: error.message})
        }
    }
}

// const assignRole = async (req, res) => {
//     try {
//         let userRole = new UserRole(
//             req.body.userId,
//             req.body.roleId
//         )

//         await userRoleCollection.doc(`${userRole.userId}-${userRole.roleId}`).create(userRole)

//         //viewAssignedRoles()

//         //const assignedRoleRef = await userRoleCollection.where('userId', '==', userRole.userId).get()
        
//         //Get the View Assigned Roles Method
//         // const assignedRoles = assignedRoleRef.docs.map(role => role.data())
//         // console.log("Assigned Roles", assignedRoles)

//         res.status(200).json({message: "User Role assigned successfully"}) //Returns all assigned roles
//     } catch (e) {
//         res.status(400).json({name: "User Role", type: "Assign", error: e.message})
//     }
// }

// const assignAdminRole = async (req, res) => {
    
// }

// const removeRole = async (req, res) => {

// }

// const viewAssignedRoles = async (req, res) => {
//     const userId = req.params.id

//     try {
//         const userRoleRef = await userRoleCollection.where('userId', '==', userId).get();

//         if (userRoleRef.empty)
//             throw {message: "User Id not found"}

//         const userRoleIds = userRoleRef.docs.map(data => data.data()._roleId)

//         const roleRef = await roleCollection.where(FieldPath.documentId(), 'in', userRoleIds).get()

//         if (roleRef.empty)
//             throw {message: "User does not contain any roles"}

//         const roles = roleRef.docs.map(role => role.data())

//         console.log("Assigned Roles", roles)

//         res.status(200).json(roles)
//     } catch(e) {
//         res.status(400).json({name: "User Role", type: "View", error: e.message})
//     }
// }
export default new UserRole