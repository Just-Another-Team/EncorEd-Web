"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
const converter_1 = require("../models/converter");
const eventCollection = database_1.db.collection(`/events/`).withConverter((0, converter_1.converter)());
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