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
exports.viewRoleHelper = exports.roleCollection = void 0;
const database_1 = require("../database");
const converter_1 = require("../models/converter");
exports.roleCollection = database_1.db.collection(`/Role/`).withConverter((0, converter_1.converter)());
class Role {
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield exports.roleCollection.add(req.body)
                .then(() => {
                res.status(200).json("Role successfully added!");
            })
                .catch((error) => {
                res.status(400).json(error);
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    view(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    viewAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield exports.roleCollection.get()
                .then((roleDocuments) => {
                const roles = roleDocuments.docs.map((role) => ({
                    ROLE_ID: role.id,
                    ROLE_LABEL: role.data().ROLE_LABEL,
                }));
                res.status(200).json(roles);
            })
                .catch((error) => {
                res.status(400).json(error);
            });
        });
    }
}
const viewRoleHelper = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const roleData = yield exports.roleCollection.doc(id).get();
    return ({
        ROLE_ID: roleData.id,
        ROLE_LABEL: roleData.data().ROLE_LABEL
    });
});
exports.viewRoleHelper = viewRoleHelper;
exports.default = new Role;
//# sourceMappingURL=role.controller.js.map