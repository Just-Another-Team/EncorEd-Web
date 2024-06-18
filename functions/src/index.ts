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
app.use(bodyParser.json({ limit: '20mb' }))
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }))
app.use(bodyParser.json())

import userRouter from './routes/user'
import roleRouter from "./routes/role"
import subjectRouter from "./routes/subject"
import attendanceRouter from "./routes/attendance"
import floorRouter from './routes/floor';
import roomRouter from './routes/room';
import departmentRouter from './routes/department';
import navigationRouter from './routes/navigation';
import IUser from './models/user.model';
import { admin } from '../config';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

app.use("/user", userRouter)
app.use("/role", roleRouter)
app.use("/subject", subjectRouter)
app.use("/attendance", attendanceRouter)
app.use("/floor", floorRouter)
app.use("/room", roomRouter)
app.use("/department", departmentRouter)
app.use("/navigation", navigationRouter)

//Start the notifications
export const encored_api = https.onRequest(app)

//Set an export, starting with OnCreate Attendance with notifications
const notificationCollection = db.collection(`/Notifications/`).withConverter(converter<INotification>())
const subjectCollection = db.collection(`/Subject/`).withConverter(converter<ISubject>())
const scheduleCollection = db.collection(`/Schedule/`).withConverter(converter<ISchedule>())
const userCollection = db.collection(`/User/`).withConverter(converter<IUser>())

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

// For notifications
const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
    arr.reduce((groups, item) => {
      (groups[key(item)] ||= []).push(item);
      return groups;
}, {} as Record<K, T[]>);

app.listen(port, async () => {
    console.log(`Server running on port ${port}`)
});

//send attendance checker notification. Subject
//Send notification ON 0 and 30 ONLY
export const sendSubjectNotification = pubsub.schedule('0,30 * * * *').timeZone("Asia/Singapore").onRun(async (context) => {

    const subjectQuery = await subjectCollection.get()
    const scheduleQuery = await scheduleCollection.get()
    const userQuery = await userCollection.get()
    
    const currentTime = dayjs()

    const schedules = scheduleQuery.docs.map(doc => ({
        ...doc.data(),
        SCHED_ID: doc.id,
    } as ISchedule))

    const subjects = subjectQuery.docs.filter(subject => !subject.data().SUB_ISDELETED && subject.data().USER_ID !== null).map(doc => {
        const subject = doc.data()

        return ({
            SUB_ID: doc.id,
            ...subject,
            SCHED_ID: schedules.find(schedule => subject.SCHED_ID === schedule.SCHED_ID)
        } as ISubject)
    })

    //Get subjects based on the current time
    const currentSubject = subjects.filter((subject) => {
        const schedule = subject.SCHED_ID as ISchedule

        const currentTimeFormat = dayjs(currentTime).format("HH:mm:ss")
        const startTimeFormat = dayjs(schedule.SCHED_STARTTIME).format("HH:mm:ss")
        const endTimeFormat = dayjs(schedule.SCHED_ENDTIME).format("HH:mm:ss")

        const currentTimeVal = dayjs(`2001-01-01 ${currentTimeFormat}`)
        const startTime = dayjs(`2001-01-01 ${startTimeFormat}`)
        const endTime = dayjs(`2001-01-01 ${endTimeFormat}`)

        return schedule.SCHED_WEEKASSIGNED.find((week) => week.toLowerCase() === dayjs(currentTime).format("dddd").toLowerCase()) && (currentTimeVal.isAfter(startTime) && currentTimeVal.isBefore(endTime)) //&& subject.ROOM_ID !== null
    })

    const result = groupBy(currentSubject, subject => subject.SUB_CREATEDBY as string)
    const keys = Object.keys(result)

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
                            .filter(doc => (doc.data() as IUser).USER_CREATEDBY == key && (doc.data() as IUser).USER_FCMTOKEN)
                            .map(doc => (doc.data() as IUser).USER_FCMTOKEN as string)

        const departmentSubject = currentSubject.filter(subject => subject.SUB_CREATEDBY === key)

        if (fcmToken.length !== 0 && departmentSubject.length !== 0) {
            admin.messaging().sendEachForMulticast({
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
            })
        }
    })

    return null
})

//export const sendEndingSubjects