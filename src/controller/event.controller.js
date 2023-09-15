const {
    db,
    Timestamp,
    addDoc,
    getDoc,
    getDocs,
    doc,
    collection,
    updateDoc,
    deleteDoc,
    where
} = require('../database');
const {
    Event,
    eventConverter
} = require("../models/event.model")

const eventCollection = collection(db, "events").withConverter(eventConverter)

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

        console.log(event);

        const eventDoc = await addDoc(eventCollection, event)

        res.status(200).json({id: eventDoc.id, message: "Event added successfully"})
    } catch (e) {
        res.status(400).json({error: e.message})
    }
}

const updateEvent = async (req, res) => {
    const id = req.params.id;

    console.log(id);

    try{
        const { name, desc, creationDate, createdBy, verifiedBy, status } = req.body;

        const eventSnapshot = await doc(db, `events/${id}`).withConverter(eventConverter);

        const eventVal = new Event(
            name,
            desc,
            creationDate,
            createdBy,
            verifiedBy,
            status 
        );

        updateDoc(eventSnapshot, Object.assign({}, eventVal))

        res.status(200).json({message: "Event updated successfully"})
    }
    catch(e) {
        res.status(400).json({error: e.message})
    }
}

const deleteEvent = async (req, res) => {
    const id = req.params.id;

    try{
        const eventDoc = doc(db, "events", id).withConverter(eventConverter); //Can be three parameters. See docs
        await deleteDoc(eventDoc);

        res.status(200).json({message: "Event delete successfully"})
    }
    catch(e) {
        res.status(400).json({error: e.message})
    }
}

const viewAllEvents = async (req, res) => {
    const events = []

    try {
        const getEventDocs = await getDocs(eventCollection)

        if (getEventDocs.empty)
            throw new Error("Event collections is empty");

        getEventDocs.forEach((event) => {
            const {
                name,
                desc,
                creationDate,
                createdBy,
                verifiedBy,
                status
            } = event.data();

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
        const eventRef = doc(db, "events", id).withConverter(eventConverter)
        const eventDoc = await getDoc(eventRef)

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