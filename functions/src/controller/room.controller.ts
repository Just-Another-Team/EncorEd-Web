

import { Request, Response } from 'express';
import { converter } from '../models/converter';
import { db } from '../database';
import { adminAuth } from '../authentication';
import IBaseService from '../interfaces/IBaseService';
import IRoom from '../models/room.model';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { DocumentData, DocumentReference } from 'firebase-admin/firestore';
import IFloor from '../models/floor.model';
import { viewFloorHelper } from './floor.controller';
import { subjectCollection, viewSubjectHelper } from './subject.controller';
import ISubject from '../models/subject.model';

export const roomCollection = db.collection("/Room/").withConverter(converter<IRoom>())

class RoomService implements IBaseService {
    public async add(req: Request<ParamsDictionary, any, IRoom, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        await roomCollection.doc().set({
            ...req.body,
            FLR_ID: db.doc(`/Floor/${req.body.FLR_ID}`)
        })
            .then(() => {
                res.status(200).json("Room added successfully!")
            })
            .catch((error) => {
                res.status(400).json(error)
            })
    }
    public async  update(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        throw new Error('Method not implemented.');
    }
    public async  delete(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        throw new Error('Method not implemented.');
    }
    public async view(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        throw new Error('Method not implemented.');
    }
    public async viewAll(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        await roomCollection.get()
            .then((roomDoc) => {
                const roomMap = roomDoc.docs.map((doc) => {
                    return viewRoomHelper(doc.id, doc.data() as IRoom)
                })

                return Promise.all(roomMap)
                    .then((rooms) => {
                        res.status(200).json(rooms)
                    })
                    .catch((error) => {
                        return Promise.reject(error)
                    })
            })
            .catch((error) => {
                console.error(error)
                res.status(400).json(error.message)
            })
    }
    public async viewWithSubjects(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        await roomCollection.get()
            .then((roomDoc) => {
                const roomMap = roomDoc.docs.map((doc) => {
                    return viewRoomWithSubjectHelper(doc.id, doc.data() as IRoom)
                })

                return Promise.all(roomMap)
                    .then((rooms) => {
                        res.status(200).json(rooms)
                    })
                    .catch((error) => {
                        return Promise.reject(error)
                    })
            })
            .catch((error) => {
                console.error(error)
                res.status(400).json(error.message)
            })
    }
}

export const viewRoomWithSubjectHelper = (id: string, data: IRoom) => {
    return (data.FLR_ID as DocumentReference).get()
        .then((floor) => {
            return viewFloorHelper(floor.id, floor.data() as IFloor)
        })
        .then((floor): IRoom => ({
            ROOM_ID: id,
            ROOM_NAME: data.ROOM_NAME,
            FLR_ID: floor
        }))
        .then((room) => {
            return subjectCollection.where('ROOM_ID', '==', roomCollection.doc(room.ROOM_ID != undefined ? room.ROOM_ID : "")).get()
                .then((subject) => {
                    const subjects = subject.docs.map((doc) => {
                        return viewSubjectHelper(doc.id, doc.data() as ISubject)
                    })
        
                    return Promise.all(subjects)
                        .then((result => result))
                        .catch((error) => Promise.reject(error))
                })
                .then((subjects): IRoom => ({
                    ROOM_ID: room.ROOM_ID,
                    ROOM_NAME: room.ROOM_NAME,
                    FLR_ID: room.FLR_ID,
                    SUBJECTS: subjects
                }))
                .catch((error) => Promise.reject(error))
        })
        .then((result): IRoom => result)
        .catch((error) => Promise.reject(error))
}

export const viewRoomHelper = (id: string, data: IRoom) => {
    return (data.FLR_ID as DocumentReference).get()
        .then((floor) => {
            return viewFloorHelper(floor.id, floor.data() as IFloor)
        })
        .then((floor): IRoom => ({
            ROOM_ID: id,
            ROOM_NAME: data.ROOM_NAME,
            FLR_ID: floor
        }))
        .catch((error) => Promise.reject(error))
}

export default new RoomService