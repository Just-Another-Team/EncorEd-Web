const {
    db,
    addDoc,
    getDoc,
    getDocs,
    doc,
    collection,
    updateDoc,
    deleteDoc
} = require('../database');
const {
    Subject,
    subjectConverter
} = require("../models/subject.model")

const subjectCollection = collection(db, "subjects").withConverter(subjectConverter)

const addSubject = async (req, res) => {
    console.log(req.body)
    
    try {
        let subject = new Subject(
            req.body.name,
            req.body.edpCode,
            req.body.assignedWeek,
            req.body.startTime,
            req.body.endTime,
            req.body.status,
            req.body.roomId
        )

        const subjectDoc = await addDoc(subjectCollection, subject)

        res.status(200).json({id: subjectDoc.id, message: "Subject added successfully"})
    }
    catch(e) {
        res.status(400).json({error: e.message})
    }
}

const viewAllSubject = async (req, res) => {
    const getSubjectDocs = await getDocs(subjectCollection)

    const subjects = []

    try {
        getSubjectDocs.forEach((subject) => {
            subjects.push({
                id: subject.id, //This should have been an edp code
                ...subject.data()
            })
        })

        res.status(200).json(subjects)
    }
    catch(e) {
        res.status(400).json({error: e.message})
    }
}

const viewSubject = async (req, res) => {
    const id = req.params.id

    const subjectRef = doc(db, "subjects", id).withConverter(subjectConverter)
    const subjectDoc = await getDoc(subjectRef)

    try {
        res.status(200).json(subjectDoc.data())
    }
    catch (e) {
        res.status(400).json({error: "Error", message: e.message})
    }
}

const updateSubject = async (req, res) => {
    const id = req.params.id;

    try {
        const subjectSnapshot = await doc(db, `/subjects/${id}`).withConverter(subjectConverter);

        let subject = new Subject(
            req.body.name,
            req.body.edpCode,
            req.body.assignedWeek,
            req.body.startTime,
            req.body.endTime,
            req.body.status,
            req.body.roomId
        );

        updateDoc(subjectSnapshot, {
            name: subject.getName(),
            edpCode: subject.getEdpCode(),
            assignedWeek: subject.getAssignedWeek(),
            startTime: subject.getStartTime(),
            endTime: subject.getEndTime(),
            status: subject.getStatus(),
            roomId: subject.getRoomId()
        })

        res.status(200).json("Data updated successfully!")
    } catch (e) {
        res.status(400).json({error: e.message})
    }
}

const deleteSubject = async (req, res) => {
    const id = req.params.id;

    try {
        const subjectSnapshot = doc(db, `/subjects/${id}`).withConverter(subjectConverter);

        await deleteDoc(subjectSnapshot);

        res.status(200).json("Data deleted successfully.")
    } catch (e) {
        res.status(400).json({error: e.message})
    }
}

module.exports = {addSubject, viewAllSubject, viewSubject, updateSubject, deleteSubject}