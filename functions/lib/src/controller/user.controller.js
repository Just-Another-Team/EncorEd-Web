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
exports.viewUserHelper = exports.userCollection = void 0;
const converter_1 = require("../models/converter");
const database_1 = require("../database");
const authentication_1 = require("../authentication");
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
                USER_USERNAME: req.body.USER_USERNAME,
                USER_PASSWORD: req.body.USER_PASSWORD,
                ROLE_ID: database_1.db.doc(`Role/${req.body.ROLE_ID}`),
                DEPT_ID: database_1.db.doc(`Department/${req.body.DEPT_ID}`),
                USER_ISDELETED: req.body.USER_ISDELETED,
            };
            yield authentication_1.adminAuth.createUser({
                email: req.body.USER_EMAIL,
                password: req.body.USER_PASSWORD,
                displayName: `${req.body.USER_FNAME} ${req.body.USER_MNAME} ${req.body.USER_LNAME}`,
            }).then((result) => {
                return exports.userCollection.doc(result.uid).set(user)
                    .catch((error) => Promise.reject(error));
            }).then(() => {
                res.status(200).json("User successfully added!");
            }).catch((error) => {
                res.status(400).json(error);
            });
        });
    }
    update(req, res) {
        throw new Error('Method not implemented.');
    }
    delete(req, res) {
        throw new Error('Method not implemented.');
    }
    view(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield exports.userCollection.doc(id).get()
                .then((userDoc) => {
                return (0, exports.viewUserHelper)(userDoc.id, userDoc.data());
            })
                .then((result) => {
                res.status(200).json(result);
            })
                .catch((error) => {
                res.status(400).json(error);
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
            yield exports.userCollection.get()
                .then((userDoc) => {
                const users = userDoc.docs.map((doc) => {
                    return (0, exports.viewUserHelper)(doc.id, doc.data());
                });
                return Promise.all(users)
                    .then((result => {
                    res.status(200).json(result);
                }))
                    .catch((error) => Promise.reject(error));
            })
                .catch((error) => {
                res.status(400).json(error);
            });
        });
    }
}
const viewUserHelper = (id, user) => {
    return authentication_1.adminAuth.getUser(id)
        .then((result) => ({
        USER_FULLNAME: result.displayName,
        USER_EMAIL: result.email
    }))
        .then((result) => {
        return user.ROLE_ID.get()
            .then((role) => {
            var _a;
            return (Object.assign(Object.assign({}, result), { ROLE_ID: role.id, ROLE_LABEL: (_a = role.data()) === null || _a === void 0 ? void 0 : _a.ROLE_LABEL }));
        })
            .catch((error) => Promise.reject(error));
    })
        .then((result) => {
        return user.DEPT_ID.get()
            .then((department) => (Object.assign(Object.assign({}, result), { DEPT_ID: department.id, DEPT_NAME: department.data().DEPT_NAME, DEPT_STATUS: department.data().DEPT_STATUS })))
            .catch((error) => Promise.reject(error));
    })
        .then((result) => (Object.assign(Object.assign({}, user), { USER_ID: id, USER_FULLNAME: result.USER_FULLNAME, USER_EMAIL: result.USER_EMAIL, ROLE_ID: {
            ROLE_ID: result.ROLE_ID,
            ROLE_LABEL: result.ROLE_LABEL,
        }, DEPT_ID: {
            DEPT_ID: result.DEPT_ID,
            DEPT_NAME: result.DEPT_NAME,
            DEPT_STATUS: result.DEPT_STATUS
        } })))
        .catch((error) => Promise.reject(error));
};
exports.viewUserHelper = viewUserHelper;
exports.default = new UserService;
//# sourceMappingURL=user.controller.js.map