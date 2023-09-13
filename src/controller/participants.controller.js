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
    Participant,
    participantConverter
} = require("../models/participant.model")

const participantsCollection = collection(db, "participants").withConverter(participantConverter)

const addParticipant = async (req, res) => {
    try {
        let participant = new Participant(
            req.body.subId,
            req.body.userId,
            req.body.isTeacher,
        )

        const participantDoc = await addDoc(participantsCollection, participant)

        res.status(200).json({id: participantDoc.id, message: "Participants added successfully"})
    } catch (e) {
        res.status(400).json({error: e.message})
    }
}

const updateParticipant = async (req, res) => {
    const id = req.params.id;

    try {
        const subScheduleSnapshot = await doc(db, `/participants/${id}`).withConverter(participantConverter);

        //If ID exist

        let participant = new Participant(
            req.body.subId,
            req.body.userId,
            req.body.isTeacher,
        );

        updateDoc(subScheduleSnapshot, {
            subId: participant.getSubId(),
            userId: participant.getUserId(),
            isTeacher: participant.getIsTeacher(),
        })

        res.status(200).json({message: "Data updated successfully!"})
    } catch (e) {
        res.status(400).json({error: e.message})
    }
}

const deleteParticipant = async (req, res) => {
    const id = req.params.id;

    try {
        const participantSnapshot = doc(db, `/participants/${id}`).withConverter(participantConverter);

        //If id exists

        await deleteDoc(participantSnapshot);

        res.status(200).json({message: "Data deleted successfully."})
    } catch (e) {
        res.status(400).json({error: e.message})
    }
}

const viewAllParticipants = async (req, res) => {
    const getParticipantDocs = await getDocs(participantsCollection)

    const participants = []

    try {
        if (getParticipantDocs.empty)
            throw new Error("Participant collections is empty");

            getParticipantDocs.forEach((participant) => {
            const {
                subId,
                userId,
                isTeacher,
            } = participant.data();

            participants.push({
                id: schedule.id,
                subId: subId,
                userId: userId,
                isTeacher: isTeacher,
            })
        })

        res.status(200).json(participants)
    }
    catch(e) {
        res.status(400).json({error: e.message})
    }
}

const viewParticipantsBySubject = async (req, res) => {
    const subId = req.body.subId;
    const participants = []

    try {
        const viewBySubject = query(participantsCollection, where("subId", "==", subId))

        const getParticipantDocs = await getDocs(viewBySubject)

        if (getParticipantDocs.empty)
            throw new Error(`Query does not find users relating to subject ${subId}`);

        getParticipantDocs.forEach((participant) => {
            const {
                subId,
                userId,
                isTeacher,
            } = participant.data();

            participants.push({
                id: schedule.id,
                subId: subId,
                userId: userId,
                isTeacher: isTeacher,
            })
        })

        res.status(200).json(participants)
    }
    catch(e) {
        res.status(400).json({error: e.message})
    }
}

const viewParticipantsByUser = async (req, res) => {
    const userId = req.body.userId;
    const participants = []

    try {
        const viewByUser = query(participantsCollection, where("userId", "==", userId))

        const getParticipantDocs = await getDocs(viewByUser)

        if (getParticipantDocs.empty)
            throw new Error(`Query does not find subjects relating to user ${userId}`);

        getParticipantDocs.forEach((participant) => {
            const {
                subId,
                userId,
                isTeacher,
            } = participant.data();

            participants.push({
                id: schedule.id,
                subId: subId,
                userId: userId,
                isTeacher: isTeacher,
            })
        })

        res.status(200).json(participants)
    }
    catch(e) {
        res.status(400).json({error: e.message})
    }
}

module.exports = {
    addParticipant,
    updateParticipant,
    deleteParticipant,
    viewAllParticipants,
    viewParticipantsBySubject,
    viewParticipantsByUser
}