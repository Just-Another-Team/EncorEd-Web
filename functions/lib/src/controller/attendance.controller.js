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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewAttendance = void 0;
const database_1 = require("../database");
const converter_1 = require("../models/converter");
const subject_controller_1 = require("./subject.controller");
const room_controller_1 = require("./room.controller");
const user_controller_1 = require("./user.controller");
const dayjs_1 = __importDefault(require("dayjs"));
const config_1 = require("../../config");
const attendanceCollection = database_1.db.collection(`/Attendances/`).withConverter((0, converter_1.converter)());
class attendance {
    viewAttendances(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield attendanceCollection.get()
                .then((attendanceDoc) => {
                const attendances = attendanceDoc.docs.map((doc) => {
                    return exports.viewAttendance.viewWithData(doc.id, doc.data());
                });
                return Promise.all(attendances)
                    .then((result => result))
                    .catch((error) => Promise.reject(error));
            })
                .then((result) => {
                res.status(200).json(result);
            })
                .catch((error) => {
                res.status(400).json(error);
            });
        });
    }
    addAttendance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const attendance = Object.assign(Object.assign({}, req.body), { ATTD_SUBMISSIONDATE: config_1.admin.firestore.Timestamp.now().toDate().toISOString(), ATTD_STATUS: 'Active' });
            yield attendanceCollection.doc().set(attendance)
                .then(() => {
                res.status(200).json("Attendance added successfully!");
            })
                .catch((error) => {
                console.error(error);
                res.status(400).json(error);
            });
        });
    }
    viewReduceAttendances(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield attendanceCollection.get()
                .then((attendanceSnapshot) => __awaiter(this, void 0, void 0, function* () {
                const attendances = attendanceSnapshot.docs.map((attendance) => {
                    return exports.viewAttendance.viewWithData(attendance.id, attendance.data());
                });
                const promisedAttendances = yield Promise.all(attendances);
                // const sortedData = promisedAttendances.sort((prevDate, currDate) => dayjs(prevDate.ATTD_SUBMISSIONDATE as string).isAfter(dayjs(currDate.ATTD_SUBMISSIONDATE as string)) ? 1 : -1)
                // sortedData.map((data) => {
                //     console.log(data.ATTD_ID, data.ATTD_SUBMISSIONDATE)
                // })
                const reduceAttendances = promisedAttendances.reduce((prev, curr, ind, _) => {
                    const previousAttendanceArray = prev;
                    const currentAttendance = curr;
                    //If one of the PREVIOUS ATTENDANCES and current attendance are the same subject and in the same day submitted
                    const previousAttendance = previousAttendanceArray.find(prevAttd => {
                        const previousAttendanceSubmissionDay = (0, dayjs_1.default)(prevAttd.ATTD_SUBMISSIONDATE);
                        const currentAttendanceSubmissionDay = (0, dayjs_1.default)(currentAttendance.ATTD_SUBMISSIONDATE);
                        const previousAttendanceSubject = prevAttd.SUB_ID;
                        const currentAttendanceSubject = currentAttendance.SUB_ID;
                        return currentAttendanceSubject.SUB_ID === previousAttendanceSubject.SUB_ID && currentAttendanceSubmissionDay.isSame(previousAttendanceSubmissionDay, 'day');
                    });
                    // If there is no current attendance, then
                    if (previousAttendance === undefined) {
                        prev.push(curr);
                        return prev;
                    }
                    const mergedAttendance = Object.assign(Object.assign(Object.assign({}, previousAttendance), currentAttendance), { ATTD_TEACHERSTATUS: AttendanceStatus(previousAttendance.ATTD_TEACHERSTATUS, currentAttendance.ATTD_TEACHERSTATUS), ATTD_SUBMISSIONDATE: {
                            firstSubmission: previousAttendance.ATTD_SUBMISSIONDATE,
                            lastSubmission: currentAttendance.ATTD_SUBMISSIONDATE,
                        } });
                    // The mergedAttendance is duplicated from the previousAttendance
                    // Replace or erase the previousAttendance with the mergedAttendance
                    const newArray = previousAttendanceArray.filter(prevAttd => prevAttd.ATTD_ID !== previousAttendance.ATTD_ID);
                    newArray.push(mergedAttendance);
                    return newArray;
                }, []);
                return Promise.all(reduceAttendances)
                    .then((result) => {
                    res.status(200).json(result);
                })
                    .catch((error) => Promise.reject(error));
            }))
                .catch((error) => {
                res.status(400).json(error.message);
            });
        });
    }
}
const AttendanceStatus = (prevStatus, currStatus) => {
    return prevStatus === "present" && currStatus === "present" ? "Present" :
        prevStatus === "present" && currStatus === "missing" ? "Early Dismissal" :
            prevStatus === "missing" && currStatus === "present" ? "Late" : "Absent";
};
class ViewAttendance {
    view(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const attendance = yield attendanceCollection.doc(id).get();
            const subject = yield subject_controller_1.viewSubject.view(attendance.data().SUB_ID);
            const room = yield room_controller_1.viewRoom.view(attendance.data().ROOM_ID);
            const user = yield user_controller_1.viewUser.view(attendance.data().USER_ID);
            return (Object.assign(Object.assign({ ATTD_ID: attendance.id }, attendance.data()), { SUB_ID: subject, ROOM_ID: room, USER_ID: user }));
        });
    }
    viewWithData(id, attendance) {
        return __awaiter(this, void 0, void 0, function* () {
            const subject = yield subject_controller_1.viewSubject.view(attendance.SUB_ID);
            const room = yield room_controller_1.viewRoom.view(attendance.ROOM_ID);
            const user = yield user_controller_1.viewUser.view(attendance.USER_ID);
            return (Object.assign(Object.assign({ ATTD_ID: id }, attendance), { SUB_ID: subject, ROOM_ID: room, USER_ID: user }));
        });
    }
}
exports.viewAttendance = new ViewAttendance;
exports.default = new attendance;
//# sourceMappingURL=attendance.controller.js.map