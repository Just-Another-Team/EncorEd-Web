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
    EventAttendance,
    eventAttendanceConverter
} = require("../models/eventAttendance.model")

const eventAttendanceCollection = collection(db, "eventAttendance").withConverter(eventAttendanceConverter)

const addEventAttendance = async (req, res) => {
    try {
        const { eventSchedId, attendeeId, status, submittedDate, remarks } = req.body;

        let eventAttendance = new EventAttendance(
            eventSchedId,
            attendeeId, 
            status,
            new Date(submittedDate),
            remarks
        )

        const eventAttendanceDoc = await addDoc(eventAttendanceCollection, eventAttendance)

        res.status(200).json({id: eventAttendanceDoc.id, message: "Event Attendance added successfully"})
    } catch (e) {
        res.status(400).json({error: e.message})
        console.log(e)
    }
}

const updateEventAttendace = async (req, res) => {
    const id = req.params.id;

    try{
        const { 
            eventSchedId,
            attendeeId,
            status,
            submittedDate, 
            remarks
        } = req.body;

        const eventAttendanceSnapshot = doc(db, `eventAttendance/${id}`).withConverter(eventAttendanceCollection);

        let eventAttendance = new EventAttendance(
            eventSchedId,
            attendeeId,
            new Date(submittedDate),
            remarks,
            status,
        )

        await updateDoc(eventAttendanceSnapshot, Object.assign({}, eventAttendance))

        res.status(200).json({message: "Event Attendance updated successfully"})
    }
    catch(e) {
        res.status(400).json({error: e.message})
    }
}

const deleteEventAttendance = async (req, res) => {
    const id = req.params.id;

    try{
        const eventAttendanceDoc = doc(db, "eventAttendance", id).withConverter(eventAttendanceConverter); //Can be three parameters. See docs
        await deleteDoc(eventAttendanceDoc);

        res.status(200).json({message: "Event attendance delete successfully"})
    }
    catch(e) {
        res.status(400).json({error: e.message})
    }
}

const viewAllEventAttendances = async (req, res) => {
    const eventAttendances = []

    try {
        const getEventAttendanceDocs = await getDocs(eventAttendanceCollection)

        if (getEventAttendanceDocs.empty)
            throw new Error("Event Attendance collections is empty");

        getEventAttendanceDocs.forEach((eventAttendance) => {
            const {
                eventSchedId,
                attendeeId,
                status,
                submittedDate,
                remarks
            } = eventAttendance.data();

            eventAttendances.push({
                id: eventAttendance.id,
                eventSchedId: eventSchedId,
                attendeeId: attendeeId,
                status: status,
                submittedDate: new Timestamp(submittedDate.seconds, submittedDate.nanoseconds).toDate(),
                remarks: remarks
            })
        })

        res.status(200).json(eventAttendances)
    }
    catch(e) {
        res.status(400).json({error: e.message})
        console.log(e)
    }
}

module.exports = {
    addEventAttendance,
    updateEventAttendace,
    deleteEventAttendance,
    viewAllEventAttendances
}