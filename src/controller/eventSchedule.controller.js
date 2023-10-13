const {
    db,
    Timestamp,
} = require('../database');
const {
    EventSchedule,
    eventScheduleConverter
} = require("../models/eventSchedule.model")

const eventScheduleCollection = db.collection(`/eventSchedules/`).withConverter(eventScheduleConverter)

const addEventSchedule = async (req, res) => {
    try {
        const { eventId, roomId, venue, startDateTime, endDateTime, createdBy, verifiedBy, status, inCampus } = req.body;

        let eventSchedule = new EventSchedule(
            eventId,
            roomId,
            venue,
            new Date(startDateTime),
            new Date(endDateTime),
            createdBy,
            verifiedBy,
            status,
            inCampus
        )

        await eventScheduleCollection.doc().create(Object.assign({}, eventSchedule))
            .then((result) => {
                res.status(200).json({message: "Event Schedule added successfully"})
            })
            .catch((err) => {
                throw {message: err.message}
            })

        
    } catch (e) {
        res.status(400).json({name: "Event Schedule", type: "Add", error: e.message})
        console.log(e)
    }
}

const updateEventSchedule = async (req, res) => {
    const id = req.params.id;

    try{
        const { 
            eventId,
            roomId,
            venue,
            startDateTime,
            endDateTime,
            createdBy,
            verifiedBy,
            status,
            inCampus 
        } = req.body;

        const eventScheduleDocRef = db.doc(`/eventSchedules/${id}`).withConverter(eventScheduleConverter);

        let eventSchedule = new EventSchedule(
            eventId,
            roomId,
            venue,
            new Date(startDateTime),
            new Date(endDateTime),
            createdBy,
            verifiedBy,
            status,
            inCampus
        )

        await eventScheduleDocRef.update(Object.assign({}, eventSchedule))
            .then((result) => {
                res.status(200).json({message: "Event Schedule updated successfully"})
            })
            .catch((err) => {
                throw {message: err.message}
            })
    }
    catch(e) {
        res.status(400).json({name: "Event Schedule", type: "Update", error: e.message})
    }
}

const deleteEventSchedule = async (req, res) => {
    const id = req.params.id;

    try{
        const eventScheduleDocRef = db.doc(`eventSchedules/${id}`).withConverter(eventScheduleConverter); //Can be three parameters. See docs
        await eventScheduleDocRef.delete()
            .then((result) => {
                res.status(200).json({message: "Event schedule delete successfully"})
            })
            .catch((err) => {
                throw {message: err.message}
            })
    }
    catch(e) {
        res.status(400).json({name: "Event Schedule", type: "Delete", error: e.message})
    }
}

const viewAllEventSchedules = async (req, res) => {
    const eventSchedules = []

    try {
        const getEventScheduleDocs = await eventScheduleCollection.get();

        if (getEventScheduleDocs.empty)
            throw {message: "Event schedules collections is empty"}

        getEventScheduleDocs.forEach((eventSchedule) => {
            const {
                eventId,
                roomId,
                venue,
                startDateTime,
                endDateTime,
                createdBy,
                verifiedBy,
                status,
                inCampus
            } = eventSchedule.data();

            eventSchedules.push({
                id: eventSchedule.id,
                eventId: eventId,
                roomId: roomId,
                venue: venue,
                startDateTime: new Timestamp(startDateTime.seconds, startDateTime.nanoseconds).toDate(),
                endDateTime: new Timestamp(endDateTime.seconds, endDateTime.nanoseconds).toDate(),
                createdBy: createdBy,
                verifiedBy: verifiedBy,
                status: status,
                inCampus: inCampus
            })
        })

        res.status(200).json(eventSchedules)
    }
    catch(e) {
        res.status(400).json({error: e.message})
        console.log(e)
    }
}

const viewEventSchedule = async (req, res) => {
    const id = req.params.id

    try {
        const eventScheduleRef = await db.doc(`eventSchedules/${id}`).withConverter(eventScheduleConverter)

        const eventScheduleDoc = await eventScheduleRef.get()

        res.status(200).json(eventScheduleDoc.data())
    }
    catch (e) {
        res.status(400).json({error: "Error", message: e.message})
        console.log(e);
    }
}

module.exports = {
    addEventSchedule,
    updateEventSchedule,
    deleteEventSchedule,
    viewAllEventSchedules,
    viewEventSchedule
}