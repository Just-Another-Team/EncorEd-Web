"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDownloadURL = exports.bucket = exports.storage = void 0;
const storage_1 = require("firebase-admin/storage");
Object.defineProperty(exports, "getDownloadURL", { enumerable: true, get: function () { return storage_1.getDownloadURL; } });
const config_1 = require("../config");
const storage = (0, storage_1.getStorage)(config_1.adminApp);
exports.storage = storage;
const bucket = storage.bucket('gs://encored-bd6f8.appspot.com');
exports.bucket = bucket;
//# sourceMappingURL=storage.js.map