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
exports.institutionCollection = void 0;
const database_1 = require("../database");
const converter_1 = require("../models/converter");
exports.institutionCollection = database_1.db.collection(`/institutions/`).withConverter((0, converter_1.converter)());
class Institution {
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reqInstitution = req.body;
                const institution = {
                    id: reqInstitution.name.toLowerCase().replace(/\s/g, ''),
                    name: reqInstitution.name,
                    desc: reqInstitution.desc,
                    createdBy: reqInstitution.createdBy,
                    creationDate: new Date().toISOString(),
                    status: "Open"
                };
                yield exports.institutionCollection.doc(institution.id).create(institution);
                res.status(200).json({ message: "Institution added successfully" });
            }
            catch (error) {
                if (error instanceof Error) {
                    const institutionControllerError = {
                        name: "Institution",
                        error: true,
                        errorType: "Controller Error",
                        control: "Add",
                        message: error.message
                    };
                    res.status(400).json(institutionControllerError); //type: error.type, code: error.code
                }
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const insitutionId = req.params.id;
            try {
                //const institutionDocRef = db.doc(`/institutions/${id}`).withConverter(institutionConverter);
                const institutionDoc = exports.institutionCollection.doc(insitutionId);
                //If ID exist
                const oldInstitution = yield institutionDoc.get().then(institutionRecord => (Object.assign({ id: institutionRecord.id }, institutionRecord.data())));
                const reqInstitution = req.body;
                const institution = {
                    id: reqInstitution.name.toLowerCase().replace(/\s/g, ''),
                    name: reqInstitution.name,
                    desc: reqInstitution.desc,
                    createdBy: reqInstitution.createdBy,
                    creationDate: oldInstitution.creationDate,
                    status: "Open"
                };
                yield institutionDoc.set(institution)
                    .then(() => {
                    console.log("Successfully Updated Institution - Firestore (Set New)");
                });
                //Delete Old Id
                if (oldInstitution.id !== institution.id)
                    yield institutionDoc.delete()
                        .then(() => {
                        console.log("Successfully Updated Institution - Firestore (Delete Old)");
                    });
                res.status(200).json({ message: "Institution updated successfully!" });
            }
            catch (error) {
                if (error instanceof Error) {
                    const institutionControllerError = {
                        name: "Institution",
                        error: true,
                        errorType: "Controller Error",
                        control: "Update",
                        message: error.message
                    };
                    res.status(400).json(institutionControllerError); //type: error.type, code: error.code
                }
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //Delete institution by status
        });
    }
    view(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const institutionId = req.params.id;
                const institution = yield exports.institutionCollection.doc(institutionId).get()
                    .then((institutionRecord) => {
                    return (Object.assign({ id: institutionRecord.id }, institutionRecord.data()));
                });
                res.status(200).json(institution);
            }
            catch (error) {
                if (error instanceof Error) {
                    const userControllerError = {
                        name: "Institution",
                        error: true,
                        errorType: "Controller Error",
                        control: "View",
                        message: error.message
                    };
                    res.status(400).json(userControllerError); //type: error.type, code: error.code
                }
            }
        });
    }
    viewAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const institutionDoc = yield exports.institutionCollection.get();
                const institutions = institutionDoc.docs.map(institutionRecord => {
                    const institution = Object.assign({ id: institutionRecord.id }, institutionRecord.data());
                    return institution;
                });
                res.status(200).json(institutions);
            }
            catch (error) {
                if (error instanceof Error) {
                    const institutionControllerError = {
                        name: "Institution",
                        error: true,
                        errorType: "Controller Error",
                        control: "View",
                        message: error.message
                    };
                    res.status(400).json(institutionControllerError); //type: error.type, code: error.code
                }
            }
        });
    }
}
exports.default = new Institution;
//# sourceMappingURL=institution.controller.js.map