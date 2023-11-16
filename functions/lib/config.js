"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.admin = exports.clientApp = exports.adminApp = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); //{ path: './.env' }
const admin = __importStar(require("firebase-admin"));
exports.admin = admin;
const app_1 = require("firebase-admin/app");
const app_2 = require("firebase/app");
const firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.SENDERIND,
    appId: process.env.APPID,
    measurementId: process.env.MEASUREMENTID
};
const adminApp = (0, app_1.initializeApp)({
    credential: admin.credential.cert("./serviceAccountKey/encored-bd6f8-firebase-adminsdk-oua3q-e9c83466f0.json"),
    serviceAccountId: "firebase-adminsdk-oua3q@encored-bd6f8.iam.gserviceaccount.com",
});
exports.adminApp = adminApp;
const clientApp = (0, app_2.initializeApp)(firebaseConfig);
exports.clientApp = clientApp;
//# sourceMappingURL=config.js.map