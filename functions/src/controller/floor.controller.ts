

import { Request, Response } from 'express';
import { converter } from '../models/converter';
import { db } from '../database';
import IBaseService from '../interfaces/IBaseService';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import IFloor from '../models/floor.model';

export const floorCollection = db.collection("/Floor/").withConverter(converter<IFloor>())

class FloorService implements IBaseService {
    public async add(req: Request<ParamsDictionary, any, IFloor, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        await floorCollection.doc().set(req.body)
            .then(() => {
                res.status(200).json("Floor added successfully!")
            })
            .catch((error) => {
                res.status(400).json(error)
            })
    }
    public async addMultiple(req: Request<ParamsDictionary, any, Array<IFloor>, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        let addFloorBatch = db.batch();

        await req.body.map((floor) => {
            addFloorBatch.set(floorCollection.doc(), floor)
        })

        addFloorBatch.commit()
            .then(() => {
                res.status(200).json("Floors added successfully!")
            })
            .catch((error) => {
                res.status(400).json(error)
            })
    }
    public async update(req: Request<ParamsDictionary, any, IFloor, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        throw new Error('Method not implemented.');
    }
    public async delete(req: Request<ParamsDictionary, any, IFloor, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        throw new Error('Method not implemented.');
    }
    public async view(req: Request<ParamsDictionary, any, IFloor, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        throw new Error('Method not implemented.');
    }
    public async viewAll(req: Request<ParamsDictionary, any, IFloor, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        await floorCollection.get()
            .then((floorDocs) => {
                let floors = floorDocs.docs.map((floor):IFloor => {
                    return ({
                        FLR_ID: floor.id,
                        ...floor.data() as IFloor
                    })
                })

                res.status(200).json(floors)
            })
            .catch((error) => {
                console.error(error)
                res.status(400).json(error.message)
            })
    }
}

export const viewFloorHelper = async (id: string): Promise<IFloor> => {

    const floor = await floorCollection.doc(id).get()

    return ({
        FLR_ID: id,
        ...floor.data() as IFloor
    })
}

export default new FloorService