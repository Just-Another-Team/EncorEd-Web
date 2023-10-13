const {
    db,
    Timestamp,
    Filter,
} = require('../database');
const {
    Participant,
    participantConverter
} = require("../models/participant.model")

const participantsCollection = db.collection(`/participants/`).withConverter(participantConverter)

const addParticipant = async (req, res) => {
    try {
        let participant = new Participant(
            req.body.subId,
            req.body.userId,
            req.body.isTeacher,
        )

        await participantsCollection.doc().withConverter(participantConverter).create(participant)
            .then((result) => {
                res.status(200).json({message: "Participants added successfully"})
            })
            .catch((err) => {
                throw {message: err.message}
            })

        //const participantDoc = await addDoc(participantsCollection, participant)
    } catch (e) {
        res.status(400).json({name: "Participant", type: "Add", error: e.message})
    }
}

const updateParticipant = async (req, res) => {
    const id = req.params.id;

    try {
        const subScheduleSnapshot = db.doc(`/participants/${id}`).withConverter(participantConverter);

        //If ID exist

        let participant = new Participant(
            req.body.subId,
            req.body.userId,
            req.body.isTeacher,
        );

        await subScheduleSnapshot.update(participantConverter.toFirestore(participant)) //EHHHH IDK ABOUT THIS ONE CHIEF
            .then((result) => {
                res.status(200).json({message: "Data updated successfully!"})
            })
            .catch((err) => {
                throw {message: err.message}
            })

        // await updateDoc(subScheduleSnapshot, {
        //     subId: participant.getSubId,
        //     userId: participant.getUserId,
        //     isTeacher: participant.getIsTeacher,
        // })
    } catch (e) {
        res.status(400).json({name: "Participants", type: "Update", error: e.message})
    }
}

const deleteParticipant = async (req, res) => {
    const id = req.params.id;

    try {
        const participantSnapshot = db.doc(`/participants/${id}`).withConverter(participantConverter);

        //If id exists

        await participantSnapshot.delete()
            .then((result) => {
                res.status(200).json({message: "Data deleted successfully."})
            })
            .catch((err) => {
                throw {message: err.message}
            })

        //await deleteDoc();
    } catch (e) {
        res.status(400).json({name: "Participants", type: "Update", error: e.message})
    }
}

const viewAllParticipants = async (req, res) => {
    const participants = []

    try {
        const getParticipantDocs = await participantsCollection.get();


        if (getParticipantDocs.empty)
            throw {message: "Participant collections is empty"};

        getParticipantDocs.forEach((participant) => {
            const {
                subId,
                userId,
                isTeacher,
            } = participant.data();

            participants.push({
                id: participant.id,
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
        //const viewBySubject = query(participantsCollection, where("subId", "==", subId))
        const viewBySubject = participantsCollection.where(Filter.where("subId", "==", subId))

        const getParticipantDocs = await viewBySubject.get()

        if (getParticipantDocs.empty)
            throw {message: `Query does not find users relating to subject ${subId}`};

        getParticipantDocs.forEach((participant) => {
            const {
                subId,
                userId,
                isTeacher,
            } = participant.data();

            participants.push({
                id: participant.id,
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
        //const viewByUser = query(participantsCollection, where("userId", "==", userId))
        const viewByUser = participantsCollection.where(Filter.where("userId", "==", userId));

        const getParticipantDocs = await viewByUser.get();

        if (getParticipantDocs.empty)
            throw new Error(`Query does not find subjects relating to user ${userId}`);

        getParticipantDocs.forEach((participant) => {
            const {
                subId,
                userId,
                isTeacher,
            } = participant.data();

            participants.push({
                id: participant.id,
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