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
        return __awaiter(this, void 0, void 0, function* () {
            yield exports.roomCollection.doc().set(Object.assign(Object.assign({}, req.body), { FLR_ID: database_1.db.doc(`/Floor/${req.body.FLR_ID}`) }))
                .then(() => {
                res.status(200).json("Room added successfully!");
            })
                .catch((error) => {
                res.status(400).json(error);
            });
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