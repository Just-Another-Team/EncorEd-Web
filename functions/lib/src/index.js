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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSubjectNotification = exports.addNotification = exports.encored_api = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const converter_1 = require("./models/converter");
const firebase_functions_1 = require("firebase-functions");
const database_1 = require("./database");
dotenv_1.default.config();
/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
// Start writing functions
// https://firebase.google.com/docs/functions/typescript
const app = (0, express_1.default)();
const port = process.env.RUNNING_PORT;
app.use((0, cors_1.default)());
// app.use(express.json())
// app.use(express.urlencoded())
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
const user_1 = __importDefault(require("./routes/user"));
const role_1 = __importDefault(require("./routes/role"));
const subject_1 = __importDefault(require("./routes/subject"));
const attendance_1 = __importDefault(require("./routes/attendance"));
const floor_1 = __importDefault(require("./routes/floor"));
const room_1 = __importDefault(require("./routes/room"));
const department_1 = __importDefault(require("./routes/department"));
app.use("/user", user_1.default);
app.use("/role", role_1.default);
app.use("/subject", subject_1.default);
app.use("/attendance", attendance_1.default);
app.use("/floor", floor_1.default);
app.use("/room", room_1.default);
app.use("/department", department_1.default);
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
//Start the notifications
exports.encored_api = firebase_functions_1.https.onRequest(app);
//Set an export, starting with OnCreate Attendance with notifications
const notificationCollection = database_1.db.collection(`/Notifications/`).withConverter((0, converter_1.converter)());
exports.addNotification = firebase_functions_1.firestore.document('Attendances/{attendanceId}').onCreate((postSnapshot, context) => __awaiter(void 0, void 0, void 0, function* () {
    //When getting an attendance, include the following
    //Attendance Checker Data
    //Subject Data
    //Schedule Data
    const attendance = Object.assign({ ATTD_ID: postSnapshot.id }, postSnapshot.data());
    //Notification Descriptions
    //Attendance Checker <User Full name> confirms that Instructor <User Fullname> is Present/Missing in <Room Name> at <Submission Time>
    //Kiosk <Kiosk name> searched for <Room Name> at <Time searched>
    //Kiosk <Kiosk name> gave directions for <Room Name> at <Time searched>
    yield notificationCollection.add({
        NOTF_TYPE: `Attendance`,
        NOTF_DATA: attendance,
        NOTF_ISREAD: false,
        NOTF_DATE: attendance.ATTD_SUBMISSIONDATE,
    });
    //Set a notification collection
    //Add a notification based on the attendances made
    return null;
}));
//send attendance checker notification. Subject
exports.sendSubjectNotification = firebase_functions_1.pubsub.schedule('* * * * *').onRun((context) => __awaiter(void 0, void 0, void 0, function* () {
    const subjectQuery = yield database_1.db.collection(`/Subject/`).withConverter((0, converter_1.converter)()).get();
    const scheduleQuery = yield database_1.db.collection(`/Schedule/`).withConverter((0, converter_1.converter)()).get();
    // admin.firestore.Timestamp.now
}));
//# sourceMappingURL=index.js.map