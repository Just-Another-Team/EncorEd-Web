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
exports.viewSubject = exports.scheduleCollection = exports.subjectCollection = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const database_1 = require("../database");
const converter_1 = require("../models/converter");
const user_controller_1 = require("./user.controller");
const room_controller_1 = require("./room.controller");
const config_1 = require("../../config");
// import { viewUser, userCollection } from './user.controller';
exports.subjectCollection = database_1.db.collection(`/Subject/`).withConverter((0, converter_1.converter)());
exports.scheduleCollection = database_1.db.collection(`/Schedule/`).withConverter((0, converter_1.converter)());
class SubjectService {
    add(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const subject = {
                SUB_EDP_CODE: req.body.SUB_EDP_CODE,
                SUB_CODE: req.body.SUB_CODE,
                SUB_DESCRIPTION: req.body.SUB_DESCRIPTION,
                ROOM_ID: null,
                SCHED_ID: req.body.SCHED_ID,
                USER_ID: req.body.USER_ID,
                SUB_ISDELETED: false,
                SUB_CREATEDBY: req.body.SUB_CREATEDBY,
                SUB_UPDATEDBY: req.body.SUB_UPDATEDBY
            };
            if (req.body.SCHED_ID !== null) {
                const days = req.body.SCHED_ID.SCHED_WEEKASSIGNED.reduce((prevValue, curValue) => {
                    const currentValue = curValue == "Thursday" ? curValue.substring(0, 2) : curValue.charAt(0);
                    return prevValue + currentValue;
                }, "");
                subject.SCHED_ID = `subject_${days}_${(_a = req.body.SUB_CODE) === null || _a === void 0 ? void 0 : _a.replace(/\s/g, "")}`;
                yield exports.scheduleCollection.doc(subject.SCHED_ID).set(req.body.SCHED_ID);
            }
            yield exports.subjectCollection.add(subject)
                .then(() => {
                res.status(200).json(subject);
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
            req.body.forEach((subjectReq) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                const subject = {
                    SUB_EDP_CODE: subjectReq.SUB_EDP_CODE,
                    SUB_CODE: subjectReq.SUB_CODE,
                    SUB_DESCRIPTION: subjectReq.SUB_DESCRIPTION,
                    ROOM_ID: null,
                    SCHED_ID: subjectReq.SCHED_ID,
                    USER_ID: subjectReq.USER_ID,
                    SUB_ISDELETED: false,
                    SUB_CREATEDBY: subjectReq.SUB_CREATEDBY,
                    SUB_UPDATEDBY: subjectReq.SUB_UPDATEDBY
                };
                if (subjectReq.SCHED_ID !== null) {
                    const days = subjectReq.SCHED_ID.SCHED_WEEKASSIGNED.reduce((prevValue, curValue) => {
                        const currentValue = curValue == "Thursday" ? curValue.substring(0, 2) : curValue.charAt(0);
                        return prevValue + currentValue;
                    }, "");
                    subject.SCHED_ID = `subject_${days}_${(_a = subjectReq.SUB_CODE) === null || _a === void 0 ? void 0 : _a.replace(/\s/g, "")}`;
                    //await scheduleCollection.doc(subject.SCHED_ID).set(subjectReq.SCHED_ID as ISchedule)
                    subjectBatch.set(exports.scheduleCollection.doc(subject.SCHED_ID), subjectReq.SCHED_ID);
                }
                subjectBatch.create(exports.subjectCollection.doc(), subject);
            }));
            subjectBatch.commit()
                .then(() => {
                res.status(200).json("Subjects and schedules added successfully!");
            })
                .catch((error) => {
                console.error(error);
                res.status(400).json(error);
            });
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
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const reqSubject = {
                SUB_EDP_CODE: req.body.SUB_EDP_CODE,
                SUB_CODE: req.body.SUB_CODE,
                SUB_DESCRIPTION: req.body.SUB_DESCRIPTION,
                USER_ID: req.body.USER_ID,
                SUB_UPDATEDBY: req.body.SUB_UPDATEDBY
            };
            //Updating Subject Code also updates the Schedule ID
            const days = req.body.SCHED_ID.SCHED_WEEKASSIGNED.reduce((prevValue, curValue) => {
                const currentValue = curValue == "Thursday" ? curValue.substring(0, 2) : curValue.charAt(0);
                return prevValue + currentValue;
            }, "");
            yield exports.scheduleCollection.doc(req.body.SCHED_ID.SCHED_ID).delete();
            reqSubject.SCHED_ID = `subject_${days}_${(_a = req.body.SUB_CODE) === null || _a === void 0 ? void 0 : _a.replace(/\s/g, "")}`;
            yield exports.scheduleCollection.doc(reqSubject.SCHED_ID).set(req.body.SCHED_ID);
            //Assigning to a different user, that is okay, it's just replacing the UserID
            //Assigning to a different room, that is okay, it's just replacing the RoomID
            //Assigning to a different schedule, that is a different ball game
            yield exports.subjectCollection.doc(id).update(reqSubject)
                .then(() => {
                res.status(200).json("Subject is updated successfully!");
            })
                .catch((error) => {
                res.status(400).json(error);
            });
        });
    }
    assignInstructor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { subId } = req.params;
            yield exports.subjectCollection.doc(subId).update({
                USER_ID: req.body.USER_ID
            })
                .then(() => {
                res.status(200).json("User is assigned to subject successfully!");
            })
                .catch((error) => {
                res.status(400).json(error);
            });
        });
    }
    removeAssignInstructor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const subjectBatch = database_1.db.batch();
            const subjectIds = req.body;
            subjectIds.map(subjectId => {
                subjectBatch.update(exports.subjectCollection.doc(subjectId), { USER_ID: null });
            });
            yield subjectBatch.commit()
                .then(() => {
                res.status(200).json("Subjects' instructor removed successfully!");
            })
                .catch((error) => {
                res.status(400).json(error);
            });
            // await subjectCollection.doc(subId).update({
            //     USER_ID: null
            // })
            //     .then(() => {
            //         res.status(200).json("User is assigned to subject successfully!")
            //     })
            //     .catch((error) => {
            //         res.status(400).json(error)
            //     })
        });
    }
    assignRoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { subId } = req.params;
            const roomId = req.body.ROOM_ID;
            yield exports.subjectCollection.doc(subId).update({
                ROOM_ID: roomId,
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
                SUB_ISDELETED: true,
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
            const { id } = req.params;
            yield exports.viewSubject.view(id)
                .then((result) => {
                res.status(200).json(result);
            })
                .catch((error) => {
                console.error(error);
                res.status(400).json(error.message);
            });
        });
    }
    viewBySchedule(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let currentTime = req.query.currentTime;
            yield exports.viewSubject.viewAll()
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
            console.log(config_1.admin.firestore.Timestamp.now());
            yield exports.viewSubject.viewAll()
                .then((result) => {
                res.status(200).json(result);
            })
                .catch((error) => {
                console.error(error);
                res.status(400).json(error.message);
            });
        });
    }
}
const viewScheduleHelper = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const scheduleData = yield exports.scheduleCollection.doc(id).get();
    return (Object.assign({ SCHED_ID: scheduleData.id }, scheduleData.data()));
});
class ViewSubject {
    view(id) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const subject = yield exports.subjectCollection.doc(id).get();
            const user = yield user_controller_1.viewUser.view(subject.data().USER_ID);
            const schedule = yield viewScheduleHelper(subject.data().SCHED_ID);
            const room = ((_a = subject.data()) === null || _a === void 0 ? void 0 : _a.ROOM_ID) !== null ? yield room_controller_1.viewRoom.view(subject.data().ROOM_ID) : null;
            return (Object.assign(Object.assign({}, subject.data()), { SUB_ID: subject.id, ROOM_ID: room, SCHED_ID: schedule, USER_ID: user }));
        });
    }
    viewWithData(id, subject) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_controller_1.viewUser.view(subject.USER_ID);
            const schedule = yield viewScheduleHelper(subject.SCHED_ID);
            const room = subject.ROOM_ID !== null ? yield room_controller_1.viewRoom.view(subject.ROOM_ID) : null;
            return (Object.assign(Object.assign({}, subject), { SUB_ID: id, ROOM_ID: room, SCHED_ID: schedule, USER_ID: user }));
        });
    }
    viewAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const subjectSnapshot = yield exports.subjectCollection.get();
            const subjects = subjectSnapshot.docs.map((doc) => {
                return this.viewWithData(doc.id, doc.data());
            });
            return Promise.all(subjects)
                .then((result => result.filter(subject => !subject.SUB_ISDELETED)))
                .catch((error) => Promise.reject(error));
        });
    }
}
exports.viewSubject = new ViewSubject;
exports.default = new SubjectService;
//# sourceMappingURL=subject.controller.js.map