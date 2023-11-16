"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoleCollection = void 0;
const database_1 = require("../database");
const converter_1 = require("../models/converter");
const role_controller_1 = require("./role.controller");
const user_controller_1 = require("./user.controller");
exports.userRoleCollection = database_1.db.collection(`/userRole/`).withConverter((0, converter_1.converter)());
class UserRole {
    assign(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reqUserRole = req.body;
                const userRole = {
                    userId: reqUserRole.userId,
                    roleId: reqUserRole.roleId
                    //Assigned by
                    //Assigned Date
                };
                yield exports.userRoleCollection.doc(`${userRole.userId}-${userRole.roleId}`).create(userRole);
                res.status(200).json({ message: "User Role assigned successfully" });
            }
            catch (error) {
                if (error instanceof Error)
                    res.status(400).json({ name: "User Role", type: "Assign", message: error.message });
            }
        });
    }
    remove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reqUserRole = req.body;
                const userRole = {
                    userId: reqUserRole.userId,
                    roleId: reqUserRole.roleId
                };
                yield exports.userRoleCollection.doc(`${userRole.userId}-${userRole.roleId}`).delete();
                res.status(200).json({ message: "User Role assigned successfully" });
            }
            catch (error) {
                if (error instanceof Error)
                    res.status(400).json({ name: "User Role", type: "Assign", message: error.message });
            }
        });
    }
    view(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userRoleDoc = yield exports.userRoleCollection.get();
                const userRoles = userRoleDoc.docs.map(userRole => (Object.assign({ id: userRole.id }, userRole.data())));
                res.status(200).json(userRoles);
            }
            catch (error) {
                if (error instanceof Error)
                    res.status(400).json({ error: true, message: error.message });
            }
        });
    }
    viewAssignedRoles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            try {
                const userIdRef = yield exports.userRoleCollection.where('userId', '==', userId).get();
                // if (userRoleRef.empty)
                //     throw {message: "User Id not found"}
                const roleIds = userIdRef.docs.map(data => data.data().roleId);
                const roleRef = yield role_controller_1.roleCollection.where(database_1.FieldPath.documentId(), 'in', roleIds).get();
                // if (roleRef.empty)
                //     throw {message: "User does not contain any roles"}
                const roles = roleRef.docs.map(role => (Object.assign({ id: role.id }, role.data())));
                res.status(200).json(roles);
            }
            catch (error) {
                if (error instanceof Error)
                    res.status(400).json({ name: "User Role", type: "View", message: error.message });
            }
        });
    }
    viewAssignedUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const roleId = req.params.id;
            try {
                const roleIdRef = yield exports.userRoleCollection.where('roleId', '==', roleId).get();
                // if (roleIdRef.empty)
                //     throw {message: "Role Id not found"}
                const userIds = roleIdRef.docs.map(data => data.data().userId);
                const userRef = yield user_controller_1.userCollection.where(database_1.FieldPath.documentId(), 'in', userIds).get();
                // if (userRef.empty)
                //     throw {message: "Role is not assigned to any users"}
                const users = userRef.docs.map(user => (Object.assign({ id: user.id }, user.data())));
                res.status(200).json(users);
            }
            catch (error) {
                if (error instanceof Error)
                    res.status(400).json({ name: "User Role", type: "View", message: error.message });
            }
        });
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
exports.default = new UserRole;
//# sourceMappingURL=userRole.controller.js.map