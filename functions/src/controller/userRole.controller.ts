import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { FieldPath, db } from '../database';
import IAssignService from '../interfaces/IAssignService';
import { converter } from '../models/converter';
import IUserRole from '../models/userRole.model';
import { roleCollection } from './role.controller';
import { userCollection } from './user.controller';
import IRole from '../models/role.model';
import { Permission } from '../models/permission.model.type';
import { ActivityPermission } from '../models/activityPermission.model.type';
import { AttendancePermissions } from '../models/attendancePermission.model.type';
import { VerificationPermission } from '../models/verificationPermission.model.type';
import { documentId } from 'firebase/firestore';

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

            const roles = roleRef.docs.map(role => ({id: role.id, ...role.data()})).reduce((result, current) => {
                // const currentRole = current as IRole
                // const resultRole = result as IRole
                
                current.appAdmin = result.appAdmin || current.appAdmin
                current.admin = result.admin || current.admin

                // Employee
                if (typeof current.employee === "boolean") current.employee = result.employee || current.employee
                else {
                    const currentEmployee = current.employee as Permission
                    const resultEmployee = result.employee as Permission
                    {
                        currentEmployee!.viewMap = resultEmployee?.viewMap || currentEmployee?.viewMap
                        currentEmployee!.addMap = resultEmployee?.addMap || currentEmployee?.addMap
                        currentEmployee!.editMap = resultEmployee?.editMap || currentEmployee?.editMap
                        currentEmployee!.deleteMap = resultEmployee?.deleteMap || currentEmployee?.deleteMap
                        currentEmployee!.unlockMap = resultEmployee?.unlockMap || currentEmployee?.unlockMap
    
                        currentEmployee!.viewSubject = setPermission(resultEmployee?.viewSubject, currentEmployee?.viewSubject);
                        currentEmployee!.addSubject = setPermission(resultEmployee?.addSubject, currentEmployee?.addSubject);
                        currentEmployee!.editSubject = setPermission(resultEmployee?.editSubject!, currentEmployee?.editSubject!);
                        currentEmployee!.deleteSubject = setPermission(resultEmployee?.deleteSubject!, currentEmployee?.deleteSubject!);
                        
                        currentEmployee!.viewEvent = setPermission(resultEmployee?.viewEvent, currentEmployee?.viewEvent);
                        currentEmployee!.addEvent = setPermission(resultEmployee?.addEvent, currentEmployee?.addEvent);
                        currentEmployee!.editEvent = setPermission(resultEmployee?.editEvent!, currentEmployee?.editEvent!);
                        currentEmployee!.deleteEvent = setPermission(resultEmployee?.deleteEvent!, currentEmployee?.deleteEvent!);
    
                        currentEmployee!.viewUser = resultEmployee?.viewUser || currentEmployee?.viewUser
                        currentEmployee!.addUser = resultEmployee?.addUser || currentEmployee?.addUser 
                        currentEmployee!.editUser = resultEmployee?.editUser || currentEmployee?.editUser
                        currentEmployee!.deleteUser = resultEmployee?.deleteUser || currentEmployee?.deleteUser
                        currentEmployee!.verifyUser = setVerificationPermission(resultEmployee?.verifyUser, currentEmployee?.verifyUser)
    
                        currentEmployee!.viewGroup = resultEmployee?.viewGroup || currentEmployee?.viewGroup
                        currentEmployee!.addGroup = resultEmployee?.addGroup || currentEmployee?.addGroup
                        currentEmployee!.editGroup = resultEmployee?.editGroup || currentEmployee?.editGroup
                        currentEmployee!.deleteGroup = resultEmployee?.deleteGroup || currentEmployee?.deleteGroup
                        currentEmployee!.verifyGroup = setVerificationPermission(resultEmployee?.verifyGroup, currentEmployee?.verifyGroup)
    
                        currentEmployee!.viewRole = resultEmployee?.viewRole || currentEmployee?.viewRole;
                        currentEmployee!.addRole = resultEmployee?.addRole || currentEmployee?.addRole;
                        currentEmployee!.editRole = resultEmployee?.editRole || currentEmployee?.editRole;
                        currentEmployee!.deleteRole = resultEmployee?.deleteRole || currentEmployee?.deleteRole;
                        currentEmployee!.verifyRole = setVerificationPermission(resultEmployee?.verifyRole, currentEmployee?.verifyRole) //Verify Object
                    }
                    current.employee = currentEmployee
                }

                // Teacher
                if (typeof current.teacher === "boolean") current.teacher = result.teacher || current.teacher
                else {
                    const currentTeacher = current.teacher as Permission
                    const resultTeacher = result.teacher as Permission
                    {
                        currentTeacher!.viewMap = resultTeacher?.viewMap || currentTeacher?.viewMap
                        currentTeacher!.addMap = resultTeacher?.addMap || currentTeacher?.addMap
                        currentTeacher!.editMap = resultTeacher?.editMap || currentTeacher?.editMap
                        currentTeacher!.deleteMap = resultTeacher?.deleteMap || currentTeacher?.deleteMap
                        currentTeacher!.unlockMap = resultTeacher?.unlockMap || currentTeacher?.unlockMap

                        currentTeacher!.viewSubject = setPermission(resultTeacher?.viewSubject, currentTeacher?.viewSubject);
                        currentTeacher!.addSubject = setPermission(resultTeacher?.addSubject, currentTeacher?.addSubject);
                        currentTeacher!.editSubject = setPermission(resultTeacher?.editSubject!, currentTeacher?.editSubject!);
                        currentTeacher!.deleteSubject = setPermission(resultTeacher?.deleteSubject!, currentTeacher?.deleteSubject!);

                        currentTeacher!.viewEvent = setPermission(resultTeacher?.viewEvent, currentTeacher?.viewEvent);
                        currentTeacher!.addEvent = setPermission(resultTeacher?.addEvent, currentTeacher?.addEvent);
                        currentTeacher!.editEvent = setPermission(resultTeacher?.editEvent!, currentTeacher?.editEvent!);
                        currentTeacher!.deleteEvent = setPermission(resultTeacher?.deleteEvent!, currentTeacher?.deleteEvent!);

                        currentTeacher!.viewUser = resultTeacher?.viewUser || currentTeacher?.viewUser
                        currentTeacher!.addUser = resultTeacher?.addUser || currentTeacher?.addUser 
                        currentTeacher!.editUser = resultTeacher?.editUser || currentTeacher?.editUser
                        currentTeacher!.deleteUser = resultTeacher?.deleteUser || currentTeacher?.deleteUser
                        currentTeacher!.verifyUser = setVerificationPermission(resultTeacher?.verifyUser, currentTeacher?.verifyUser)

                        currentTeacher!.viewGroup = resultTeacher?.viewGroup || currentTeacher?.viewGroup
                        currentTeacher!.addGroup = resultTeacher?.addGroup || currentTeacher?.addGroup
                        currentTeacher!.editGroup = resultTeacher?.editGroup || currentTeacher?.editGroup
                        currentTeacher!.deleteGroup = resultTeacher?.deleteGroup || currentTeacher?.deleteGroup
                        currentTeacher!.verifyGroup = setVerificationPermission(resultTeacher?.verifyGroup, currentTeacher?.verifyGroup)

                        currentTeacher!.viewRole = resultTeacher?.viewRole || currentTeacher?.viewRole;
                        currentTeacher!.addRole = resultTeacher?.addRole || currentTeacher?.addRole;
                        currentTeacher!.editRole = resultTeacher?.editRole || currentTeacher?.editRole;
                        currentTeacher!.deleteRole = resultTeacher?.deleteRole || currentTeacher?.deleteRole;
                        currentTeacher!.verifyRole = setVerificationPermission(resultTeacher?.verifyRole, currentTeacher?.verifyRole) //Verify Object
                    }
                    current.teacher = currentTeacher
                }

                // Student
                if (typeof current.student === "boolean") current.student = result.student || current.student
                else {
                    const currentStudent = current.student as Permission
                    const resultStudent = result.student as Permission
                    {
                        currentStudent!.viewMap = resultStudent?.viewMap || currentStudent?.viewMap
                        currentStudent!.addMap = resultStudent?.addMap || currentStudent?.addMap
                        currentStudent!.editMap = resultStudent?.editMap || currentStudent?.editMap
                        currentStudent!.deleteMap = resultStudent?.deleteMap || currentStudent?.deleteMap
                        currentStudent!.unlockMap = resultStudent?.unlockMap || currentStudent?.unlockMap
    
                        currentStudent!.viewSubject = setPermission(resultStudent?.viewSubject, currentStudent?.viewSubject);
                        currentStudent!.addSubject = setPermission(resultStudent?.addSubject, currentStudent?.addSubject);
                        currentStudent!.editSubject = setPermission(resultStudent?.editSubject!, currentStudent?.editSubject!);
                        currentStudent!.deleteSubject = setPermission(resultStudent?.deleteSubject!, currentStudent?.deleteSubject!);
    
                        currentStudent!.viewEvent = setPermission(resultStudent?.viewEvent, currentStudent?.viewEvent);
                        currentStudent!.addEvent = setPermission(resultStudent?.addEvent, currentStudent?.addEvent);
                        currentStudent!.editEvent = setPermission(resultStudent?.editEvent!, currentStudent?.editEvent!);
                        currentStudent!.deleteEvent = setPermission(resultStudent?.deleteEvent!, currentStudent?.deleteEvent!);
    
                        currentStudent!.viewUser = resultStudent?.viewUser || currentStudent?.viewUser
                        currentStudent!.addUser = resultStudent?.addUser || currentStudent?.addUser 
                        currentStudent!.editUser = resultStudent?.editUser || currentStudent?.editUser
                        currentStudent!.deleteUser = resultStudent?.deleteUser || currentStudent?.deleteUser
                        currentStudent!.verifyUser = setVerificationPermission(resultStudent?.verifyUser, currentStudent?.verifyUser)
    
                        currentStudent!.viewGroup = resultStudent?.viewGroup || currentStudent?.viewGroup
                        currentStudent!.addGroup = resultStudent?.addGroup || currentStudent?.addGroup
                        currentStudent!.editGroup = resultStudent?.editGroup || currentStudent?.editGroup
                        currentStudent!.deleteGroup = resultStudent?.deleteGroup || currentStudent?.deleteGroup
                        currentStudent!.verifyGroup = setVerificationPermission(resultStudent?.verifyGroup, currentStudent?.verifyGroup)
    
                        currentStudent!.viewRole = resultStudent?.viewRole || currentStudent?.viewRole;
                        currentStudent!.addRole = resultStudent?.addRole || currentStudent?.addRole;
                        currentStudent!.editRole = resultStudent?.editRole || currentStudent?.editRole;
                        currentStudent!.deleteRole = resultStudent?.deleteRole || currentStudent?.deleteRole;
                        currentStudent!.verifyRole = setVerificationPermission(resultStudent?.verifyRole, currentStudent?.verifyRole) //Verify Object
                    }
                    current.student = currentStudent
                }
                

                // Visitor
                if (typeof current.visitor === "boolean") current.visitor = result.visitor || current.visitor
                else {
                    const currentVisitor = current.visitor as Permission
                    const resultVisitor = result.visitor as Permission
                    {
                        currentVisitor!.viewMap = resultVisitor?.viewMap || currentVisitor?.viewMap
                        currentVisitor!.addMap = resultVisitor?.addMap || currentVisitor?.addMap
                        currentVisitor!.editMap = resultVisitor?.editMap || currentVisitor?.editMap
                        currentVisitor!.deleteMap = resultVisitor?.deleteMap || currentVisitor?.deleteMap
                        currentVisitor!.unlockMap = resultVisitor?.unlockMap || currentVisitor?.unlockMap
    
                        currentVisitor!.viewSubject = setPermission(resultVisitor?.viewSubject, currentVisitor?.viewSubject);
                        currentVisitor!.addSubject = setPermission(resultVisitor?.addSubject, currentVisitor?.addSubject);
                        currentVisitor!.editSubject = setPermission(resultVisitor?.editSubject!, currentVisitor?.editSubject!);
                        currentVisitor!.deleteSubject = setPermission(resultVisitor?.deleteSubject!, currentVisitor?.deleteSubject!);
    
                        currentVisitor!.viewEvent = setPermission(resultVisitor?.viewEvent, currentVisitor?.viewEvent);
                        currentVisitor!.addEvent = setPermission(resultVisitor?.addEvent, currentVisitor?.addEvent);
                        currentVisitor!.editEvent = setPermission(resultVisitor?.editEvent!, currentVisitor?.editEvent!);
                        currentVisitor!.deleteEvent = setPermission(resultVisitor?.deleteEvent!, currentVisitor?.deleteEvent!);
    
                        currentVisitor!.viewUser = resultVisitor?.viewUser || currentVisitor?.viewUser
                        currentVisitor!.addUser = resultVisitor?.addUser || currentVisitor?.addUser 
                        currentVisitor!.editUser = resultVisitor?.editUser || currentVisitor?.editUser
                        currentVisitor!.deleteUser = resultVisitor?.deleteUser || currentVisitor?.deleteUser
                        currentVisitor!.verifyUser = setVerificationPermission(resultVisitor?.verifyUser, currentVisitor?.verifyUser)
    
                        currentVisitor!.viewGroup = resultVisitor?.viewGroup || currentVisitor?.viewGroup
                        currentVisitor!.addGroup = resultVisitor?.addGroup || currentVisitor?.addGroup
                        currentVisitor!.editGroup = resultVisitor?.editGroup || currentVisitor?.editGroup
                        currentVisitor!.deleteGroup = resultVisitor?.deleteGroup || currentVisitor?.deleteGroup
                        currentVisitor!.verifyGroup = setVerificationPermission(resultVisitor?.verifyGroup, currentVisitor?.verifyGroup)
    
                        currentVisitor!.viewRole = resultVisitor?.viewRole || currentVisitor?.viewRole;
                        currentVisitor!.addRole = resultVisitor?.addRole || currentVisitor?.addRole;
                        currentVisitor!.editRole = resultVisitor?.editRole || currentVisitor?.editRole;
                        currentVisitor!.deleteRole = resultVisitor?.deleteRole || currentVisitor?.deleteRole;
                        currentVisitor!.verifyRole = setVerificationPermission(resultVisitor?.verifyRole, currentVisitor?.verifyRole) //Verify Object
                    }
                    current.visitor = currentVisitor
                }

                const stringArr: Array<string> = []
                current.name = stringArr.concat(result.name as string, current.name as string)

                return Object.assign(result, current)
            })

            res.status(200).json(roles)
        } catch(error) {
            console.error(error)
            if (error instanceof Error) res.status(400).json({name: "User Role", type: "View", message: error.message})
        }
    }

    public async viewAssignedRolesDebug(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
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
            console.error(error)
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

const setPermission = (resultPermission?: ActivityPermission, currentPermission?: ActivityPermission) => {
    const permission = currentPermission as ActivityPermission

    permission.value = resultPermission?.value || currentPermission?.value
    permission.schedule = resultPermission?.schedule || currentPermission?.schedule
    permission.participants = resultPermission?.participants || currentPermission?.participants
    permission.attendance = typeof resultPermission?.attendance === "boolean" || typeof currentPermission?.attendance === "boolean" ? resultPermission?.attendance || currentPermission?.attendance : setAttendancePermission(resultPermission?.attendance as AttendancePermissions, currentPermission?.attendance as AttendancePermissions)
    permission.verify = setVerificationPermission(resultPermission?.verify, currentPermission?.verify)

    return permission
}

const setAttendancePermission = (resultAttendancePermission?: AttendancePermissions, currentAttendancePermission?: AttendancePermissions) => {

    const attendancePermission = currentAttendancePermission as AttendancePermissions

    attendancePermission.value = resultAttendancePermission?.value || currentAttendancePermission?.value
    attendancePermission.verifyAttendance = setVerificationPermission(resultAttendancePermission?.verifyAttendance, currentAttendancePermission?.verifyAttendance);

    return attendancePermission
}

const setVerificationPermission = (resultVerificationPermission?: VerificationPermission, currentVerificationPermission?: VerificationPermission) => {

    const userVerificationArray:Array<string> = [];

    const verificationPermission = currentVerificationPermission as VerificationPermission

    verificationPermission.by = userVerificationArray.concat(resultVerificationPermission?.by!, currentVerificationPermission?.by!)
    verificationPermission.value = resultVerificationPermission?.value || currentVerificationPermission?.value

    return verificationPermission
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