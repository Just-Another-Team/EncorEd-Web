import {
    db,
    Timestamp,
    Filter,
} from '../database'
import { converter } from '../models/converter'
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import IAttendance, { AttendanceSubmissionDate } from '../models/attendance.model';
import { viewSubject } from './subject.controller';
import { viewRoom } from './room.controller';
import { viewUser } from './user.controller';
import ISubject from '../models/subject.model';
import dayjs from 'dayjs';

const attendanceCollection = db.collection(`/Attendances/`).withConverter(converter<IAttendance>())

class attendance {
    public async viewAttendances(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        await attendanceCollection.get()
            .then((attendanceDoc) => {
                const attendances = attendanceDoc.docs.map((doc) => {
                    return viewAttendance.viewWithData(doc.id, doc.data() as IAttendance)
                })

                return Promise.all(attendances)
                    .then((result => result))
                    .catch((error) => Promise.reject(error))
            })
            .then((result) => {
                res.status(200).json(result)
            })
            .catch((error) => {
                res.status(400).json(error)
            })
    }

    public async addAttendance(req: Request<ParamsDictionary, any, IAttendance, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        await attendanceCollection.doc().set({
            ...req.body,
            ATTD_STATUS: "Active",
            USER_ID: req.body.USER_ID,
            ROOM_ID: req.body.ROOM_ID,
            SUB_ID: req.body.SUB_ID
        })
            .then(() => {
                res.status(200).json("Attendance added successfully!")
            })
            .catch((error) => {
                console.error(error)
                res.status(400).json(error)
            })
    }

    public async viewReduceAttendances(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        await attendanceCollection.get()
            .then(async (attendanceSnapshot) => {
                const attendances = attendanceSnapshot.docs.map((attendance) => {
                    return viewAttendance.viewWithData(attendance.id, attendance.data() as IAttendance)
                })
                const promisedAttendances = await Promise.all(attendances)

                // const sortedData = promisedAttendances.sort((prevDate, currDate) => dayjs(prevDate.ATTD_SUBMISSIONDATE as string).isAfter(dayjs(currDate.ATTD_SUBMISSIONDATE as string)) ? 1 : -1)

                // sortedData.map((data) => {
                //     console.log(data.ATTD_ID, data.ATTD_SUBMISSIONDATE)
                // })

                const reduceAttendances = promisedAttendances.reduce((prev, curr, ind, _) => {
                    const previousAttendanceArray = prev as Array<IAttendance>
                    const currentAttendance = curr as IAttendance

                    //If one of the PREVIOUS ATTENDANCES and current attendance are the same subject and in the same day submitted
                    const previousAttendance = previousAttendanceArray.find(prevAttd => {
                        const previousAttendanceSubmissionDay = dayjs(prevAttd.ATTD_SUBMISSIONDATE as string)
                        const currentAttendanceSubmissionDay = dayjs(currentAttendance.ATTD_SUBMISSIONDATE as string)

                        const previousAttendanceSubject = prevAttd.SUB_ID as ISubject
                        const currentAttendanceSubject = currentAttendance.SUB_ID as ISubject

                        return currentAttendanceSubject.SUB_ID === previousAttendanceSubject.SUB_ID && currentAttendanceSubmissionDay.isSame(previousAttendanceSubmissionDay, 'day')
                    })

                    // If there is no current attendance, then
                    if (previousAttendance === undefined) {
                        prev.push(curr)
                        return prev
                    }

                    const mergedAttendance: IAttendance = {
                        ...previousAttendance,
                        ...currentAttendance,
                        ATTD_TEACHERSTATUS: AttendanceStatus(previousAttendance.ATTD_TEACHERSTATUS, currentAttendance.ATTD_TEACHERSTATUS),
                        ATTD_SUBMISSIONDATE: {
                            firstSubmission: previousAttendance.ATTD_SUBMISSIONDATE,
                            lastSubmission: currentAttendance.ATTD_SUBMISSIONDATE,
                        } as AttendanceSubmissionDate
                    }

                    // The mergedAttendance is duplicated from the previousAttendance
                    // Replace or erase the previousAttendance with the mergedAttendance

                    const newArray = previousAttendanceArray.filter(prevAttd => prevAttd.ATTD_ID !== previousAttendance.ATTD_ID)
                    newArray.push(mergedAttendance)

                    return newArray
                }, [] as Array<IAttendance>)

                return Promise.all(reduceAttendances)
                    .then((result) => {
                        res.status(200).json(result)
                    })
                    .catch((error) => Promise.reject(error))
            })
            .catch((error) => {
                res.status(400).json(error.message)
            })

    }
}

const AttendanceStatus = (prevStatus: string, currStatus: string) => {
    return prevStatus === "present" && currStatus === "present" ? "Present" :
    prevStatus === "present" && currStatus === "missing" ? "Early Dismissal" :
    prevStatus === "missing" && currStatus === "present" ? "Late" : "Absent"
}

class ViewAttendance {
    public async view (id: string): Promise<IAttendance> {
        const attendance = await attendanceCollection.doc(id).get()

        const subject = await viewSubject.view((attendance.data() as IAttendance).SUB_ID as string)
        const room = await viewRoom.view((attendance.data() as IAttendance).ROOM_ID as string)
        const user = await viewUser.view((attendance.data() as IAttendance).USER_ID as string)

        return ({
            ATTD_ID: attendance.id,
            ...attendance.data() as IAttendance,
            SUB_ID: subject,
            ROOM_ID: room,
            USER_ID: user
        })
    }

    public async viewWithData (id: string, attendance: IAttendance): Promise<IAttendance> {
        const subject = await viewSubject.view(attendance.SUB_ID as string)
        const room = await viewRoom.view(attendance.ROOM_ID as string)
        const user = await viewUser.view(attendance.USER_ID as string)

        return ({
            ATTD_ID: id,
            ...attendance as IAttendance,
            SUB_ID: subject,
            ROOM_ID: room,
            USER_ID: user
        })
    }
}

export const viewAttendance = new ViewAttendance
export default new attendance;