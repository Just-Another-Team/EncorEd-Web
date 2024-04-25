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
exports.viewFloorHelper = exports.floorCollection = void 0;
const converter_1 = require("../models/converter");
const database_1 = require("../database");
exports.floorCollection = database_1.db.collection("/Floor/").withConverter((0, converter_1.converter)());
class FloorService {
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield exports.floorCollection.doc().set(req.body)
                .then(() => {
                res.status(200).json("Floor added successfully!");
            })
                .catch((error) => {
                res.status(400).json(error);
            });
        });
    }
    addMultiple(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let addFloorBatch = database_1.db.batch();
            yield req.body.map((floor) => {
                addFloorBatch.set(exports.floorCollection.doc(), floor);
            });
            addFloorBatch.commit()
                .then(() => {
                res.status(200).json("Floors added successfully!");
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
            yield exports.floorCollection.get()
                .then((floorDocs) => {
                let floors = floorDocs.docs.map((floor) => {
                    return (Object.assign({ FLR_ID: floor.id }, floor.data()));
                });
                res.status(200).json(floors);
            })
                .catch((error) => {
                console.error(error);
                res.status(400).json(error.message);
            });
        });
    }
}
const viewFloorHelper = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const floor = yield exports.floorCollection.doc(id).get();
    return (Object.assign({ FLR_ID: id }, floor.data()));
});
exports.viewFloorHelper = viewFloorHelper;
exports.default = new FloorService;
//# sourceMappingURL=floor.controller.js.map