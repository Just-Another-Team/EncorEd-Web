"use strict";
// I just realized that this must be in the client side...
Object.defineProperty(exports, "__esModule", { value: true });
exports.signOut = exports.onAuthStateChanged = exports.signInWithEmailAndPassword = exports.createUserWithEmailAndPassword = exports.EmailAuthProvider = exports.clientAuth = exports.adminAuth = void 0;
const config_1 = require("../config");
const auth_1 = require("firebase-admin/auth");
const auth_2 = require("firebase/auth");
Object.defineProperty(exports, "EmailAuthProvider", { enumerable: true, get: function () { return auth_2.EmailAuthProvider; } });
Object.defineProperty(exports, "createUserWithEmailAndPassword", { enumerable: true, get: function () { return auth_2.createUserWithEmailAndPassword; } });
Object.defineProperty(exports, "signInWithEmailAndPassword", { enumerable: true, get: function () { return auth_2.signInWithEmailAndPassword; } });
Object.defineProperty(exports, "onAuthStateChanged", { enumerable: true, get: function () { return auth_2.onAuthStateChanged; } });
Object.defineProperty(exports, "signOut", { enumerable: true, get: function () { return auth_2.signOut; } });
const adminAuth = (0, auth_1.getAuth)(config_1.adminApp);
exports.adminAuth = adminAuth;
const clientAuth = (0, auth_2.getAuth)(config_1.clientApp);
exports.clientAuth = clientAuth;
//# sourceMappingURL=authentication.js.map