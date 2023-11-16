"use strict";
//- Might change this to the controller side. - Gab from last month
//- Hmmm... about that one, Gab. - Gab from Sept 12, 2023
//- This IS the server side
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldPath = exports.Filter = exports.Query = exports.Timestamp = exports.db = void 0;
const config_1 = require("../config");
const firestore_1 = require("firebase-admin/firestore");
Object.defineProperty(exports, "Timestamp", { enumerable: true, get: function () { return firestore_1.Timestamp; } });
Object.defineProperty(exports, "Query", { enumerable: true, get: function () { return firestore_1.Query; } });
Object.defineProperty(exports, "Filter", { enumerable: true, get: function () { return firestore_1.Filter; } });
Object.defineProperty(exports, "FieldPath", { enumerable: true, get: function () { return firestore_1.FieldPath; } });
const db = (0, firestore_1.getFirestore)(config_1.adminApp);
exports.db = db;
//# sourceMappingURL=database.js.map