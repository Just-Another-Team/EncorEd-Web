"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
const converter_1 = require("../models/converter");
const eventCollection = database_1.db.collection(`/events/`).withConverter((0, converter_1.converter)());
class EventService {
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const { name, desc, creationDate, createdBy, verifiedBy, status } = req.body;
                // let event = new Event(
                //     name,
                //     desc,
                //     new Date(creationDate),
                //     createdBy,
                //     verifiedBy,
                //     status
                // )
                // await db.collection(`/events/`).doc().withConverter(eventConverter).create(event)
                //     .then((result) => {
                //         res.status(200).json({message: "Event added successfully"})
                //     })
                //     .catch((err) => {
                //         throw {message: err.message}
                //     })
            }
            catch (error) {
                if (error instanceof Error) {
                    const eventControllerError = {
                        name: "Event",
                        error: true,
                        errorType: "Controller Error",
                        control: "Add",
                        message: error.message
                    };
                    res.status(400).json(eventControllerError); //type: error.type, code: error.code
                }
            }
        });
    }
    update(req, res) {
        throw new Error('Method not implemented.');
    }
    delete(req, res) {
        throw new Error('Method not implemented.');
    }
    view(req, res) {
        throw new Error('Method not implemented.');
    }
    viewAll(req, res) {
        throw new Error('Method not implemented.');
    }
}
// const addEvent = async (req, res) => {
//     try {
//         const { name, desc, creationDate, createdBy, verifiedBy, status } = req.body;
//         let event = new Event(
//             name,
//             desc,
//             new Date(creationDate),
//             createdBy,
//             verifiedBy,
//             status
//         )
//         await db.collection(`/events/`).doc().withConverter(eventConverter).create(event)
//             .then((result) => {
//                 res.status(200).json({message: "Event added successfully"})
//             })
//             .catch((err) => {
//                 throw {message: err.message}
//             })
//     } catch (e) {
//         res.status(400).json({name: "Event", type: "Add", error: e.message})
//     }
// }
// const updateEvent = async (req, res) => {
//     const id = req.params.id;
//     try{
//         const { name, desc, creationDate, createdBy, verifiedBy, status } = req.body;
//         const eventSnapshot = db.doc(`/events/${id}`).withConverter(eventConverter);
//         const eventVal = new Event(
//             name,
//             desc,
//             new Date(creationDate),
//             createdBy,
//             verifiedBy,
//             status 
//         );
//         await eventSnapshot.update(Object.assign({}, eventVal))
//             .then((result) => {
//                 res.status(200).json({message: "Event updated successfully"})
//             })
//             .catch((err) => {
//                 throw {message: err.message}
//             })
//     }
//     catch(e) {
//         res.status(400).json({name: "Event", type: "Update", error: e.message})
//     }
// }
// const deleteEvent = async (req, res) => {
//     const id = req.params.id;
//     try{
//         const eventDoc = db.doc(`/events/${id}`).withConverter(eventConverter);
//         await eventDoc.delete()
//             .then((result) => {
//                 res.status(200).json({message: "Event delete successfully"})
//             })
//             .catch((err) => {
//                 throw {message: err.message}
//             })
//     }
//     catch(e) {
//         res.status(400).json({name: "Event", type: "Delete", error: e.message})
//     }
// }
// const viewAllEvents = async (req, res) => {
//     try {
//         const getEventDocs = await eventCollection.get()
//         if (getEventDocs.empty)
//             throw {message: "Event collections is empty"};
//         const events = getEventDocs.docs.map(data => {
//             const eventArr = []
//             const {
//                 name,
//                 desc,
//                 creationDate,
//                 createdBy,
//                 verifiedBy,
//                 status
//             } = data.data();
//             eventArr.push({
//                 id: data.id,
//                 name: name,
//                 desc: desc,
//                 creationDate: new Timestamp(creationDate.seconds, creationDate.nanoseconds).toDate(),
//                 createdBy: createdBy,
//                 verifiedBy: verifiedBy,
//                 status: status
//             })
//             return eventArr
//         })
//         res.status(200).json(events)
//     }
//     catch(e) {
//         res.status(400).json({error: e.message})
//         console.log(e)
//     }
// }
// const viewEvent = async (req, res) => {
//     const id = req.params.id
//     try {
//         const eventRef = db.doc(`/events/${id}`).withConverter(eventConverter)
//         const eventDoc = await eventRef.get()
//         res.status(200).json(eventDoc.data())
//     }
//     catch (e) {
//         res.status(400).json({error: "Error", message: e.message})
//         console.log(e);
//     }
// }
// module.exports = {
//     addEvent,
//     updateEvent,
//     deleteEvent,
//     viewAllEvents,
//     viewEvent
// }
//# sourceMappingURL=event.controller.js.map