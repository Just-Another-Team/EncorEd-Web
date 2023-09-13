const {
    db,
    Timestamp,
    addDoc,
    getDoc,
    getDocs,
    doc,
    collection,
    updateDoc,
    deleteDoc
} = require('../database');
const {
    SubjectSchedule,
    subScheduleConverter
} = require("../models/subjectSchedule.model")

const subjectScheduleCollection = collection(db, "subjectSchedules").withConverter(subScheduleConverter)

const addSubjectSchedule = async (req, res) => {
    try {
        let subjectSchedule = new SubjectSchedule(
            req.body.subId,
            req.body.roomId,
            req.body.assignedWeek,
            new Date(req.body.startTime),
            new Date(req.body.endTime),
            req.body.createdBy,
            req.body.verifiedBy,
            req.body.status
        )

        const subjectScheduleDoc = await addDoc(subjectScheduleCollection, subjectSchedule)

        res.status(200).json({id: subjectScheduleDoc.id, message: "Subject Schedule added successfully"})
    } catch (e) {
        res.status(400).json({error: e.message})
    }
}

const updateSubjectSchedule = async (req, res) => {
    const id = req.params.id;

    try {
        const subScheduleSnapshot = await doc(db, `/subjectSchedules/${id}`).withConverter(subScheduleConverter);

        //If ID exist

        let subjectSchedule = new SubjectSchedule(
            req.body.subId,
            req.body.roomId,
            req.body.assignedWeek,
            new Date(req.body.startTime),
            new Date(req.body.endTime),
            req.body.createdBy,
            req.body.verifiedBy,
            req.body.status
        );

        updateDoc(subScheduleSnapshot, {
            subId: subjectSchedule.getSubId,
            roomId: subjectSchedule.getRoomId,
            assignedWeek: subjectSchedule.getAssignedWeek,
            startTime: subjectSchedule.getStartTime,
            endTime: subjectSchedule.getEndTime,
            createdBy: subjectSchedule.getCreatedBy,
            verifiedBy: subjectSchedule.getVerifiedBy,
            status: subjectSchedule.getStatus
        })

        res.status(200).json({message: "Data updated successfully!"})
    } catch (e) {
        res.status(400).json({error: e.message})
    }
}

const deleteSubjectSchedule = async (req, res) => {
    const id = req.params.id;

    try {
        const subScheduleSnapshot = doc(db, `/subjectSchedules/${id}`).withConverter(subjectScheduleCollection);

        //If id exists

        await deleteDoc(subScheduleSnapshot);

        res.status(200).json({message: "Data deleted successfully."})
    } catch (e) {
        res.status(400).json({error: e.message})
    }
}

const viewAllSubjectSchedule = async (req, res) => {
    const schedules = []

    try {
        const getSubSchedDocs = await getDocs(subjectScheduleCollection)

        if (getSubSchedDocs.empty)
            throw new Error("Subject Schedule collections is empty");

        getSubSchedDocs.forEach((schedule) => {
            const {
                subId,
                roomId,
                assignedWeek,
                startTime,
                endTime,
                createdBy,
                verifiedBy,
                status
            } = schedule.data();

            schedules.push({
                id: schedule.id,
                subId: subId,
                roomId: roomId,
                assignedWeek: assignedWeek,
                startTime: new Timestamp(startTime.seconds, startTime.nanoseconds).toDate(),
                endTime: new Timestamp(endTime.seconds, endTime.nanoseconds).toDate(),
                createdBy: createdBy,
                verifiedBy: verifiedBy,
                status: status
            })
        })

        res.status(200).json(schedules)
    }
    catch(e) {
        res.status(400).json({error: e.message})
    }
}

const viewSubjectSchedule = async (req, res) => {
    const id = req.params.id

    try {
        const subScheduleRef = doc(db, "subjectSchedules", id).withConverter(subScheduleConverter)
        const subjectScheduleDoc = await getDoc(subScheduleRef)

        if (subjectScheduleDoc.data() === undefined)
            throw new Error(`${id} does not exist.`)

        let subjectSchedule = new SubjectSchedule(
            subjectScheduleDoc.data().subId,
            subjectScheduleDoc.data().roomId,
            subjectScheduleDoc.data().assignedWeek,
            new Timestamp(subjectScheduleDoc.data().startTime.seconds, subjectScheduleDoc.data().startTime.nanoseconds).toDate(),
            new Timestamp(subjectScheduleDoc.data().endTime.seconds, subjectScheduleDoc.data().endTime.nanoseconds).toDate(),
            subjectScheduleDoc.data().createdBy,
            subjectScheduleDoc.data().verifiedBy,
            subjectScheduleDoc.data().status
        )

        res.status(200).json(subjectSchedule)
    }
    catch (e) {
        res.status(400).json({error: "Error", message: e.message})
    }
}

module.exports = {
    addSubjectSchedule,
    deleteSubjectSchedule,
    updateSubjectSchedule,
    viewAllSubjectSchedule,
    viewSubjectSchedule
}