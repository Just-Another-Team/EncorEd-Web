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
const subjectSchedule_controller_1 = require("./subjectSchedule.controller");
// import { viewUser, userCollection } from './user.controller';
exports.subjectCollection = database_1.db.collection(`/subjects/`).withConverter((0, converter_1.converter)());
class SubjectService {
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const reqSubject = req.body;
            try {
                const subject = {
                    name: reqSubject.name,
                    edpCode: reqSubject.edpCode,
                    type: reqSubject.type,
                    units: reqSubject.units,
                    institution: reqSubject.institution.toLowerCase().trim().replace(/\s/g, ''),
                    creationDate: new Date().toISOString(),
                    createdBy: reqSubject.createdBy,
                    updatedDate: new Date().toISOString(),
                    updatedBy: reqSubject.createdBy,
                    verifiedBy: null,
                    status: "Open"
                };
                // const subjectDocRef = await subjectCollection
                yield exports.subjectCollection.doc(`${subject.institution}-${subject.type.substring(0, 3).toLowerCase()}-${subject.name.toLowerCase().trim().replace(/\s/g, '')}`).create(subject);
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
                    res.status(400).json(subjectControllerError); //Get this outside of the if statement
                }
            }
        });
    }
    addAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const reqSubject = req.body;
            try {
                const batch = database_1.db.batch();
                reqSubject.map((el) => {
                    const reqSubjectDetails = el.details;
                    const subject = {
                        name: reqSubjectDetails.name,
                        edpCode: reqSubjectDetails.edpCode,
                        type: reqSubjectDetails.type,
                        units: reqSubjectDetails.units,
                        institution: el.institution.toLowerCase().trim().replace(/\s/g, ''),
                        creationDate: new Date().toISOString(),
                        createdBy: el.createdBy,
                        updatedDate: new Date().toISOString(),
                        updatedBy: el.createdBy,
                        verifiedBy: null,
                        status: "Open"
                    };
                    const subjectDetailRef = exports.subjectCollection.doc(`${subject.institution}-${subject.type.substring(0, 3).toLowerCase()}-${subject.name.toLowerCase().trim().replace(/\s/g, '')}`);
                    batch.create(subjectDetailRef, subject);
                    if (!!el.schedule) {
                        const reqSubjectSchedule = el.schedule;
                        console.log("Schedule Input:", el.schedule);
                        const subjectSchedule = {
                            subId: `${subject.institution}-${subject.type.substring(0, 3).toLowerCase()}-${subject.name.toLowerCase().trim().replace(/\s/g, '')}`,
                            roomId: null,
                            assignDays: reqSubjectSchedule.assignDays,
                            startTime: new Date(reqSubjectSchedule.startTime).toISOString(),
                            endTime: new Date(reqSubjectSchedule.endTime).toISOString(),
                            createdBy: el.createdBy,
                            verifiedBy: el.createdBy,
                            status: "Open",
                        };
                        const subjectScheduleRef = subjectSchedule_controller_1.subjectScheduleCollection.doc(`${subject.institution}-${subject.type.substring(0, 3).toLowerCase()}-${subject.name.toLowerCase().trim().replace(/\s/g, '')}`);
                        batch.create(subjectScheduleRef, subjectSchedule);
                    }
                    if (!!el.assignedRoom) {
                        console.log("Assigned Room");
                    }
                });
                yield batch.commit();
                res.status(200).json("Subjects added successfully!");
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    const subjectControllerError = {
                        name: "Subject",
                        error: true,
                        errorType: "Controller Error",
                        control: "Add Bulk",
                        message: error.message
                    };
                    res.status(400).json(subjectControllerError); //Get this outside of the if statement
                }
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const subjectParamId = req.params.id;
            const reqSubject = req.body;
            try {
                const subjectDoc = exports.subjectCollection.doc(subjectParamId);
                const oldSubject = yield subjectDoc.get()
                    .then(subject => (Object.assign({ id: subject.id }, subject.data())))
                    .catch(error => { throw new Error(error); });
                const newSubject = {
                    name: reqSubject.name !== undefined ? reqSubject.name : oldSubject.name,
                    edpCode: reqSubject.edpCode !== undefined ? reqSubject.edpCode : oldSubject.edpCode,
                    type: reqSubject.type !== undefined ? reqSubject.type : oldSubject.type,
                    units: reqSubject.units !== undefined ? reqSubject.units : oldSubject.units,
                    institution: reqSubject.institution !== undefined ? reqSubject.institution.toLowerCase().trim().replace(/\s/g, '') : oldSubject.institution,
                    creationDate: oldSubject.creationDate,
                    createdBy: oldSubject.createdBy,
                    updatedDate: reqSubject.updatedDate,
                    updatedBy: reqSubject.updatedBy,
                    verifiedBy: reqSubject.verifiedBy !== undefined ? reqSubject.verifiedBy : oldSubject.verifiedBy,
                    status: oldSubject.status
                };
                const newSubId = `${newSubject.institution}-${newSubject.type.substring(0, 3).toLowerCase()}-${newSubject.name.toLowerCase().trim().replace(/\s/g, '')}`;
                if (oldSubject.id !== newSubId) {
                    yield subjectDoc.delete().then(() => { console.log("Successfully Updated Subject - Firestore (Delete Old)"); }).catch(error => { throw new Error(error); });
                    yield exports.subjectCollection.doc(newSubId).set(newSubject);
                }
                else
                    yield exports.subjectCollection.doc(newSubId).update(newSubject);
                res.status(200).json({ message: "Subject updated successfully" });
            }
            catch (error) {
                if (error instanceof Error) {
                    const subjectControllerError = {
                        name: "Subject",
                        error: true,
                        errorType: "Controller Error",
                        control: "Update",
                        message: error.message,
                        stack: error.stack
                    };
                    console.error(error);
                    res.status(400).json(subjectControllerError); //type: error.type, code: error.code
                }
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const subjectId = req.params.id;
            try {
                yield subjectSchedule_controller_1.subjectScheduleCollection.doc(subjectId).delete();
                yield exports.subjectCollection.doc(subjectId).delete();
                res.status(200).json({ message: "Subject Deleted Successfully!" });
            }
            catch (error) {
                if (error instanceof Error) {
                    const subjectControllerError = {
                        name: "Subject",
                        error: true,
                        errorType: "Controller Error",
                        control: "View",
                        message: error.message
                    };
                    res.status(400).json(subjectControllerError); //Get this outside of the if statement
                }
            }
        });
    }
    view(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const subjectId = req.params.id;
            try {
                const subjectRef = yield exports.subjectCollection.doc(subjectId).get();
                res.status(200).json(Object.assign({ id: subjectRef.id }, subjectRef.data()));
            }
            catch (error) {
                if (error instanceof Error) {
                    const subjectControllerError = {
                        name: "Subject",
                        error: true,
                        errorType: "Controller Error",
                        control: "View",
                        message: error.message
                    };
                    res.status(400).json(subjectControllerError); //Get this outside of the if statement
                }
            }
        });
    }
    viewAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subjectRef = yield exports.subjectCollection.get();
                const subjectScheduleRef = yield subjectSchedule_controller_1.subjectScheduleCollection.get();
                console.log("Hello!");
                const subjects = subjectRef.docs.map(subject => {
                    const schedule = subjectScheduleRef.docs.find(schedule => schedule.data().subId === subject.id);
                    console.log(schedule === null || schedule === void 0 ? void 0 : schedule.data());
                    return {
                        id: subject.id,
                        details: subject.data(),
                        schedule: schedule === null || schedule === void 0 ? void 0 : schedule.data(),
                    };
                });
                res.status(200).json(subjects);
            }
            catch (error) {
                if (error instanceof Error) {
                    const subjectControllerError = {
                        name: "Subject",
                        error: true,
                        errorType: "Controller Error",
                        control: "View All",
                        message: error.message
                    };
                    res.status(400).json(subjectControllerError); //Get this outside of the if statement
                }
            }
        });
    }
    viewAllByInstitution(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const institutionId = req.params.institution;
            try {
                const subjectRef = yield exports.subjectCollection.where('institution', '==', institutionId)
                    .where('status', '==', 'Open')
                    .get();
                const subjectScheduleRef = yield subjectSchedule_controller_1.subjectScheduleCollection.get();
                const subjects = subjectRef.docs.map(subject => {
                    const schedule = subjectScheduleRef.docs.find(schedule => schedule.data().subId === subject.id);
                    return {
                        details: Object.assign({ id: subject.id }, subject.data()),
                        schedule: schedule === null || schedule === void 0 ? void 0 : schedule.data(),
                    };
                });
                // details?: ISubject;
                // schedule?: object;
                // assignedRoom?: object;
                // createdBy?: string;
                // creationDate?: string;
                // updatedBy?: string;
                // updatedDate?: string;
                // institution?: string;
                res.status(200).json(subjects);
            }
            catch (error) {
                if (error instanceof Error) {
                    const subjectControllerError = {
                        name: "Subject",
                        error: true,
                        errorType: "Controller Error",
                        control: "View All",
                        message: error.message
                    };
                    res.status(400).json(subjectControllerError); //Get this outside of the if statement
                }
            }
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