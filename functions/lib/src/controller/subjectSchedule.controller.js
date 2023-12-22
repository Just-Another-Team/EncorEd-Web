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
exports.subjectScheduleCollection = void 0;
const database_1 = require("../database");
const converter_1 = require("../models/converter");
const subjectScheduleCollection = database_1.db.collection('/subjectSchedules/').withConverter((0, converter_1.converter)());
exports.subjectScheduleCollection = subjectScheduleCollection;
class SubjectScheduleService {
    viewAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subejctScheduleRef = yield subjectScheduleCollection.get();
                const subjects = subejctScheduleRef.docs.map(schedule => (Object.assign({ id: schedule.id }, schedule.data())));
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
    add(req, res) {
        throw new Error('Method not implemented.');
    }
    update(req, res) {
        throw new Error('Method not implemented.');
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const subjectId = req.params.id;
            try {
                yield subjectScheduleCollection.doc(subjectId).delete();
                res.status(200).json({ message: "Subject Schedule Deleted Successfully!" });
            }
            catch (error) {
                if (error instanceof Error) {
                    const subjectControllerError = {
                        name: "Subject Schedule",
                        error: true,
                        errorType: "Controller Error",
                        control: "Delete",
                        message: error.message
                    };
                    res.status(400).json(subjectControllerError); //Get this outside of the if statement
                }
            }
        });
    }
    view(req, res) {
        throw new Error('Method not implemented.');
    }
}
exports.default = new SubjectScheduleService;
//# sourceMappingURL=subjectSchedule.controller.js.map