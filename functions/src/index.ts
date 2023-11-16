// const express = require('express')
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import { https } from 'firebase-functions'
import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

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


const app = express();
const port: number = 4000;

app.use(cors())
// app.use(express.json())
// app.use(express.urlencoded())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

import userRouter from './routes/user'
// import participantRouter from "./routes/participant"
// import subjectRouter from "./routes/subject"
import institutionRouter from "./routes/institution"
// import eventRouter from "./routes/event"
// import attendeeRouter from "./routes/attendees"
import roleRouter from "./routes/role"

app.use("/user", userRouter)
// app.use("/participant", participantRouter)
// app.use("/subject", subjectRouter)
app.use("/institution", institutionRouter)
// app.use("/event", eventRouter)
// app.use("/attendees", attendeeRouter)
app.use("/role", roleRouter)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

// exports.encored_api = https.onRequest(app)
export const encored_api = https.onRequest(app)