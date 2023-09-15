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
    Subject,
    subjectConverter
} = require("../models/subject.model")

const subjectCollection = collection(db, "subjects").withConverter(subjectConverter)

const addSubject = async (req, res) => {
    try {
        let subject = new Subject(
            req.body.name,
            req.body.edpCode,
            req.body.type,
            req.body.units,
            new Date(req.body.creationDate),
            req.body.createdBy,
            req.body.verifiedBy,
            req.body.status
        )

        const subjectDoc = await addDoc(subjectCollection, subject)

        res.status(200).json({id: subjectDoc.id, message: "Subject added successfully"})
    } catch (e) {
        res.status(400).json({error: e.message})
    }
}

const viewAllSubject = async (req, res) => {
    
    const subjects = []

    try {
        const getSubjectDocs = await getDocs(subjectCollection)

        if (getSubjectDocs.empty)
            throw new Error("Subject collection is empty");

        getSubjectDocs.forEach((subject) => {
            const {name, edpCode, type, units, creationDate, createdBy, verifiedBy, status} = subject.data();

            subjects.push({
                id: subject.id, //This should have been an edp code
                name,
                edpCode,
                type,
                units,
                creationDate: new Timestamp(creationDate.seconds, creationDate.nanoseconds).toDate(),
                createdBy,
                verifiedBy,
                status
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

    try {
        const subjectRef = doc(db, "subjects", id).withConverter(subjectConverter)
        const subjectDoc = await getDoc(subjectRef)

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
            req.body.type,
            req.body.units,
            new Date(req.body.creationDate),
            req.body.createdBy,
            req.body.verifiedBy,
            req.body.status
        );

        updateDoc(subjectSnapshot, {
            name: subject.getName,
            edpCode: subject.getEdpCode,
            type: subject.getType,
            units: subject.getUnits,
            creationDate: subject.getCreationDate,
            createdBy: subject.getCreatedBy,
            verifiedBy: subject.getVerifiedBy,
            status: subject.getStatus,
        })

        res.status(200).json({message: "Data updated successfully!"})
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