"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subjectScheduleCollection = void 0;
const database_1 = require("../database");
const converter_1 = require("../models/converter");
const subjectScheduleCollection = database_1.db.collection('/subjectSchedules/').withConverter((0, converter_1.converter)());
exports.subjectScheduleCollection = subjectScheduleCollection;
class SubjectScheduleService {
    viewAll(req, res) {
        throw new Error('Method not implemented.');
    }
    add(req, res) {
        throw new Error('Method not implemented.');
    }
    update(req, res) {
        throw new Error('Method not implemented.');
    }
    delete(req, res) {
        throw new Error('Method not implemented.');
    }
    view(req, res) {
        throw new Error('Method not implemented.');
    }
}
//# sourceMappingURL=subjectSchedule.controller.js.map