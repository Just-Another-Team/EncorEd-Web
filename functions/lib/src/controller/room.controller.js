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
exports.viewRoom = exports.roomCollection = void 0;
const converter_1 = require("../models/converter");
const database_1 = require("../database");
const floor_controller_1 = require("./floor.controller");
const subject_controller_1 = require("./subject.controller");
exports.roomCollection = database_1.db.collection("/Room/").withConverter((0, converter_1.converter)());
class RoomService {
    add(req, res) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const roomId = `room_${(_a = req.body.ROOM_TYPE) === null || _a === void 0 ? void 0 : _a.toLowerCase()}_${(_b = req.body.ROOM_NAME) === null || _b === void 0 ? void 0 : _b.replace(/\s/g, "").toLowerCase()}`;
            const room = Object.assign(Object.assign({}, req.body), { ROOM_ISDELETED: false, ROOM_REMARKS: req.body.ROOM_TYPE === "Office" ? `On Saturdays, ${req.body.ROOM_NAME} will be open between 8:00 AM to 12:00 PM.` : null });
            //add schedule
            if (req.body.SCHED_ID !== null) {
                room.SCHED_ID = `room_allday_${(_c = req.body.ROOM_NAME) === null || _c === void 0 ? void 0 : _c.replace(/\s/g, "").toLowerCase()}`;
                yield subject_controller_1.scheduleCollection.doc(room.SCHED_ID).set(req.body.SCHED_ID);
                // room.SCHED_ID = await scheduleCollection.add(req.body.SCHED_ID as ISchedule).then((result) => result.id)
                //                             .catch((error) => {
                //                                 console.error(error)
                //                                 return Promise.reject(error)
                //                             })
            }
            yield exports.roomCollection.doc(roomId).set(room)
                .then(() => {
                res.status(200).json("Room added successfully!");
            })
                .catch((error) => {
                res.status(400).json(error);
            });
        });
    }
    update(req, res) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const roomId = `room_${(_a = req.body.ROOM_TYPE) === null || _a === void 0 ? void 0 : _a.toLowerCase()}_${(_b = req.body.ROOM_NAME) === null || _b === void 0 ? void 0 : _b.replace(/\s/g, "").toLowerCase()}`;
            const room = req.body;
            if (req.body.SCHED_ID === null) {
                room.SCHED_ID = null;
                if (req.body.OLD_SCHED_ID !== null)
                    yield subject_controller_1.scheduleCollection.doc(req.body.OLD_SCHED_ID).delete();
            }
            else {
                const newSchedId = `room_allday_${(_c = req.body.ROOM_NAME) === null || _c === void 0 ? void 0 : _c.replace(/\s/g, "").toLowerCase()}`;
                if (req.body.OLD_SCHED_ID !== null)
                    yield subject_controller_1.scheduleCollection.doc(req.body.OLD_SCHED_ID).delete(); //delete the old schedule
                if (!!req.body.SCHED_ID.SCHED_ID)
                    delete req.body.SCHED_ID.SCHED_ID;
                yield subject_controller_1.scheduleCollection.doc(newSchedId).set(req.body.SCHED_ID);
                room.SCHED_ID = newSchedId;
            }
            delete room.OLD_SCHED_ID;
            yield exports.roomCollection.doc(id).delete();
            room.ROOM_REMARKS = room.ROOM_TYPE === "Office" ? `On Saturdays, ${req.body.ROOM_NAME} will be open between 8:00 AM to 12:00 PM.` : null;
            yield exports.roomCollection.doc(roomId).set(room)
                .then(() => {
                res.status(200).json("Room updated successfully!");
            })
                .catch((error) => {
                res.status(400).json(error.message);
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield exports.roomCollection.doc(id).update({
                ROOM_ISDELETED: true
            })
                .then(() => {
                res.status(200).json("Room deleted successfully!");
            })
                .catch((error) => {
                res.status(400).json(error);
            });
        });
    }
    view(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield exports.viewRoom.view(id)
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
            yield exports.roomCollection.get()
                .then((roomDoc) => {
                const roomMap = roomDoc.docs.map((doc) => {
                    return exports.viewRoom.viewWithData(doc.id, doc.data());
                });
                return Promise.all(roomMap)
                    .then((rooms) => {
                    res.status(200).json(rooms);
                })
                    .catch((error) => {
                    return Promise.reject(error);
                });
            })
                .catch((error) => {
                console.error(error);
                res.status(400).json(error.message);
            });
        });
    }
    viewAssignedSubjects(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield exports.roomCollection.get()
                .then((roomDoc) => {
                const roomMap = roomDoc.docs.map((doc) => {
                    return exports.viewRoom.viewWithData(doc.id, doc.data());
                });
                return Promise.all(roomMap)
                    .then((rooms) => {
                    res.status(200).json(rooms);
                })
                    .catch((error) => {
                    return Promise.reject(error);
                });
            })
                .catch((error) => {
                console.error(error);
                res.status(400).json(error.message);
            });
        });
    }
}
class ViewRoom {
    view(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const room = yield exports.roomCollection.doc(id).get();
            const floor = yield (0, floor_controller_1.viewFloorHelper)(room.data().FLR_ID);
            return ({
                ROOM_ID: id,
                ROOM_NAME: room.data().ROOM_NAME,
                FLR_ID: floor
            });
        });
    }
    viewAssignedSubjects(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const room = yield exports.roomCollection.doc(id).get();
            const assignedSubjects = yield subject_controller_1.subjectCollection.where('ROOM_ID', '==', room.id).get();
            const subjects = assignedSubjects.docs.map((subject) => {
                return subject_controller_1.viewSubject.viewWithData(subject.id, subject.data());
            });
            return Promise.all(subjects)
                .then((result => result))
                .catch((error) => Promise.reject(error));
        });
    }
    viewWithData(id, room) {
        return __awaiter(this, void 0, void 0, function* () {
            const floor = yield (0, floor_controller_1.viewFloorHelper)(room.FLR_ID);
            return ({
                ROOM_ID: id,
                ROOM_NAME: room.ROOM_NAME,
                FLR_ID: floor
            });
        });
    }
    viewWithDataAndAssignedSubjects(id, room) {
        return __awaiter(this, void 0, void 0, function* () {
            const assignedSubjects = yield subject_controller_1.subjectCollection.where('ROOM_ID', '==', room.ROOM_ID).get();
            const subjects = assignedSubjects.docs.map((subject) => {
                return subject_controller_1.viewSubject.viewWithData(subject.id, subject.data());
            });
            return Promise.all(subjects)
                .then((result => result))
                .catch((error) => Promise.reject(error));
        });
    }
}
exports.viewRoom = new ViewRoom;
exports.default = new RoomService;
//# sourceMappingURL=room.controller.js.map