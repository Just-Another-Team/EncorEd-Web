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
exports.viewRoomHelper = exports.viewRoomWithSubjectHelper = exports.roomCollection = void 0;
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
            throw new Error('Method not implemented.');
        });
    }
    viewAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield exports.roomCollection.get()
                .then((roomDoc) => {
                const roomMap = roomDoc.docs.map((doc) => {
                    return (0, exports.viewRoomHelper)(doc.id, doc.data());
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
    viewWithSubjects(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield exports.roomCollection.get()
                .then((roomDoc) => {
                const roomMap = roomDoc.docs.map((doc) => {
                    return (0, exports.viewRoomWithSubjectHelper)(doc.id, doc.data());
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
const viewRoomWithSubjectHelper = (id, data) => {
    return data.FLR_ID.get()
        .then((floor) => {
        return (0, floor_controller_1.viewFloorHelper)(floor.id, floor.data());
    })
        .then((floor) => ({
        ROOM_ID: id,
        ROOM_NAME: data.ROOM_NAME,
        FLR_ID: floor
    }))
        .then((room) => {
        return subject_controller_1.subjectCollection.where('ROOM_ID', '==', exports.roomCollection.doc(room.ROOM_ID != undefined ? room.ROOM_ID : "")).get()
            .then((subject) => {
            const subjects = subject.docs.map((doc) => {
                return (0, subject_controller_1.viewSubjectHelper)(doc.id, doc.data());
            });
            return Promise.all(subjects)
                .then((result => result))
                .catch((error) => Promise.reject(error));
        })
            .then((subjects) => ({
            ROOM_ID: room.ROOM_ID,
            ROOM_NAME: room.ROOM_NAME,
            FLR_ID: room.FLR_ID,
            SUBJECTS: subjects
        }))
            .catch((error) => Promise.reject(error));
    })
        .then((result) => result)
        .catch((error) => Promise.reject(error));
};
exports.viewRoomWithSubjectHelper = viewRoomWithSubjectHelper;
const viewRoomHelper = (id, data) => {
    return data.FLR_ID.get()
        .then((floor) => {
        return (0, floor_controller_1.viewFloorHelper)(floor.id, floor.data());
    })
        .then((floor) => ({
        ROOM_ID: id,
        ROOM_NAME: data.ROOM_NAME,
        FLR_ID: floor
    }))
        .catch((error) => Promise.reject(error));
};
exports.viewRoomHelper = viewRoomHelper;
exports.default = new RoomService;
//# sourceMappingURL=room.controller.js.map