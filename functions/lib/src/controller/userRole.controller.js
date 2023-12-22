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
                const roles = roleRef.docs.map(role => (Object.assign({ id: role.id }, role.data()))).reduce((result, current) => {
                    // const currentRole = current as IRole
                    // const resultRole = result as IRole
                    current.appAdmin = result.appAdmin || current.appAdmin;
                    current.admin = result.admin || current.admin;
                    // Employee
                    if (typeof current.teacher === "boolean")
                        current.employee = result.employee || current.employee;
                    else {
                        const currentEmployee = current.employee;
                        const resultEmployee = result.employee;
                        {
                            currentEmployee.viewMap = (resultEmployee === null || resultEmployee === void 0 ? void 0 : resultEmployee.viewMap) || (currentEmployee === null || currentEmployee === void 0 ? void 0 : currentEmployee.viewMap);
                            currentEmployee.addMap = (resultEmployee === null || resultEmployee === void 0 ? void 0 : resultEmployee.addMap) || (currentEmployee === null || currentEmployee === void 0 ? void 0 : currentEmployee.addMap);
                            currentEmployee.editMap = (resultEmployee === null || resultEmployee === void 0 ? void 0 : resultEmployee.editMap) || (currentEmployee === null || currentEmployee === void 0 ? void 0 : currentEmployee.editMap);
                            currentEmployee.deleteMap = (resultEmployee === null || resultEmployee === void 0 ? void 0 : resultEmployee.deleteMap) || (currentEmployee === null || currentEmployee === void 0 ? void 0 : currentEmployee.deleteMap);
                            currentEmployee.unlockMap = (resultEmployee === null || resultEmployee === void 0 ? void 0 : resultEmployee.unlockMap) || (currentEmployee === null || currentEmployee === void 0 ? void 0 : currentEmployee.unlockMap);
                            currentEmployee.viewSubject = setPermission(resultEmployee === null || resultEmployee === void 0 ? void 0 : resultEmployee.viewSubject, currentEmployee === null || currentEmployee === void 0 ? void 0 : currentEmployee.viewSubject);
                            currentEmployee.addSubject = setPermission(resultEmployee === null || resultEmployee === void 0 ? void 0 : resultEmployee.addSubject, currentEmployee === null || currentEmployee === void 0 ? void 0 : currentEmployee.addSubject);
                            currentEmployee.editSubject = setPermission(resultEmployee === null || resultEmployee === void 0 ? void 0 : resultEmployee.editSubject, currentEmployee === null || currentEmployee === void 0 ? void 0 : currentEmployee.editSubject);
                            currentEmployee.deleteSubject = setPermission(resultEmployee === null || resultEmployee === void 0 ? void 0 : resultEmployee.deleteSubject, currentEmployee === null || currentEmployee === void 0 ? void 0 : currentEmployee.deleteSubject);
                            4;
                            currentEmployee.viewEvent = setPermission(resultEmployee === null || resultEmployee === void 0 ? void 0 : resultEmployee.viewEvent, currentEmployee === null || currentEmployee === void 0 ? void 0 : currentEmployee.viewEvent);
                            currentEmployee.addEvent = setPermission(resultEmployee === null || resultEmployee === void 0 ? void 0 : resultEmployee.addEvent, currentEmployee === null || currentEmployee === void 0 ? void 0 : currentEmployee.addEvent);
                            currentEmployee.editEvent = setPermission(resultEmployee === null || resultEmployee === void 0 ? void 0 : resultEmployee.editEvent, currentEmployee === null || currentEmployee === void 0 ? void 0 : currentEmployee.editEvent);
                            currentEmployee.deleteEvent = setPermission(resultEmployee === null || resultEmployee === void 0 ? void 0 : resultEmployee.deleteEvent, currentEmployee === null || currentEmployee === void 0 ? void 0 : currentEmployee.deleteEvent);
                            currentEmployee.viewUser = (resultEmployee === null || resultEmployee === void 0 ? void 0 : resultEmployee.viewUser) || (currentEmployee === null || currentEmployee === void 0 ? void 0 : currentEmployee.viewUser);
                            currentEmployee.addUser = (resultEmployee === null || resultEmployee === void 0 ? void 0 : resultEmployee.addUser) || (currentEmployee === null || currentEmployee === void 0 ? void 0 : currentEmployee.addUser);
                            currentEmployee.editUser = (resultEmployee === null || resultEmployee === void 0 ? void 0 : resultEmployee.editUser) || (currentEmployee === null || currentEmployee === void 0 ? void 0 : currentEmployee.editUser);
                            currentEmployee.deleteUser = (resultEmployee === null || resultEmployee === void 0 ? void 0 : resultEmployee.deleteUser) || (currentEmployee === null || currentEmployee === void 0 ? void 0 : currentEmployee.deleteUser);
                            currentEmployee.verifyUser = setVerificationPermission(resultEmployee === null || resultEmployee === void 0 ? void 0 : resultEmployee.verifyUser, currentEmployee === null || currentEmployee === void 0 ? void 0 : currentEmployee.verifyUser);
                            currentEmployee.viewGroup = (resultEmployee === null || resultEmployee === void 0 ? void 0 : resultEmployee.viewGroup) || (currentEmployee === null || currentEmployee === void 0 ? void 0 : currentEmployee.viewGroup);
                            currentEmployee.addGroup = (resultEmployee === null || resultEmployee === void 0 ? void 0 : resultEmployee.addGroup) || (currentEmployee === null || currentEmployee === void 0 ? void 0 : currentEmployee.addGroup);
                            currentEmployee.editGroup = (resultEmployee === null || resultEmployee === void 0 ? void 0 : resultEmployee.editGroup) || (currentEmployee === null || currentEmployee === void 0 ? void 0 : currentEmployee.editGroup);
                            currentEmployee.deleteGroup = (resultEmployee === null || resultEmployee === void 0 ? void 0 : resultEmployee.deleteGroup) || (currentEmployee === null || currentEmployee === void 0 ? void 0 : currentEmployee.deleteGroup);
                            currentEmployee.verifyGroup = setVerificationPermission(resultEmployee === null || resultEmployee === void 0 ? void 0 : resultEmployee.verifyGroup, currentEmployee === null || currentEmployee === void 0 ? void 0 : currentEmployee.verifyGroup);
                            currentEmployee.viewRole = (resultEmployee === null || resultEmployee === void 0 ? void 0 : resultEmployee.viewRole) || (currentEmployee === null || currentEmployee === void 0 ? void 0 : currentEmployee.viewRole);
                            currentEmployee.addRole = (resultEmployee === null || resultEmployee === void 0 ? void 0 : resultEmployee.addRole) || (currentEmployee === null || currentEmployee === void 0 ? void 0 : currentEmployee.addRole);
                            currentEmployee.editRole = (resultEmployee === null || resultEmployee === void 0 ? void 0 : resultEmployee.editRole) || (currentEmployee === null || currentEmployee === void 0 ? void 0 : currentEmployee.editRole);
                            currentEmployee.deleteRole = (resultEmployee === null || resultEmployee === void 0 ? void 0 : resultEmployee.deleteRole) || (currentEmployee === null || currentEmployee === void 0 ? void 0 : currentEmployee.deleteRole);
                            currentEmployee.verifyRole = setVerificationPermission(resultEmployee === null || resultEmployee === void 0 ? void 0 : resultEmployee.verifyRole, currentEmployee === null || currentEmployee === void 0 ? void 0 : currentEmployee.verifyRole); //Verify Object
                        }
                        current.employee = currentEmployee;
                    }
                    // Teacher
                    if (typeof current.teacher === "boolean")
                        current.teacher = result.teacher || current.teacher;
                    else {
                        const currentTeacher = current.teacher;
                        const resultTeacher = result.teacher;
                        {
                            currentTeacher.viewMap = (resultTeacher === null || resultTeacher === void 0 ? void 0 : resultTeacher.viewMap) || (currentTeacher === null || currentTeacher === void 0 ? void 0 : currentTeacher.viewMap);
                            currentTeacher.addMap = (resultTeacher === null || resultTeacher === void 0 ? void 0 : resultTeacher.addMap) || (currentTeacher === null || currentTeacher === void 0 ? void 0 : currentTeacher.addMap);
                            currentTeacher.editMap = (resultTeacher === null || resultTeacher === void 0 ? void 0 : resultTeacher.editMap) || (currentTeacher === null || currentTeacher === void 0 ? void 0 : currentTeacher.editMap);
                            currentTeacher.deleteMap = (resultTeacher === null || resultTeacher === void 0 ? void 0 : resultTeacher.deleteMap) || (currentTeacher === null || currentTeacher === void 0 ? void 0 : currentTeacher.deleteMap);
                            currentTeacher.unlockMap = (resultTeacher === null || resultTeacher === void 0 ? void 0 : resultTeacher.unlockMap) || (currentTeacher === null || currentTeacher === void 0 ? void 0 : currentTeacher.unlockMap);
                            currentTeacher.viewSubject = setPermission(resultTeacher === null || resultTeacher === void 0 ? void 0 : resultTeacher.viewSubject, currentTeacher === null || currentTeacher === void 0 ? void 0 : currentTeacher.viewSubject);
                            currentTeacher.addSubject = setPermission(resultTeacher === null || resultTeacher === void 0 ? void 0 : resultTeacher.addSubject, currentTeacher === null || currentTeacher === void 0 ? void 0 : currentTeacher.addSubject);
                            currentTeacher.editSubject = setPermission(resultTeacher === null || resultTeacher === void 0 ? void 0 : resultTeacher.editSubject, currentTeacher === null || currentTeacher === void 0 ? void 0 : currentTeacher.editSubject);
                            currentTeacher.deleteSubject = setPermission(resultTeacher === null || resultTeacher === void 0 ? void 0 : resultTeacher.deleteSubject, currentTeacher === null || currentTeacher === void 0 ? void 0 : currentTeacher.deleteSubject);
                            currentTeacher.viewEvent = setPermission(resultTeacher === null || resultTeacher === void 0 ? void 0 : resultTeacher.viewEvent, currentTeacher === null || currentTeacher === void 0 ? void 0 : currentTeacher.viewEvent);
                            currentTeacher.addEvent = setPermission(resultTeacher === null || resultTeacher === void 0 ? void 0 : resultTeacher.addEvent, currentTeacher === null || currentTeacher === void 0 ? void 0 : currentTeacher.addEvent);
                            currentTeacher.editEvent = setPermission(resultTeacher === null || resultTeacher === void 0 ? void 0 : resultTeacher.editEvent, currentTeacher === null || currentTeacher === void 0 ? void 0 : currentTeacher.editEvent);
                            currentTeacher.deleteEvent = setPermission(resultTeacher === null || resultTeacher === void 0 ? void 0 : resultTeacher.deleteEvent, currentTeacher === null || currentTeacher === void 0 ? void 0 : currentTeacher.deleteEvent);
                            currentTeacher.viewUser = (resultTeacher === null || resultTeacher === void 0 ? void 0 : resultTeacher.viewUser) || (currentTeacher === null || currentTeacher === void 0 ? void 0 : currentTeacher.viewUser);
                            currentTeacher.addUser = (resultTeacher === null || resultTeacher === void 0 ? void 0 : resultTeacher.addUser) || (currentTeacher === null || currentTeacher === void 0 ? void 0 : currentTeacher.addUser);
                            currentTeacher.editUser = (resultTeacher === null || resultTeacher === void 0 ? void 0 : resultTeacher.editUser) || (currentTeacher === null || currentTeacher === void 0 ? void 0 : currentTeacher.editUser);
                            currentTeacher.deleteUser = (resultTeacher === null || resultTeacher === void 0 ? void 0 : resultTeacher.deleteUser) || (currentTeacher === null || currentTeacher === void 0 ? void 0 : currentTeacher.deleteUser);
                            currentTeacher.verifyUser = setVerificationPermission(resultTeacher === null || resultTeacher === void 0 ? void 0 : resultTeacher.verifyUser, currentTeacher === null || currentTeacher === void 0 ? void 0 : currentTeacher.verifyUser);
                            currentTeacher.viewGroup = (resultTeacher === null || resultTeacher === void 0 ? void 0 : resultTeacher.viewGroup) || (currentTeacher === null || currentTeacher === void 0 ? void 0 : currentTeacher.viewGroup);
                            currentTeacher.addGroup = (resultTeacher === null || resultTeacher === void 0 ? void 0 : resultTeacher.addGroup) || (currentTeacher === null || currentTeacher === void 0 ? void 0 : currentTeacher.addGroup);
                            currentTeacher.editGroup = (resultTeacher === null || resultTeacher === void 0 ? void 0 : resultTeacher.editGroup) || (currentTeacher === null || currentTeacher === void 0 ? void 0 : currentTeacher.editGroup);
                            currentTeacher.deleteGroup = (resultTeacher === null || resultTeacher === void 0 ? void 0 : resultTeacher.deleteGroup) || (currentTeacher === null || currentTeacher === void 0 ? void 0 : currentTeacher.deleteGroup);
                            currentTeacher.verifyGroup = setVerificationPermission(resultTeacher === null || resultTeacher === void 0 ? void 0 : resultTeacher.verifyGroup, currentTeacher === null || currentTeacher === void 0 ? void 0 : currentTeacher.verifyGroup);
                            currentTeacher.viewRole = (resultTeacher === null || resultTeacher === void 0 ? void 0 : resultTeacher.viewRole) || (currentTeacher === null || currentTeacher === void 0 ? void 0 : currentTeacher.viewRole);
                            currentTeacher.addRole = (resultTeacher === null || resultTeacher === void 0 ? void 0 : resultTeacher.addRole) || (currentTeacher === null || currentTeacher === void 0 ? void 0 : currentTeacher.addRole);
                            currentTeacher.editRole = (resultTeacher === null || resultTeacher === void 0 ? void 0 : resultTeacher.editRole) || (currentTeacher === null || currentTeacher === void 0 ? void 0 : currentTeacher.editRole);
                            currentTeacher.deleteRole = (resultTeacher === null || resultTeacher === void 0 ? void 0 : resultTeacher.deleteRole) || (currentTeacher === null || currentTeacher === void 0 ? void 0 : currentTeacher.deleteRole);
                            currentTeacher.verifyRole = setVerificationPermission(resultTeacher === null || resultTeacher === void 0 ? void 0 : resultTeacher.verifyRole, currentTeacher === null || currentTeacher === void 0 ? void 0 : currentTeacher.verifyRole); //Verify Object
                        }
                        current.teacher = currentTeacher;
                    }
                    // Student
                    if (typeof current.student === "boolean")
                        current.student = result.student || current.student;
                    else {
                        const currentStudent = current.student;
                        const resultStudent = result.student;
                        {
                            currentStudent.viewMap = (resultStudent === null || resultStudent === void 0 ? void 0 : resultStudent.viewMap) || (currentStudent === null || currentStudent === void 0 ? void 0 : currentStudent.viewMap);
                            currentStudent.addMap = (resultStudent === null || resultStudent === void 0 ? void 0 : resultStudent.addMap) || (currentStudent === null || currentStudent === void 0 ? void 0 : currentStudent.addMap);
                            currentStudent.editMap = (resultStudent === null || resultStudent === void 0 ? void 0 : resultStudent.editMap) || (currentStudent === null || currentStudent === void 0 ? void 0 : currentStudent.editMap);
                            currentStudent.deleteMap = (resultStudent === null || resultStudent === void 0 ? void 0 : resultStudent.deleteMap) || (currentStudent === null || currentStudent === void 0 ? void 0 : currentStudent.deleteMap);
                            currentStudent.unlockMap = (resultStudent === null || resultStudent === void 0 ? void 0 : resultStudent.unlockMap) || (currentStudent === null || currentStudent === void 0 ? void 0 : currentStudent.unlockMap);
                            currentStudent.viewSubject = setPermission(resultStudent === null || resultStudent === void 0 ? void 0 : resultStudent.viewSubject, currentStudent === null || currentStudent === void 0 ? void 0 : currentStudent.viewSubject);
                            currentStudent.addSubject = setPermission(resultStudent === null || resultStudent === void 0 ? void 0 : resultStudent.addSubject, currentStudent === null || currentStudent === void 0 ? void 0 : currentStudent.addSubject);
                            currentStudent.editSubject = setPermission(resultStudent === null || resultStudent === void 0 ? void 0 : resultStudent.editSubject, currentStudent === null || currentStudent === void 0 ? void 0 : currentStudent.editSubject);
                            currentStudent.deleteSubject = setPermission(resultStudent === null || resultStudent === void 0 ? void 0 : resultStudent.deleteSubject, currentStudent === null || currentStudent === void 0 ? void 0 : currentStudent.deleteSubject);
                            currentStudent.viewEvent = setPermission(resultStudent === null || resultStudent === void 0 ? void 0 : resultStudent.viewEvent, currentStudent === null || currentStudent === void 0 ? void 0 : currentStudent.viewEvent);
                            currentStudent.addEvent = setPermission(resultStudent === null || resultStudent === void 0 ? void 0 : resultStudent.addEvent, currentStudent === null || currentStudent === void 0 ? void 0 : currentStudent.addEvent);
                            currentStudent.editEvent = setPermission(resultStudent === null || resultStudent === void 0 ? void 0 : resultStudent.editEvent, currentStudent === null || currentStudent === void 0 ? void 0 : currentStudent.editEvent);
                            currentStudent.deleteEvent = setPermission(resultStudent === null || resultStudent === void 0 ? void 0 : resultStudent.deleteEvent, currentStudent === null || currentStudent === void 0 ? void 0 : currentStudent.deleteEvent);
                            currentStudent.viewUser = (resultStudent === null || resultStudent === void 0 ? void 0 : resultStudent.viewUser) || (currentStudent === null || currentStudent === void 0 ? void 0 : currentStudent.viewUser);
                            currentStudent.addUser = (resultStudent === null || resultStudent === void 0 ? void 0 : resultStudent.addUser) || (currentStudent === null || currentStudent === void 0 ? void 0 : currentStudent.addUser);
                            currentStudent.editUser = (resultStudent === null || resultStudent === void 0 ? void 0 : resultStudent.editUser) || (currentStudent === null || currentStudent === void 0 ? void 0 : currentStudent.editUser);
                            currentStudent.deleteUser = (resultStudent === null || resultStudent === void 0 ? void 0 : resultStudent.deleteUser) || (currentStudent === null || currentStudent === void 0 ? void 0 : currentStudent.deleteUser);
                            currentStudent.verifyUser = setVerificationPermission(resultStudent === null || resultStudent === void 0 ? void 0 : resultStudent.verifyUser, currentStudent === null || currentStudent === void 0 ? void 0 : currentStudent.verifyUser);
                            currentStudent.viewGroup = (resultStudent === null || resultStudent === void 0 ? void 0 : resultStudent.viewGroup) || (currentStudent === null || currentStudent === void 0 ? void 0 : currentStudent.viewGroup);
                            currentStudent.addGroup = (resultStudent === null || resultStudent === void 0 ? void 0 : resultStudent.addGroup) || (currentStudent === null || currentStudent === void 0 ? void 0 : currentStudent.addGroup);
                            currentStudent.editGroup = (resultStudent === null || resultStudent === void 0 ? void 0 : resultStudent.editGroup) || (currentStudent === null || currentStudent === void 0 ? void 0 : currentStudent.editGroup);
                            currentStudent.deleteGroup = (resultStudent === null || resultStudent === void 0 ? void 0 : resultStudent.deleteGroup) || (currentStudent === null || currentStudent === void 0 ? void 0 : currentStudent.deleteGroup);
                            currentStudent.verifyGroup = setVerificationPermission(resultStudent === null || resultStudent === void 0 ? void 0 : resultStudent.verifyGroup, currentStudent === null || currentStudent === void 0 ? void 0 : currentStudent.verifyGroup);
                            currentStudent.viewRole = (resultStudent === null || resultStudent === void 0 ? void 0 : resultStudent.viewRole) || (currentStudent === null || currentStudent === void 0 ? void 0 : currentStudent.viewRole);
                            currentStudent.addRole = (resultStudent === null || resultStudent === void 0 ? void 0 : resultStudent.addRole) || (currentStudent === null || currentStudent === void 0 ? void 0 : currentStudent.addRole);
                            currentStudent.editRole = (resultStudent === null || resultStudent === void 0 ? void 0 : resultStudent.editRole) || (currentStudent === null || currentStudent === void 0 ? void 0 : currentStudent.editRole);
                            currentStudent.deleteRole = (resultStudent === null || resultStudent === void 0 ? void 0 : resultStudent.deleteRole) || (currentStudent === null || currentStudent === void 0 ? void 0 : currentStudent.deleteRole);
                            currentStudent.verifyRole = setVerificationPermission(resultStudent === null || resultStudent === void 0 ? void 0 : resultStudent.verifyRole, currentStudent === null || currentStudent === void 0 ? void 0 : currentStudent.verifyRole); //Verify Object
                        }
                        current.student = currentStudent;
                    }
                    // Visitor
                    if (typeof current.visitor === "boolean")
                        current.visitor = result.visitor || current.visitor;
                    else {
                        const currentVisitor = current.visitor;
                        const resultVisitor = result.visitor;
                        {
                            currentVisitor.viewMap = (resultVisitor === null || resultVisitor === void 0 ? void 0 : resultVisitor.viewMap) || (currentVisitor === null || currentVisitor === void 0 ? void 0 : currentVisitor.viewMap);
                            currentVisitor.addMap = (resultVisitor === null || resultVisitor === void 0 ? void 0 : resultVisitor.addMap) || (currentVisitor === null || currentVisitor === void 0 ? void 0 : currentVisitor.addMap);
                            currentVisitor.editMap = (resultVisitor === null || resultVisitor === void 0 ? void 0 : resultVisitor.editMap) || (currentVisitor === null || currentVisitor === void 0 ? void 0 : currentVisitor.editMap);
                            currentVisitor.deleteMap = (resultVisitor === null || resultVisitor === void 0 ? void 0 : resultVisitor.deleteMap) || (currentVisitor === null || currentVisitor === void 0 ? void 0 : currentVisitor.deleteMap);
                            currentVisitor.unlockMap = (resultVisitor === null || resultVisitor === void 0 ? void 0 : resultVisitor.unlockMap) || (currentVisitor === null || currentVisitor === void 0 ? void 0 : currentVisitor.unlockMap);
                            currentVisitor.viewSubject = setPermission(resultVisitor === null || resultVisitor === void 0 ? void 0 : resultVisitor.viewSubject, currentVisitor === null || currentVisitor === void 0 ? void 0 : currentVisitor.viewSubject);
                            currentVisitor.addSubject = setPermission(resultVisitor === null || resultVisitor === void 0 ? void 0 : resultVisitor.addSubject, currentVisitor === null || currentVisitor === void 0 ? void 0 : currentVisitor.addSubject);
                            currentVisitor.editSubject = setPermission(resultVisitor === null || resultVisitor === void 0 ? void 0 : resultVisitor.editSubject, currentVisitor === null || currentVisitor === void 0 ? void 0 : currentVisitor.editSubject);
                            currentVisitor.deleteSubject = setPermission(resultVisitor === null || resultVisitor === void 0 ? void 0 : resultVisitor.deleteSubject, currentVisitor === null || currentVisitor === void 0 ? void 0 : currentVisitor.deleteSubject);
                            currentVisitor.viewEvent = setPermission(resultVisitor === null || resultVisitor === void 0 ? void 0 : resultVisitor.viewEvent, currentVisitor === null || currentVisitor === void 0 ? void 0 : currentVisitor.viewEvent);
                            currentVisitor.addEvent = setPermission(resultVisitor === null || resultVisitor === void 0 ? void 0 : resultVisitor.addEvent, currentVisitor === null || currentVisitor === void 0 ? void 0 : currentVisitor.addEvent);
                            currentVisitor.editEvent = setPermission(resultVisitor === null || resultVisitor === void 0 ? void 0 : resultVisitor.editEvent, currentVisitor === null || currentVisitor === void 0 ? void 0 : currentVisitor.editEvent);
                            currentVisitor.deleteEvent = setPermission(resultVisitor === null || resultVisitor === void 0 ? void 0 : resultVisitor.deleteEvent, currentVisitor === null || currentVisitor === void 0 ? void 0 : currentVisitor.deleteEvent);
                            currentVisitor.viewUser = (resultVisitor === null || resultVisitor === void 0 ? void 0 : resultVisitor.viewUser) || (currentVisitor === null || currentVisitor === void 0 ? void 0 : currentVisitor.viewUser);
                            currentVisitor.addUser = (resultVisitor === null || resultVisitor === void 0 ? void 0 : resultVisitor.addUser) || (currentVisitor === null || currentVisitor === void 0 ? void 0 : currentVisitor.addUser);
                            currentVisitor.editUser = (resultVisitor === null || resultVisitor === void 0 ? void 0 : resultVisitor.editUser) || (currentVisitor === null || currentVisitor === void 0 ? void 0 : currentVisitor.editUser);
                            currentVisitor.deleteUser = (resultVisitor === null || resultVisitor === void 0 ? void 0 : resultVisitor.deleteUser) || (currentVisitor === null || currentVisitor === void 0 ? void 0 : currentVisitor.deleteUser);
                            currentVisitor.verifyUser = setVerificationPermission(resultVisitor === null || resultVisitor === void 0 ? void 0 : resultVisitor.verifyUser, currentVisitor === null || currentVisitor === void 0 ? void 0 : currentVisitor.verifyUser);
                            currentVisitor.viewGroup = (resultVisitor === null || resultVisitor === void 0 ? void 0 : resultVisitor.viewGroup) || (currentVisitor === null || currentVisitor === void 0 ? void 0 : currentVisitor.viewGroup);
                            currentVisitor.addGroup = (resultVisitor === null || resultVisitor === void 0 ? void 0 : resultVisitor.addGroup) || (currentVisitor === null || currentVisitor === void 0 ? void 0 : currentVisitor.addGroup);
                            currentVisitor.editGroup = (resultVisitor === null || resultVisitor === void 0 ? void 0 : resultVisitor.editGroup) || (currentVisitor === null || currentVisitor === void 0 ? void 0 : currentVisitor.editGroup);
                            currentVisitor.deleteGroup = (resultVisitor === null || resultVisitor === void 0 ? void 0 : resultVisitor.deleteGroup) || (currentVisitor === null || currentVisitor === void 0 ? void 0 : currentVisitor.deleteGroup);
                            currentVisitor.verifyGroup = setVerificationPermission(resultVisitor === null || resultVisitor === void 0 ? void 0 : resultVisitor.verifyGroup, currentVisitor === null || currentVisitor === void 0 ? void 0 : currentVisitor.verifyGroup);
                            currentVisitor.viewRole = (resultVisitor === null || resultVisitor === void 0 ? void 0 : resultVisitor.viewRole) || (currentVisitor === null || currentVisitor === void 0 ? void 0 : currentVisitor.viewRole);
                            currentVisitor.addRole = (resultVisitor === null || resultVisitor === void 0 ? void 0 : resultVisitor.addRole) || (currentVisitor === null || currentVisitor === void 0 ? void 0 : currentVisitor.addRole);
                            currentVisitor.editRole = (resultVisitor === null || resultVisitor === void 0 ? void 0 : resultVisitor.editRole) || (currentVisitor === null || currentVisitor === void 0 ? void 0 : currentVisitor.editRole);
                            currentVisitor.deleteRole = (resultVisitor === null || resultVisitor === void 0 ? void 0 : resultVisitor.deleteRole) || (currentVisitor === null || currentVisitor === void 0 ? void 0 : currentVisitor.deleteRole);
                            currentVisitor.verifyRole = setVerificationPermission(resultVisitor === null || resultVisitor === void 0 ? void 0 : resultVisitor.verifyRole, currentVisitor === null || currentVisitor === void 0 ? void 0 : currentVisitor.verifyRole); //Verify Object
                        }
                        current.visitor = currentVisitor;
                    }
                    const stringArr = [];
                    current.name = stringArr.concat(result.name, current.name);
                    return Object.assign(result, current);
                });
                console.log("Role: ", roles);
                res.status(200).json(roles);
            }
            catch (error) {
                console.error(error);
                if (error instanceof Error)
                    res.status(400).json({ name: "User Role", type: "View", message: error.message });
            }
        });
    }
    viewAssignedRolesDebug(req, res) {
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
                console.error(error);
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
const setPermission = (resultPermission, currentPermission) => {
    const permission = currentPermission;
    permission.value = (resultPermission === null || resultPermission === void 0 ? void 0 : resultPermission.value) || (currentPermission === null || currentPermission === void 0 ? void 0 : currentPermission.value);
    permission.schedule = (resultPermission === null || resultPermission === void 0 ? void 0 : resultPermission.schedule) || (currentPermission === null || currentPermission === void 0 ? void 0 : currentPermission.schedule);
    permission.participants = (resultPermission === null || resultPermission === void 0 ? void 0 : resultPermission.participants) || (currentPermission === null || currentPermission === void 0 ? void 0 : currentPermission.participants);
    permission.attendance = typeof (resultPermission === null || resultPermission === void 0 ? void 0 : resultPermission.attendance) === "boolean" || typeof (currentPermission === null || currentPermission === void 0 ? void 0 : currentPermission.attendance) === "boolean" ? (resultPermission === null || resultPermission === void 0 ? void 0 : resultPermission.attendance) || (currentPermission === null || currentPermission === void 0 ? void 0 : currentPermission.attendance) : setAttendancePermission(resultPermission === null || resultPermission === void 0 ? void 0 : resultPermission.attendance, currentPermission === null || currentPermission === void 0 ? void 0 : currentPermission.attendance);
    permission.verify = setVerificationPermission(resultPermission === null || resultPermission === void 0 ? void 0 : resultPermission.verify, currentPermission === null || currentPermission === void 0 ? void 0 : currentPermission.verify);
    return permission;
};
const setAttendancePermission = (resultAttendancePermission, currentAttendancePermission) => {
    const attendancePermission = currentAttendancePermission;
    attendancePermission.value = (resultAttendancePermission === null || resultAttendancePermission === void 0 ? void 0 : resultAttendancePermission.value) || (currentAttendancePermission === null || currentAttendancePermission === void 0 ? void 0 : currentAttendancePermission.value);
    attendancePermission.verifyAttendance = setVerificationPermission(resultAttendancePermission === null || resultAttendancePermission === void 0 ? void 0 : resultAttendancePermission.verifyAttendance, currentAttendancePermission === null || currentAttendancePermission === void 0 ? void 0 : currentAttendancePermission.verifyAttendance);
    return attendancePermission;
};
const setVerificationPermission = (resultVerificationPermission, currentVerificationPermission) => {
    const userVerificationArray = [];
    const verificationPermission = currentVerificationPermission;
    verificationPermission.by = userVerificationArray.concat(resultVerificationPermission === null || resultVerificationPermission === void 0 ? void 0 : resultVerificationPermission.by, currentVerificationPermission === null || currentVerificationPermission === void 0 ? void 0 : currentVerificationPermission.by);
    verificationPermission.value = (resultVerificationPermission === null || resultVerificationPermission === void 0 ? void 0 : resultVerificationPermission.value) || (currentVerificationPermission === null || currentVerificationPermission === void 0 ? void 0 : currentVerificationPermission.value);
    return verificationPermission;
};
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