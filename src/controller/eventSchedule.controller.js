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
    EventSchedule,
    eventScheduleConverter
} = require("../models/eventSchedule.model")

const eventScheduleCollection = collection(db, "eventSchedules").withConverter(eventScheduleConverter)

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

        console.log(eventSchedule);

        const eventScheduleDoc = await addDoc(eventScheduleCollection, eventSchedule)

        res.status(200).json({id: eventScheduleDoc.id, message: "Event Schedule added successfully"})
    } catch (e) {
        res.status(400).json({error: e.message})
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

        const eventScheduleSnapshot = doc(db, `eventSchedules/${id}`).withConverter(eventScheduleConverter);

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

        await updateDoc(eventScheduleSnapshot, Object.assign({}, eventSchedule))

        res.status(200).json({message: "Event Schedule updated successfully"})
    }
    catch(e) {
        res.status(400).json({error: e.message})
    }
}

const deleteEventSchedule = async (req, res) => {
    const id = req.params.id;

    try{
        const eventScheduleDoc = doc(db, "eventSchedules", id).withConverter(eventScheduleConverter); //Can be three parameters. See docs
        await deleteDoc(eventScheduleDoc);

        res.status(200).json({message: "Event schedule delete successfully"})
    }
    catch(e) {
        res.status(400).json({error: e.message})
    }
}

const viewAllEventSchedules = async (req, res) => {
    const eventSchedules = []

    try {
        const getEventScheduleDocs = await getDocs(eventScheduleCollection)

        if (getEventScheduleDocs.empty)
            throw new Error("Event schedules collections is empty");

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
        const eventScheduleRef = doc(db, "eventSchedules", id).withConverter(eventScheduleConverter)
        const eventScheduleDoc = await getDoc(eventScheduleRef)

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