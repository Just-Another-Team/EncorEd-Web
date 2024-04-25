import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import { converter } from './models/converter';
import { INotification } from './models/notification.model';
import IAttendance from './models/attendance.model';
import ISubject from './models/subject.model';
import ISchedule from './models/schedule.model';
import { https, pubsub, firestore } from 'firebase-functions'

import {
    db,
} from './database';

dotenv.config()
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

const app = express();
const port: string = process.env.RUNNING_PORT!;

app.use(cors())
// app.use(express.json())
// app.use(express.urlencoded())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

import userRouter from './routes/user'
import roleRouter from "./routes/role"
import subjectRouter from "./routes/subject"
import attendanceRouter from "./routes/attendance"
import floorRouter from './routes/floor';
import roomRouter from './routes/room';
import departmentRouter from './routes/department';
import { admin } from '../config';

app.use("/user", userRouter)
app.use("/role", roleRouter)
app.use("/subject", subjectRouter)
app.use("/attendance", attendanceRouter)
app.use("/floor", floorRouter)
app.use("/room", roomRouter)
app.use("/department", departmentRouter)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

//Start the notifications
export const encored_api = https.onRequest(app)

//Set an export, starting with OnCreate Attendance with notifications
const notificationCollection = db.collection(`/Notifications/`).withConverter(converter<INotification>())
export const addNotification = firestore.document('Attendances/{attendanceId}').onCreate(async (postSnapshot, context) => {


    //When getting an attendance, include the following
    //Attendance Checker Data
    //Subject Data
    //Schedule Data

    const attendance: IAttendance = {
        ATTD_ID: postSnapshot.id,
        ...postSnapshot.data() as IAttendance
    }

    //Notification Descriptions
    //Attendance Checker <User Full name> confirms that Instructor <User Fullname> is Present/Missing in <Room Name> at <Submission Time>

    //Kiosk <Kiosk name> searched for <Room Name> at <Time searched>
    //Kiosk <Kiosk name> gave directions for <Room Name> at <Time searched>

    await notificationCollection.add({
        NOTF_TYPE: `Attendance`,
        NOTF_DATA: attendance,
        NOTF_ISREAD: false,
        NOTF_DATE: attendance.ATTD_SUBMISSIONDATE as string,
    })
    //Set a notification collection
    //Add a notification based on the attendances made

    return null
})

//send attendance checker notification. Subject
export const sendSubjectNotification = pubsub.schedule('* * * * *').onRun(async (context) => {

    const subjectQuery = await db.collection(`/Subject/`).withConverter(converter<ISubject>()).get()
    const scheduleQuery = await db.collection(`/Schedule/`).withConverter(converter<ISchedule>()).get()

    // admin.firestore.Timestamp.now

})