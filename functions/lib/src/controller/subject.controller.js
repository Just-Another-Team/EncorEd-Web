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
exports.subjectCollection = void 0;
const database_1 = require("../database");
const converter_1 = require("../models/converter");
// import { viewUser, userCollection } from './user.controller';
exports.subjectCollection = database_1.db.collection(`/subjects/`).withConverter((0, converter_1.converter)());
class SubjectService {
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reqSubject = req.body;
                const subject = {
                    name: reqSubject.name,
                    edpCode: reqSubject.edpCode,
                    type: reqSubject.type,
                    units: reqSubject.units,
                    institution: reqSubject.institution.toLowerCase().trim().replace(/\s/g, ''),
                    creationDate: reqSubject.creationDate,
                    createdBy: reqSubject.createdBy,
                    //updatedDate
                    //updatedBy
                    verifiedBy: reqSubject.verifiedBy,
                    status: reqSubject.status
                };
                // const subjectDocRef = await subjectCollection
                const subjectDoc = yield exports.subjectCollection.doc(`${subject.institution}-${subject.name.toLowerCase().trim().replace(/\s/g, '')}`);
                yield subjectDoc.create(subject);
                res.status(200).json({ message: "Subject added successfully" });
            }
            catch (error) {
                if (error instanceof Error) {
                    const subjectControllerError = {
                        name: "Subject",
                        error: true,
                        errorType: "Controller Error",
                        control: "Add",
                        message: error.message
                    };
                    res.status(400).json(subjectControllerError); //type: error.type, code: error.code
                }
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Method not implemented.');
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Method not implemented.');
        });
    }
    view(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Method not implemented.');
        });
    }
    viewAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Method not implemented.');
        });
    }
}
// const addSubject = async (req, res) => {
//     try {
//         let subject = new Subject(
//             req.body.name,
//             req.body.edpCode,
//             req.body.type,
//             req.body.units,
//             new Date(req.body.creationDate),
//             req.body.createdBy,
//             req.body.verifiedBy,
//             req.body.status
//         )
//         const subjectDocRef = await db.doc(`/subjects/`).withConverter(subjectConverter)
//         await subjectDocRef.create(subject)
//             .then((result) => {
//                 res.status(200).json({message: "Subject added successfully"})
//             })
//             .catch((err) => {
//                 throw {message: err.message}
//             })
//     } catch (e) {
//         res.status(400).json({name: "Subject", type: "Add", error: e.message})
//     }
// }
// const viewAllSubject = async (req, res) => {
//     //const subjects = []
//     try {
//         const getSubjectDocs = await subjectCollection.get();
//         if (getSubjectDocs.empty)
//             throw new Error("Subject collection is empty");
//         const subjects = await Promise.all(getSubjectDocs.docs.map(async (subject) => {
//             const {creationDate, createdBy} = subject.data()
//             const user = await userCollection.doc(createdBy).get()
//                 .then(res => res.data())
//                 .catch((error) => {throw error}) // "Throw is expensive"
//             return ({
//                 id: subject.id, //This should have been an edp code
//                 ...subject.data(),
//                 createdBy: user,
//                 creationDate: dayjs(new Timestamp(creationDate.seconds, creationDate.nanoseconds).toDate()).format("MMMM DD, YYYY"),
//             })
//         }))
//         res.status(200).json(subjects)
//     }
//     catch(e) {
//         res.status(400).json({error: e.message})
//     }
// }
// const viewSubject = async (req, res) => {
//     const id = req.params.id
//     try {
//         const subjectRef = db.doc(`/subjects/${id}`).withConverter(subjectConverter)
//         const subjectDoc = await subjectRef.get();
//         res.status(200).json(subjectDoc.data())
//     }
//     catch (e) {
//         res.status(400).json({error: "Error", message: e.message})
//     }
// }
// const updateSubject = async (req, res) => {
//     const id = req.params.id;
//     try {
//         const subjectDocRef = await db.doc(`/subjects/${id}`).withConverter(subjectConverter);
//         let subject = new Subject(
//             req.body.name,
//             req.body.edpCode,
//             req.body.type,
//             req.body.units,
//             new Date(req.body.creationDate),
//             req.body.createdBy,
//             req.body.verifiedBy,
//             req.body.status
//         );
//         await subjectDocRef.update(Object.create({}, subject))
//             .then((result) => {
//                 res.status(200).json({message: "Data updated successfully!"})
//             })
//             .catch((err) => {
//                 throw {message: err.message}
//             })
//         // await updateDoc(subjectSnapshot, {
//         //     name: subject.getName,
//         //     edpCode: subject.getEdpCode,
//         //     type: subject.getType,
//         //     units: subject.getUnits,
//         //     creationDate: subject.getCreationDate,
//         //     createdBy: subject.getCreatedBy,
//         //     verifiedBy: subject.getVerifiedBy,
//         //     status: subject.getStatus,
//         // })
//     } catch (e) {
//         res.status(400).json({name: "Subject", type: "Update", error: e.message})
//     }
// }
// const deleteSubject = async (req, res) => {
//     const id = req.params.id;
//     try {
//         const subjectDocRef = db.doc(`/subjects/${id}`).withConverter(subjectConverter);
//         await subjectDocRef.delete()
//             .then((result) => {
//                 res.status(200).json("Data deleted successfully.")
//             })
//             .catch((err) => {
//                 throw {message: err.message}
//             })
//     } catch (e) {
//         res.status(400).json({name: "Subject", type: "Delete", error: e.message})
//     }
// }
// module.exports = {addSubject, viewAllSubject, viewSubject, updateSubject, deleteSubject}
exports.default = new SubjectService;
//# sourceMappingURL=subject.controller.js.map