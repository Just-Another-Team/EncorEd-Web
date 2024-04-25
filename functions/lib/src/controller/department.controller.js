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
exports.viewDepartmentHelper = exports.departmentCollection = void 0;
const converter_1 = require("../models/converter");
const database_1 = require("../database");
exports.departmentCollection = database_1.db.collection("/Department/").withConverter((0, converter_1.converter)());
class DepartmentService {
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const department = {
                DEPT_NAME: req.body.DEPT_NAME,
                DEPT_ISDELETED: false
            };
            yield exports.departmentCollection.doc().set(department)
                .then(() => {
                res.status(200).json("Department added successfully!");
            })
                .catch((error) => {
                res.status(400).json(error);
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield exports.departmentCollection.doc(id).update({
                DEPT_NAME: req.body.DEPT_NAME
            })
                .then(() => {
                res.status(200).json("Department updated successfully!");
            })
                .catch((error) => {
                console.error(error);
                res.status(400).json(error);
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield exports.departmentCollection.doc(id).update({
                DEPT_ISDELETED: true,
            })
                .then(() => {
                res.status(200).json("Department is deleted successfully!");
            })
                .catch((error) => {
                console.error(error);
                res.status(400).json(error);
            });
        });
    }
    view(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield (0, exports.viewDepartmentHelper)(id)
                .then((departmentDocs) => {
                res.status(200).json(departmentDocs);
            })
                .catch((error) => {
                console.error(error);
                res.status(400).json(error.message);
            });
        });
    }
    viewAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield exports.departmentCollection.get()
                .then((departmentDocs) => {
                let departments = departmentDocs.docs.map((department) => (Object.assign({ DEPT_ID: department.id }, department.data())));
                res.status(200).json(departments.filter((department) => !department.DEPT_ISDELETED));
            })
                .catch((error) => {
                console.error(error);
                res.status(400).json(error.message);
            });
        });
    }
}
const viewDepartmentHelper = (id) => {
    return exports.departmentCollection.doc(id).get()
        .then((department) => {
        var _a;
        return ({
            DEPT_ID: department.id,
            DEPT_NAME: (_a = department.data()) === null || _a === void 0 ? void 0 : _a.DEPT_NAME
        });
    })
        .catch((error) => Promise.reject(error));
};
exports.viewDepartmentHelper = viewDepartmentHelper;
exports.default = new DepartmentService;
//# sourceMappingURL=department.controller.js.map