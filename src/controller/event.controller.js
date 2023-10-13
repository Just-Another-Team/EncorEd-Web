const {
    db,
    Timestamp,
    serverTimestamp
} = require('../database');
const {
    Event,
    eventConverter
} = require("../models/event.model")

const eventCollection = db.collection(`/events/`).withConverter(eventConverter)

const addEvent = async (req, res) => {
    try {
        const { name, desc, creationDate, createdBy, verifiedBy, status } = req.body;

        let event = new Event(
            name,
            desc,
            new Date(creationDate),
            createdBy,
            verifiedBy,
            status
        )

        // console.log(event);

        await db.collection(`/events/`).doc().withConverter(eventConverter).create(event)
            .then((result) => {
                res.status(200).json({message: "Event added successfully"})
            })
            .catch((err) => {
                throw {message: err.message}
            })
        
    } catch (e) {
        res.status(400).json({name: "Event", type: "Add", error: e.message})
    }
}

const updateEvent = async (req, res) => {
    const id = req.params.id;

    try{
        const { name, desc, creationDate, createdBy, verifiedBy, status } = req.body;

        const eventSnapshot = db.doc(`/events/${id}`).withConverter(eventConverter);

        const eventVal = new Event(
            name,
            desc,
            new Date(creationDate),
            createdBy,
            verifiedBy,
            status 
        );

        await eventSnapshot.update(Object.assign({}, eventVal))
            .then((result) => {
                res.status(200).json({message: "Event updated successfully"})
            })
            .catch((err) => {
                throw {message: err.message}
            })
    }
    catch(e) {
        res.status(400).json({name: "Event", type: "Update", error: e.message})
    }
}

const deleteEvent = async (req, res) => {
    const id = req.params.id;

    try{
        const eventDoc = db.doc(`/events/${id}`).withConverter(eventConverter);

        await eventDoc.delete()
            .then((result) => {
                res.status(200).json({message: "Event delete successfully"})
            })
            .catch((err) => {
                throw {message: err.message}
            })
    }
    catch(e) {
        res.status(400).json({name: "Event", type: "Delete", error: e.message})
    }
}

const viewAllEvents = async (req, res) => {
    const events = []

    try {
        const getEventDocs = await eventCollection.get()

        if (getEventDocs.empty)
            throw {message: "Event collections is empty"};

        getEventDocs.forEach((event) => {
            const {
                name,
                desc,
                creationDate,
                createdBy,
                verifiedBy,
                status
            } = event.data();

            console.log(event.data())

            events.push({
                id: event.id,
                name: name,
                desc: desc,
                creationDate: new Timestamp(creationDate.seconds, creationDate.nanoseconds).toDate(),
                createdBy: createdBy,
                verifiedBy: verifiedBy,
                status: status
            })
        })

        res.status(200).json(events)
    }
    catch(e) {
        res.status(400).json({error: e.message})
        console.log(e)
    }
}

const viewEvent = async (req, res) => {
    const id = req.params.id

    try {
        const eventRef = db.doc(`/events/${id}`).withConverter(eventConverter)
        const eventDoc = await eventRef.get()

        res.status(200).json(eventDoc.data())
    }
    catch (e) {
        res.status(400).json({error: "Error", message: e.message})
        console.log(e);
    }
}

module.exports = {
    addEvent,
    updateEvent,
    deleteEvent,
    viewAllEvents,
    viewEvent
}