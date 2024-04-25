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
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body.SCHED_ID !== null)
                req.body.SCHED_ID = yield exports.scheduleCollection.add(req.body.SCHED_ID).then((result) => result.id)
                    .catch((error) => {
                    console.error(error);
                    return Promise.reject(error);
                });
            const subject = {
                SUB_CODE: req.body.SUB_CODE,
                SUB_DESCRIPTION: req.body.SUB_DESCRIPTION,
                ROOM_ID: null,
                SCHED_ID: req.body.SCHED_ID,
                USER_ID: req.body.USER_ID,
                SUB_ISDELETED: false,
                SUB_CREATEDBY: req.body.SUB_CREATEDBY,
                SUB_UPDATEDBY: req.body.SUB_UPDATEDBY
            };
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
            const { id } = req.params;
            const reqSubject = {
                SUB_CODE: req.body.SUB_CODE,
                SUB_DESCRIPTION: req.body.SUB_DESCRIPTION,
                SUB_UPDATEDBY: req.body.SUB_UPDATEDBY
            };
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
            //View all of the schedules first <- CHECK
            //Find the schedule that has the same startTime, endTime, and weekAssigned <- CHECK
            //Get the schedule ID <- CHECK
            //Get the subjects based on the schedule ID <- CHECK
            //THIS IS A LONG ARSE PROCESS JUST TO ASSIGN A SUBJECT TO A SCHEDULE THAT EXISTS
            // const schedules = scheduleCollection.get()
            //     .then((scheduleDoc) => {
            //         const schedule = scheduleDoc.docs.map((doc):ISchedule => ({
            //             SCHED_ID: doc.id,
            //             ...doc.data() as ISchedule
            //         }))
            //         return Promise.all(schedule)
            //             .then((result => result))
            //             .catch((error) => Promise.reject(error))
            //     })
            //     .catch((error) => Promise.reject(error))
            // const scheduleIDs = await schedules
            //     .then((result) => {
            //         const filteredResult = result.filter((schedule) => {
            //             const reqStartTimeFormat = dayjs(req.body.SCHED_STARTTIME).format("HH:mm:ss")
            //             const reqEndTimeFormat = dayjs(req.body.SCHED_ENDTIME).format("HH:mm:ss")
            //             const startTimeFormat = dayjs(schedule.SCHED_STARTTIME).format("HH:mm:ss")
            //             const endTimeFormat = dayjs(schedule.SCHED_ENDTIME).format("HH:mm:ss")
            //             const reqStartTime = dayjs(`2001-01-01 ${reqStartTimeFormat}`)
            //             const reqEndTime = dayjs(`2001-01-01 ${reqEndTimeFormat}`)
            //             const startTime = dayjs(`2001-01-01 ${startTimeFormat}`)
            //             const endTime = dayjs(`2001-01-01 ${endTimeFormat}`)
            //             return schedule.SCHED_WEEKASSIGNED.some((day) => req.body.SCHED_WEEKASSIGNED.includes(day)) && (reqStartTime.isSame(startTime) && reqEndTime.isSame(endTime))
            //         })
            //         return filteredResult.map((schedule) => schedule.SCHED_ID)
            //     })
            //     // .catch((error) => {
            //     //     res.status(400).json(error)
            //     // })
            // await viewAllSubjectHelper()
            //     .then((data) => {
            //         const subjects = data.filter((subject) => scheduleIDs.includes((subject.SCHED_ID as ISchedule).SCHED_ID))
            //         res.status(200).json(subjects)
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
        return __awaiter(this, void 0, void 0, function* () {
            const subject = yield exports.subjectCollection.doc(id).get();
            const user = yield user_controller_1.viewUser.view(subject.data().USER_ID);
            const schedule = yield viewScheduleHelper(subject.data().SCHED_ID);
            const room = yield room_controller_1.viewRoom.view(subject.data().ROOM_ID);
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