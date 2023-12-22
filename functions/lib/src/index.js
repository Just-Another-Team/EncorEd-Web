"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encored_api = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const firebase_functions_1 = require("firebase-functions");
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
// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const app = (0, express_1.default)();
const port = process.env.RUNNING_PORT;
app.use((0, cors_1.default)());
// app.use(express.json())
// app.use(express.urlencoded())
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
const user_1 = __importDefault(require("./routes/user"));
const institution_1 = __importDefault(require("./routes/institution"));
const role_1 = __importDefault(require("./routes/role"));
const subject_1 = __importDefault(require("./routes/subject"));
// import participantRouter from "./routes/participant"
// import eventRouter from "./routes/event"
// import attendeeRouter from "./routes/attendees"
app.use("/user", user_1.default);
app.use("/institution", institution_1.default);
app.use("/role", role_1.default);
app.use("/subject", subject_1.default);
// app.use("/participant", participantRouter)
// app.use("/event", eventRouter)
// app.use("/attendees", attendeeRouter)
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
// exports.encored_api = https.onRequest(app)
exports.encored_api = firebase_functions_1.https.onRequest(app);
//# sourceMappingURL=index.js.map