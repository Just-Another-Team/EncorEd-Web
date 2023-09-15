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
    Attendees,
    attendeesConverter
} = require("../models/attendees.model")

const attendeesCollection = collection(db, "attendees").withConverter(attendeesConverter)

const addAttendee = async (req, res) => {
    try {
        const { eventId, userId, isHost } = req.body;

        let attendee = new Attendees(
            eventId,
            userId,
            isHost
        )

        console.log(attendee);

        const attendeeDoc = await addDoc(attendeesCollection, attendee)

        res.status(200).json({id: attendeeDoc.id, message: "Attendee added successfully"})
    } catch (e) {
        res.status(400).json({error: e.message})
    }
}

const updateAttendee = async (req, res) => {
    const id = req.params.id;

    console.log(id);

    try{
        const { eventId, userId, isHost } = req.body;

        const attendeeSnapshot = await doc(db, "attendees", id).withConverter(attendeesConverter);

        const attendeeVal = new Attendees(
            eventId,
            userId,
            isHost
        );

        updateDoc(attendeeSnapshot, Object.assign({}, attendeeVal))

        res.status(200).json({message: "Attendee updated successfully"})
    }
    catch(e) {
        res.status(400).json({error: e.message})
    }
}

const deleteAttendee = async (req, res) => {
    const id = req.params.id;

    try{
        const attendeeDoc = doc(db, "attendees", id).withConverter(attendeesConverter); //Can be three parameters. See docs
        await deleteDoc(attendeeDoc);

        res.status(200).json({message: "Attendee delete successfully"})
    }
    catch(e) {
        res.status(400).json({error: e.message})
    }
}

const viewAllAttendees = async (req, res) => {
    const attendees = []

    try {
        const getAttendeeDocs = await getDocs(attendeesCollection)

        if (getAttendeeDocs.empty)
            throw new Error("Attendee collections is empty");

        getAttendeeDocs.forEach((attendee) => {
            const {
                eventId,
                userId,
                isHost
            } = attendee.data();

            attendees.push({
                id: attendee.id,
                eventId: eventId,
                userId: userId,
                isHost: isHost
            })
        })

        res.status(200).json(attendees)
    }
    catch(e) {
        res.status(400).json({error: e.message})
        console.log(e)
    }
}

const viewAttendee = async (req, res) => {
    const id = req.params.id

    try {
        const attendeeRef = doc(db, "attendees", id).withConverter(attendeesConverter)
        const attendeeDoc = await getDoc(attendeeRef)

        res.status(200).json(attendeeDoc.data())
    }
    catch (e) {
        res.status(400).json({error: "Error", message: e.message})
        console.log(e);
    }
}

module.exports = {
    addAttendee,
    updateAttendee,
    deleteAttendee,
    viewAllAttendees,
    viewAttendee
}