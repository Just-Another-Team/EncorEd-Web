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
exports.viewSubjectHelper = exports.scheduleCollection = exports.subjectCollection = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const database_1 = require("../database");
const converter_1 = require("../models/converter");
const user_controller_1 = require("./user.controller");
const room_controller_1 = require("./room.controller");
// import { viewUser, userCollection } from './user.controller';
exports.subjectCollection = database_1.db.collection(`/Subject/`).withConverter((0, converter_1.converter)());
exports.scheduleCollection = database_1.db.collection(`/Schedule/`).withConverter((0, converter_1.converter)());
class SubjectService {
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield addSubjectHelper(req.body)
                .then(() => {
                res.status(200).json("Subject added successfully!");
            })
                .catch((error) => {
                console.error(error);
                res.status(400).json(error);
            });
        });
    }
    addMultiple(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const subjectBatch = database_1.db.batch();
            //Promise.all
            // await addSubjectHelper(req.body)
            //     .then(() => {
            //         res.status(200).json("Subject added successfully!")
            //     })
            //     .catch((error) => {
            //         console.error(error)
            //         res.status(400).json(error)
            //     })
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Method not implemented.');
        });
    }
    assignRoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { subId } = req.params;
            const roomId = req.body.ROOM_ID;
            yield exports.subjectCollection.doc(subId).update({
                ROOM_ID: database_1.db.doc(`Room/${roomId}`),
            })
                .then(() => {
                res.status(200).json("Subject name is assigned to Room name");
            })
                .catch((error) => {
                res.status(400).json(error);
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield exports.subjectCollection.doc(id).update({
                SUB_STATUS: "Inactive",
            })
                .then(() => {
                res.status(200).json("Subject name is deleted successfully!");
            })
                .catch((error) => {
                res.status(400).json(error);
            });
        });
    }
    view(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Method not implemented.');
        });
    }
    viewBySchedule(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let currentTime = req.query.currentTime;
            yield viewAllSubjectHelper()
                .then((result) => {
                const currentSubject = result.filter((subject) => {
                    const schedule = subject.SCHED_ID;
                    const currentTimeFormat = (0, dayjs_1.default)(currentTime).format("HH:mm:ss");
                    const startTimeFormat = (0, dayjs_1.default)(schedule.SCHED_STARTTIME).format("HH:mm:ss");
                    const endTimeFormat = (0, dayjs_1.default)(schedule.SCHED_ENDTIME).format("HH:mm:ss");
                    const currentTimeVal = (0, dayjs_1.default)(`2001-01-01 ${currentTimeFormat}`);
                    const startTime = (0, dayjs_1.default)(`2001-01-01 ${startTimeFormat}`);
                    const endTime = (0, dayjs_1.default)(`2001-01-01 ${endTimeFormat}`);
                    return schedule.SCHED_WEEKASSIGNED.find((week) => week.toLowerCase() === (0, dayjs_1.default)(currentTime).format("dddd").toLowerCase()) && (currentTimeVal.isAfter(startTime) && currentTimeVal.isBefore(endTime));
                });
                res.status(200).json(currentSubject);
            })
                .catch((error) => {
                console.error(error);
                res.status(400).json(error);
            });
        });
    }
    viewAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield viewAllSubjectHelper()
                .then((result) => {
                res.status(200).json(result);
            })
                .catch((error) => {
                res.status(400).json(error);
            });
        });
    }
}
const addSubjectHelper = (reqSubject) => {
    return exports.scheduleCollection.add(reqSubject.SCHED_ID)
        .then((result) => {
        const subject = Object.assign(Object.assign({}, reqSubject), { USER_ID: database_1.db.doc(`User/${reqSubject.USER_ID}`), ROOM_ID: database_1.db.doc(`Room/${reqSubject.ROOM_ID}`), SCHED_ID: database_1.db.doc(`Schedule/${result.id}`) });
        return exports.subjectCollection.doc().set(subject)
            .catch((error) => Promise.reject(error));
    });
};
//TO-DO: Fix Proper View Subject Helper where it includes Floor
const viewSubjectHelper = (id, subject) => {
    return subject.SCHED_ID.get()
        //get schedule <- scheduleHelper
        .then((schedule) => {
        var _a, _b, _c;
        return ({
            SCHED_ID: {
                SCHED_ID: schedule.id,
                SCHED_STARTTIME: (_a = schedule.data()) === null || _a === void 0 ? void 0 : _a.SCHED_STARTTIME,
                SCHED_ENDTIME: (_b = schedule.data()) === null || _b === void 0 ? void 0 : _b.SCHED_ENDTIME,
                SCHED_WEEKASSIGNED: (_c = schedule.data()) === null || _c === void 0 ? void 0 : _c.SCHED_WEEKASSIGNED,
            }
        });
    })
        .then((scheduleRes) => {
        //Get all users from firestore and auth ASSIGNED
        return subject.USER_ID.get()
            .then((user) => {
            return (0, user_controller_1.viewUserHelper)(user.id, user.data());
        })
            .then((user) => (Object.assign(Object.assign({}, scheduleRes), { USER_ID: user })))
            .catch((error) => Promise.reject(error));
    })
        .then((schedUserRes) => {
        //Get Room <- View Room Helper
        return subject.ROOM_ID.get()
            .then((room) => {
            return (0, room_controller_1.viewRoomHelper)(room.id, room.data());
        })
            .then((result) => (Object.assign(Object.assign({}, schedUserRes), { ROOM_ID: result })))
            .catch((error) => Promise.reject(error));
    })
        .then((schedUserRoomRes) => (Object.assign(Object.assign({}, subject), { SUB_ID: id, ROOM_ID: schedUserRoomRes.ROOM_ID, SCHED_ID: schedUserRoomRes.SCHED_ID, USER_ID: schedUserRoomRes.USER_ID })))
        .catch((error) => Promise.reject(error));
};
exports.viewSubjectHelper = viewSubjectHelper;
const viewAllSubjectHelper = () => {
    return exports.subjectCollection.get()
        .then((subjectDoc) => {
        const subjects = subjectDoc.docs.map((doc) => {
            return (0, exports.viewSubjectHelper)(doc.id, doc.data());
        });
        return Promise.all(subjects)
            .then((result => result.filter(subject => subject.SUB_STATUS.toLowerCase() === "active")))
            .catch((error) => Promise.reject(error));
    })
        .catch((error) => Promise.reject(error));
};
exports.default = new SubjectService;
//# sourceMappingURL=subject.controller.js.map