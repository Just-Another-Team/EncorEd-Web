import {
    db,
    Timestamp,
    Filter,
} from '../database'
import { converter } from '../models/converter'
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import ErrorController from '../types/ErrorController';
import IAttendance from '../models/attendance.model';
import { error } from 'console';
import { DocumentReference } from 'firebase-admin/firestore';
import IUser from '../models/user.model';
import { viewUserHelper } from './user.controller';
import IRoom from '../models/room.model';
import ISubject from '../models/subject.model';
import { viewSubjectHelper } from './subject.controller';
import { viewRoomHelper } from './room.controller';

const attendanceCollection = db.collection(`/Attendances/`).withConverter(converter<IAttendance>())

class attendance {
    public async viewAttendances(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        await attendanceCollection.get()
            .then((attendanceDoc) => {
                const attendances = attendanceDoc.docs.map((doc) => {
                    return viewAttendanceHelper(doc.id, doc.data() as IAttendance)
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
            USER_ID: db.doc(`User/${req.body.USER_ID}`),
            ROOM_ID: db.doc(`Room/${req.body.ROOM_ID}`),
            SUB_ID: db.doc(`Subject/${req.body.SUB_ID}`)
        })
            .then(() => {
                res.status(200).json("Attendance added successfully!")
            })
            .catch((error) => {
                console.error(error)
                res.status(400).json(error)
            })
    }

    public async viewCurrentAttendances(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        const { id } = req.params


    }
}

const viewAttendanceHelper = (id: string, attendance: IAttendance) => {
    return (attendance.USER_ID as DocumentReference<IUser>).get()
        .then((result) => {
            return viewUserHelper(result.id, result.data() as IUser)
                .then((user) => user)
                .catch((error) => Promise.reject(error))
        })
        .then((user) => {
            return (attendance.ROOM_ID as DocumentReference<IRoom>).get()
                .then((room) => {
                    return viewRoomHelper(room.id, room.data() as IRoom)
                        .then((result) => ({
                            USER_ID: user,
                            ROOM_ID: result
                        }))
                        .catch(error => Promise.reject(error))
                })
                .catch((error) => Promise.reject(error))
        })
        .then((userRoom) => {
            return (attendance.SUB_ID as DocumentReference<ISubject>).get()
                .then((subject) => {
                    return viewSubjectHelper(subject.id, subject.data() as ISubject)
                        .then((result) => ({
                            USER_ID: userRoom.USER_ID,
                            ROOM_ID: userRoom.ROOM_ID,
                            SUB_ID: {
                                SUB_ID: result.SUB_ID,
                                ...result
                            } as ISubject
                        }))
                        .catch((error) => Promise.reject(error))
                })
                .catch((error) => Promise.reject(error))
        })
        .then((userRoomSub):IAttendance => ({
            ATTD_ID: id,
            ...attendance as IAttendance,
            SUB_ID: userRoomSub.SUB_ID,
            ROOM_ID: userRoomSub.ROOM_ID,
            USER_ID: userRoomSub.USER_ID
        }))
        .catch((error) => Promise.reject(error))
}

export default new attendance;