import dayjs from 'dayjs';
import {
    db,
} from '../database';
import IBaseService from '../interfaces/IBaseService';
import ISubject from "../models/subject.model";
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { converter } from '../models/converter';
import ISchedule from '../models/schedule.model';
import IRoom from '../models/room.model';
import { viewUser } from './user.controller';
import { viewRoom } from './room.controller';
import { admin } from '../../config';

// import { viewUser, userCollection } from './user.controller';

export const subjectCollection = db.collection(`/Subject/`).withConverter(converter<ISubject>())
export const scheduleCollection = db.collection(`/Schedule/`).withConverter(converter<ISchedule>())

class SubjectService implements IBaseService {
    public async add(req: Request<ParamsDictionary, any, ISubject, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {

        if (req.body.SCHED_ID !== null) 
            req.body.SCHED_ID = await scheduleCollection.add(req.body.SCHED_ID as ISchedule).then((result) => result.id)
                                        .catch((error) => {
                                            console.error(error)
                                            return Promise.reject(error)
                                        })

        const subject: ISubject = {
            SUB_CODE: req.body.SUB_CODE,
            SUB_DESCRIPTION: req.body.SUB_DESCRIPTION,
            ROOM_ID: null,
            SCHED_ID: req.body.SCHED_ID,
            USER_ID: req.body.USER_ID,
            SUB_ISDELETED: false,
            SUB_CREATEDBY: req.body.SUB_CREATEDBY,
            SUB_UPDATEDBY: req.body.SUB_UPDATEDBY
        }

        await subjectCollection.add(subject)
            .then(() => {
                res.status(200).json(subject)
            })
            .catch((error) => {
                console.error(error)
                res.status(400).json(error)
            })
    }
    public async addMultiple(req: Request<ParamsDictionary, any, Array<ISubject>, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        const subjectBatch = db.batch();

        //Promise.all
        
        // await addSubjectHelper(req.body)
        //     .then(() => {
        //         res.status(200).json("Subject added successfully!")
        //     })
        //     .catch((error) => {
        //         console.error(error)
        //         res.status(400).json(error)
        //     })
    }
    public async update(req: Request<ParamsDictionary, any, ISubject, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        const { id } = req.params

        const reqSubject: ISubject = {
            SUB_CODE: req.body.SUB_CODE,
            SUB_DESCRIPTION: req.body.SUB_DESCRIPTION,
            SUB_UPDATEDBY: req.body.SUB_UPDATEDBY
        }

        //Assigning to a different user, that is okay, it's just replacing the UserID
        //Assigning to a different room, that is okay, it's just replacing the RoomID
        //Assigning to a different schedule, that is a different ball game

        await subjectCollection.doc(id).update(reqSubject)
            .then(() => {
                res.status(200).json("Subject is updated successfully!")
            })
            .catch((error) => {
                res.status(400).json(error)
            })

        //View all of the schedules first <- CHECK
        //Find the schedule that has the same startTime, endTime, and weekAssigned <- CHECK
        //Get the schedule ID <- CHECK
        //Get the subjects based on the schedule ID <- CHECK

        //THIS IS A LONG ARSE PROCESS JUST TO ASSIGN A SUBJECT TO A SCHEDULE THAT EXISTS

        // const schedules = scheduleCollection.get()
        //     .then((scheduleDoc) => {
        //         const schedule = scheduleDoc.docs.map((doc):ISchedule => ({
        //             SCHED_ID: doc.id,
        //             ...doc.data() as ISchedule
        //         }))

        //         return Promise.all(schedule)
        //             .then((result => result))
        //             .catch((error) => Promise.reject(error))
        //     })
        //     .catch((error) => Promise.reject(error))

        // const scheduleIDs = await schedules
        //     .then((result) => {
        //         const filteredResult = result.filter((schedule) => {

        //             const reqStartTimeFormat = dayjs(req.body.SCHED_STARTTIME).format("HH:mm:ss")
        //             const reqEndTimeFormat = dayjs(req.body.SCHED_ENDTIME).format("HH:mm:ss")

        //             const startTimeFormat = dayjs(schedule.SCHED_STARTTIME).format("HH:mm:ss")
        //             const endTimeFormat = dayjs(schedule.SCHED_ENDTIME).format("HH:mm:ss")

        //             const reqStartTime = dayjs(`2001-01-01 ${reqStartTimeFormat}`)
        //             const reqEndTime = dayjs(`2001-01-01 ${reqEndTimeFormat}`)

        //             const startTime = dayjs(`2001-01-01 ${startTimeFormat}`)
        //             const endTime = dayjs(`2001-01-01 ${endTimeFormat}`)

        //             return schedule.SCHED_WEEKASSIGNED.some((day) => req.body.SCHED_WEEKASSIGNED.includes(day)) && (reqStartTime.isSame(startTime) && reqEndTime.isSame(endTime))
        //         })

        //         return filteredResult.map((schedule) => schedule.SCHED_ID)
        //     })
        //     // .catch((error) => {
        //     //     res.status(400).json(error)
        //     // })

        // await viewAllSubjectHelper()
        //     .then((data) => {
        //         const subjects = data.filter((subject) => scheduleIDs.includes((subject.SCHED_ID as ISchedule).SCHED_ID))
        //         res.status(200).json(subjects)
        //     })
        //     .catch((error) => {
        //         res.status(400).json(error)
        //     })
    }
    public async assignRoom(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        const { subId } = req.params

        const roomId = (req.body as IRoom).ROOM_ID as string

        await subjectCollection.doc(subId).update({
            ROOM_ID: roomId,
        })
            .then(() => {
                res.status(200).json("Subject name is assigned to Room name")
            })
            .catch((error) => {
                res.status(400).json(error)
            })
    }
    public async delete(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        const { id } = req.params

        await subjectCollection.doc(id).update({
            SUB_ISDELETED: true,
        })
            .then(() => {
                res.status(200).json("Subject name is deleted successfully!")
            })
            .catch((error) => {
                res.status(400).json(error)
            })
    }
    public async view(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        const { id } = req.params

        await viewSubject.view(id)
            .then((result) => {
                res.status(200).json(result)
            })
            .catch((error) => {
                console.error(error)
                res.status(400).json(error.message)
            })
    }
    public async viewBySchedule(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        let currentTime = req.query.currentTime as string

        await viewSubject.viewAll()
            .then((result) => {
                const currentSubject = (result as Array<ISubject>).filter((subject) => {
                    const schedule = subject.SCHED_ID as ISchedule
        
                    const currentTimeFormat = dayjs(currentTime).format("HH:mm:ss")
                    const startTimeFormat = dayjs(schedule.SCHED_STARTTIME).format("HH:mm:ss")
                    const endTimeFormat = dayjs(schedule.SCHED_ENDTIME).format("HH:mm:ss")
        
                    const currentTimeVal = dayjs(`2001-01-01 ${currentTimeFormat}`)
                    const startTime = dayjs(`2001-01-01 ${startTimeFormat}`)
                    const endTime = dayjs(`2001-01-01 ${endTimeFormat}`)
        
                    return schedule.SCHED_WEEKASSIGNED.find((week) => week.toLowerCase() === dayjs(currentTime).format("dddd").toLowerCase()) && (currentTimeVal.isAfter(startTime) && currentTimeVal.isBefore(endTime))
                })
        
                res.status(200).json(currentSubject)
            })
            .catch((error) => {
                console.error(error)
                res.status(400).json(error)
            })
    }
    public async viewAll(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        
        console.log(admin.firestore.Timestamp.now())
        
        await viewSubject.viewAll()
            .then((result) => {
                res.status(200).json(result)
            })
            .catch((error) => {
                console.error(error)
                res.status(400).json(error.message)
            })
    }
}

const viewScheduleHelper = async (id: string): Promise<ISchedule> => {
    const scheduleData = await scheduleCollection.doc(id).get()

    return ({
        SCHED_ID: scheduleData.id,
        ...scheduleData.data() as ISchedule
    })
}

class ViewSubject {
    public async view (id: string): Promise<ISubject> {
        const subject = await subjectCollection.doc(id).get()

        const user = await viewUser.view((subject.data() as ISubject).USER_ID as string)
        const schedule = await viewScheduleHelper((subject.data() as ISubject).SCHED_ID as string)
        const room = await viewRoom.view((subject.data() as ISubject).ROOM_ID as string)

        return ({
            ...subject.data() as ISubject,
            SUB_ID: subject.id,
            ROOM_ID: room,
            SCHED_ID: schedule,
            USER_ID: user,
        })
    }

    public async viewWithData (id: string, subject: ISubject): Promise<ISubject> {
        const user = await viewUser.view(subject.USER_ID as string)
        const schedule = await viewScheduleHelper(subject.SCHED_ID as string)
        const room = subject.ROOM_ID !== null ? await viewRoom.view(subject.ROOM_ID as string) : null
    
        return ({
            ...subject,
            SUB_ID: id,
            ROOM_ID: room,
            SCHED_ID: schedule,
            USER_ID: user,
        })
    }

    public async viewAll () {
        const subjectSnapshot = await subjectCollection.get();

        const subjects = subjectSnapshot.docs.map((doc) => {
            return this.viewWithData(doc.id, doc.data() as ISubject)
        })

        return Promise.all(subjects)
            .then((result => result.filter(subject => !subject.SUB_ISDELETED)))
            .catch((error) => Promise.reject(error))
    }
}

export const viewSubject = new ViewSubject
export default new SubjectService;