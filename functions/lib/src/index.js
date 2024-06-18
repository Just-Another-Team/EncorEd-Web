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
app.use(body_parser_1.default.json({ limit: '20mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '20mb', extended: true }));
app.use(body_parser_1.default.json());
const user_1 = __importDefault(require("./routes/user"));
const role_1 = __importDefault(require("./routes/role"));
const subject_1 = __importDefault(require("./routes/subject"));
const attendance_1 = __importDefault(require("./routes/attendance"));
const floor_1 = __importDefault(require("./routes/floor"));
const room_1 = __importDefault(require("./routes/room"));
const department_1 = __importDefault(require("./routes/department"));
const navigation_1 = __importDefault(require("./routes/navigation"));
const config_1 = require("../config");
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(timezone_1.default);
app.use("/user", user_1.default);
app.use("/role", role_1.default);
app.use("/subject", subject_1.default);
app.use("/attendance", attendance_1.default);
app.use("/floor", floor_1.default);
app.use("/room", room_1.default);
app.use("/department", department_1.default);
app.use("/navigation", navigation_1.default);
//Start the notifications
exports.encored_api = firebase_functions_1.https.onRequest(app);
//Set an export, starting with OnCreate Attendance with notifications
const notificationCollection = database_1.db.collection(`/Notifications/`).withConverter((0, converter_1.converter)());
const subjectCollection = database_1.db.collection(`/Subject/`).withConverter((0, converter_1.converter)());
const scheduleCollection = database_1.db.collection(`/Schedule/`).withConverter((0, converter_1.converter)());
const userCollection = database_1.db.collection(`/User/`).withConverter((0, converter_1.converter)());
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
// For notifications
const groupBy = (arr, key) => arr.reduce((groups, item) => {
    var _a;
    (groups[_a = key(item)] || (groups[_a] = [])).push(item);
    return groups;
}, {});
// app.listen(port, async () => {
//     console.log(`Server running on port ${port}`)
// });
//send attendance checker notification. Subject
//Send notification ON 0 and 30 ONLY
exports.sendSubjectNotification = firebase_functions_1.pubsub.schedule('0,30 * * * *').timeZone("Asia/Singapore").onRun((context) => __awaiter(void 0, void 0, void 0, function* () {
    const subjectQuery = yield subjectCollection.get();
    const scheduleQuery = yield scheduleCollection.get();
    const userQuery = yield userCollection.get();
    const currentTime = (0, dayjs_1.default)();
    const schedules = scheduleQuery.docs.map(doc => (Object.assign(Object.assign({}, doc.data()), { SCHED_ID: doc.id })));
    const subjects = subjectQuery.docs.filter(subject => !subject.data().SUB_ISDELETED && subject.data().USER_ID !== null).map(doc => {
        const subject = doc.data();
        return Object.assign(Object.assign({ SUB_ID: doc.id }, subject), { SCHED_ID: schedules.find(schedule => subject.SCHED_ID === schedule.SCHED_ID) });
    });
    //Get subjects based on the current time
    const currentSubject = subjects.filter((subject) => {
        const schedule = subject.SCHED_ID;
        const currentTimeFormat = (0, dayjs_1.default)(currentTime).format("HH:mm:ss");
        const startTimeFormat = (0, dayjs_1.default)(schedule.SCHED_STARTTIME).format("HH:mm:ss");
        const endTimeFormat = (0, dayjs_1.default)(schedule.SCHED_ENDTIME).format("HH:mm:ss");
        const currentTimeVal = (0, dayjs_1.default)(`2001-01-01 ${currentTimeFormat}`);
        const startTime = (0, dayjs_1.default)(`2001-01-01 ${startTimeFormat}`);
        const endTime = (0, dayjs_1.default)(`2001-01-01 ${endTimeFormat}`);
        return schedule.SCHED_WEEKASSIGNED.find((week) => week.toLowerCase() === (0, dayjs_1.default)(currentTime).format("dddd").toLowerCase()) && (currentTimeVal.isAfter(startTime) && currentTimeVal.isBefore(endTime)); //&& subject.ROOM_ID !== null
    });
    const result = groupBy(currentSubject, subject => subject.SUB_CREATEDBY);
    const keys = Object.keys(result);
    //FCM Token under a creator
    keys.map((key) => {
        const fcmToken = userQuery.docs //Get filter user by the time (morning 7:30 AM to 12:00 PM, afternoon 12:00 PM to 6:30 PM)
            // .filter(doc => {
            //     const user = doc.data()
            //     return user.USER_ATTENDANCECHECKERSCHEDULE && (
            //         // attendanceChecker === morning ? context.timestamp >== 7:30 AM && context.timestamp <== 12:00 PM :
            //         // attendanceChecker === afternoon ? context.timestamp >== 12:00 PM && context.timestamp <== 6:30 PM :
            //         // context.timestamp >== 7:30 AM && context.timestamp <== 6:30 PM
            //     )
            // })
            .filter(doc => doc.data().USER_CREATEDBY == key && doc.data().USER_FCMTOKEN)
            .map(doc => doc.data().USER_FCMTOKEN);
        const departmentSubject = currentSubject.filter(subject => subject.SUB_CREATEDBY === key);
        if (fcmToken.length !== 0 && departmentSubject.length !== 0) {
            config_1.admin.messaging().sendEachForMulticast({
                notification: {
                    title: `${departmentSubject.length} subjects are starting their classes`,
                    body: `Log in to EncorEd to submit attendance.`,
                },
                tokens: fcmToken,
                android: {
                    priority: "high",
                },
                apns: {
                    payload: {
                        aps: {
                            contentAvailable: true
                        },
                    }
                }
            });
        }
    });
    return null;
}));
//export const sendEndingSubjects
//# sourceMappingURL=index.js.map