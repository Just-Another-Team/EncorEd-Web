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
exports.viewUser = exports.userCollection = void 0;
const converter_1 = require("../models/converter");
const database_1 = require("../database");
const authentication_1 = require("../authentication");
const department_controller_1 = require("./department.controller");
exports.userCollection = database_1.db.collection("/User/").withConverter((0, converter_1.converter)());
class UserService {
    getKey(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const apiKey = process.env.APIKEY;
                res.status(200).json(apiKey);
            }
            catch (error) {
                if (error instanceof Error) {
                    const userControllerError = {
                        name: "User",
                        error: true,
                        errorType: "Controller Error",
                        control: "Get API Key",
                        message: error.message
                    };
                    res.status(400).json(userControllerError);
                }
            }
        });
    }
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = {
                USER_FNAME: req.body.USER_FNAME,
                USER_MNAME: req.body.USER_MNAME,
                USER_LNAME: req.body.USER_LNAME,
                USER_USERNAME: req.body.USER_USERNAME,
                ROLE_ID: req.body.ROLE_ID,
                DEPT_ID: req.body.DEPT_ID,
                USER_ISDELETED: false,
                USER_CREATEDBY: req.body.USER_CREATEDBY,
                USER_UPDATEDBY: req.body.USER_UPDATEDBY,
            };
            //Firestore first before Auth or Auth before Firestore?
            yield authentication_1.adminAuth.createUser({
                email: req.body.USER_EMAIL,
                password: req.body.USER_PASSWORD,
                displayName: `${req.body.USER_FNAME} ${req.body.USER_MNAME !== null ? req.body.USER_MNAME : ""} ${req.body.USER_LNAME}`,
            }).then((result) => {
                return exports.userCollection.doc(result.uid).set(user)
                    .catch((error) => Promise.reject(error));
            }).then(() => {
                res.status(200).json("User added successfully!");
            }).catch((error) => {
                console.error(error);
                res.status(400).json(error);
            });
        });
    }
    addKiosk(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = {
                USER_USERNAME: req.body.USER_USERNAME,
                ROLE_ID: req.body.ROLE_ID,
                DEPT_ID: req.body.DEPT_ID,
                USER_ISDELETED: false,
                USER_CREATEDBY: req.body.USER_CREATEDBY,
                USER_UPDATEDBY: req.body.USER_UPDATEDBY,
            };
            //Firestore first before Auth or Auth before Firestore?
            yield authentication_1.adminAuth.createUser({
                email: req.body.USER_EMAIL,
                password: req.body.USER_PASSWORD,
                displayName: `${user.USER_USERNAME}`,
            }).then((result) => {
                return exports.userCollection.doc(result.uid).set(user)
                    .catch((error) => Promise.reject(error));
            }).then(() => {
                res.status(200).json("Kiosk added successfully!");
            }).catch((error) => {
                console.error(error);
                res.status(400).json(error.message);
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield exports.userCollection.doc(id).update({
                USER_FNAME: req.body.USER_FNAME,
                USER_MNAME: req.body.USER_MNAME,
                USER_LNAME: req.body.USER_LNAME,
                USER_USERNAME: req.body.USER_USERNAME,
                ROLE_ID: req.body.ROLE_ID,
                DEPT_ID: req.body.DEPT_ID,
                USER_UPDATEDBY: req.body.USER_UPDATEDBY
            })
                .then(() => {
                return authentication_1.adminAuth.updateUser(id, {
                    email: req.body.USER_EMAIL,
                    displayName: `${req.body.USER_FNAME} ${req.body.USER_MNAME} ${req.body.USER_LNAME}`,
                    password: req.body.USER_PASSWORD
                });
            })
                .then(() => {
                res.status(200).json("User updated successfully!");
            })
                .catch((error) => {
                console.error(error);
                res.status(400).json(error);
            });
        });
    }
    updateKiosk(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield exports.userCollection.doc(id).update({
                USER_USERNAME: req.body.USER_USERNAME,
                USER_UPDATEDBY: req.body.USER_UPDATEDBY
            })
                .then(() => {
                return authentication_1.adminAuth.updateUser(id, {
                    email: req.body.USER_EMAIL,
                    displayName: req.body.USER_USERNAME,
                    password: req.body.USER_PASSWORD,
                });
            })
                .then(() => {
                res.status(200).json("Kiosk updated successfully!");
            })
                .catch((error) => {
                console.error(error);
                res.status(400).json(error);
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            //Delete user and disable user from logging in
            yield exports.userCollection.doc(id).update({
                USER_ISDELETED: true,
            })
                .then(() => {
                res.status(200).json("User is deleted successfully!");
            })
                .catch((error) => {
                console.error(error);
                res.status(400).json(error);
            });
        });
    }
    assignDepartment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
        });
    }
    view(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if ((yield exports.userCollection.doc(id).get()).data() === undefined) {
                res.status(400).json("There is no user found in the database. Please try to register again.");
                return;
            }
            yield exports.userCollection.doc(id).get()
                .then((userDoc) => {
                return exports.viewUser.viewWithData(userDoc.id, userDoc.data());
            })
                .then((result) => {
                res.status(200).json(result);
            })
                .catch((error) => {
                console.error('User Controller\n', error);
                res.status(400).json(error.message);
            });
        });
    }
    viewAuth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield authentication_1.adminAuth.getUser(id)
                .then((result) => {
                res.status(201).json(result);
            })
                .catch((error) => {
                res.status(400).json(error.message);
            });
        });
    }
    viewAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Promise Chaining
            //  - Get the user authentication displayName and email
            //  - Get the user Role data based on the role ID
            //  - Get the user Department data based on department ID
            // The Promise.All method provides the array of user data
            // Afterall, the userDoc.docs.map is basically mapping the Promises
            const users = req.body.map((user) => {
                return exports.viewUser.viewWithData(user.USER_ID, user);
            });
            Promise.all(users)
                .then((result => {
                res.status(200).json(result.filter(user => !user.USER_ISDELETED));
            }))
                .catch((error) => {
                console.error(error);
                res.status(400).json(error);
            });
        });
    }
}
class ViewUser {
    viewWithData(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const authData = yield authentication_1.adminAuth.getUser(id);
            const department = yield (0, department_controller_1.viewDepartmentHelper)(user.DEPT_ID);
            return (Object.assign(Object.assign({}, user), { USER_ID: id, DEPT_ID: department, USER_EMAIL: authData.email, USER_FULLNAME: authData.displayName }));
        });
    }
    view(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield exports.userCollection.doc(id).get();
            const authData = yield authentication_1.adminAuth.getUser(id);
            const department = yield (0, department_controller_1.viewDepartmentHelper)(user.data().DEPT_ID);
            return (Object.assign(Object.assign({}, user.data()), { USER_ID: id, DEPT_ID: department, USER_EMAIL: authData.email, USER_FULLNAME: authData.displayName }));
        });
    }
}
exports.viewUser = new ViewUser;
exports.default = new UserService;
//# sourceMappingURL=user.controller.js.map