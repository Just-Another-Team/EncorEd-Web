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
const database_1 = require("../database");
const converter_1 = require("../models/converter");
const user_controller_1 = require("./user.controller");
const subject_controller_1 = require("./subject.controller");
const room_controller_1 = require("./room.controller");
const attendanceCollection = database_1.db.collection(`/Attendances/`).withConverter((0, converter_1.converter)());
class attendance {
    viewAttendances(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield attendanceCollection.get()
                .then((attendanceDoc) => {
                const attendances = attendanceDoc.docs.map((doc) => {
                    return viewAttendanceHelper(doc.id, doc.data());
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
            yield attendanceCollection.doc().set(Object.assign(Object.assign({}, req.body), { ATTD_STATUS: "Active", USER_ID: database_1.db.doc(`User/${req.body.USER_ID}`), ROOM_ID: database_1.db.doc(`Room/${req.body.ROOM_ID}`), SUB_ID: database_1.db.doc(`Subject/${req.body.SUB_ID}`) }))
                .then(() => {
                res.status(200).json("Attendance added successfully!");
            })
                .catch((error) => {
                console.error(error);
                res.status(400).json(error);
            });
        });
    }
    viewCurrentAttendances(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
        });
    }
}
const viewAttendanceHelper = (id, attendance) => {
    return attendance.USER_ID.get()
        .then((result) => {
        return (0, user_controller_1.viewUserHelper)(result.id, result.data())
            .then((user) => user)
            .catch((error) => Promise.reject(error));
    })
        .then((user) => {
        return attendance.ROOM_ID.get()
            .then((room) => {
            return (0, room_controller_1.viewRoomHelper)(room.id, room.data())
                .then((result) => ({
                USER_ID: user,
                ROOM_ID: result
            }))
                .catch(error => Promise.reject(error));
        })
            .catch((error) => Promise.reject(error));
    })
        .then((userRoom) => {
        return attendance.SUB_ID.get()
            .then((subject) => {
            return (0, subject_controller_1.viewSubjectHelper)(subject.id, subject.data())
                .then((result) => ({
                USER_ID: userRoom.USER_ID,
                ROOM_ID: userRoom.ROOM_ID,
                SUB_ID: Object.assign({ SUB_ID: result.SUB_ID }, result)
            }))
                .catch((error) => Promise.reject(error));
        })
            .catch((error) => Promise.reject(error));
    })
        .then((userRoomSub) => (Object.assign(Object.assign({ ATTD_ID: id }, attendance), { SUB_ID: userRoomSub.SUB_ID, ROOM_ID: userRoomSub.ROOM_ID, USER_ID: userRoomSub.USER_ID })))
        .catch((error) => Promise.reject(error));
};
exports.default = new attendance;
//# sourceMappingURL=attendance.controller.js.map