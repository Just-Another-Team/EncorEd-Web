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
exports.campusCollection = void 0;
const converter_1 = require("../models/converter");
const database_1 = require("../database");
exports.campusCollection = database_1.db.collection("/Campus/").withConverter((0, converter_1.converter)());
class CampusController {
    view(req, res) {
        throw new Error('Method not implemented.');
    }
    viewAll(req, res) {
        throw new Error('Method not implemented.');
    }
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const campus = Object.assign(Object.assign({}, req.body), { CMPS_ISDELETED: false });
            yield exports.campusCollection.doc().set(campus)
                .then(() => {
                res.status(200).json("Campus added successfully!");
            })
                .catch((error) => {
                res.status(400).json(error);
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield exports.campusCollection.doc(id).update(Object.assign(Object.assign({}, req.body), { CMPS_ISDELETED: false }))
                .then(() => {
                res.status(200).json("Campus updated successfully!");
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
            yield exports.campusCollection.doc(id).update({
                CMPS_ISDELETED: true,
            })
                .then(() => {
                res.status(200).json("Campus is deleted successfully!");
            })
                .catch((error) => {
                console.error(error);
                res.status(400).json(error);
            });
        });
    }
}
exports.default = new CampusController;
//# sourceMappingURL=campus.controller.js.map