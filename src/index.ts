// const express = require('express')
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import { https } from 'firebase-functions'

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

exports.encored_api = https.onRequest(app)