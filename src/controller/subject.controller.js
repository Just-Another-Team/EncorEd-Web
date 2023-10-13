const {
    db,
    Timestamp
} = require('../database');
const {
    Subject,
    subjectConverter
} = require("../models/subject.model")

const subjectCollection = db.collection(`/subjects/`).withConverter(subjectConverter)

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

        const subjectDocRef = await db.doc(`/subjects/`).withConverter(subjectConverter)

        await subjectDocRef.create(subject)
            .then((result) => {
                res.status(200).json({message: "Subject added successfully"})
            })
            .catch((err) => {
                throw {message: err.message}
            })

    } catch (e) {
        res.status(400).json({name: "Subject", type: "Add", error: e.message})
    }
}

const viewAllSubject = async (req, res) => {
    
    const subjects = []

    try {
        const getSubjectDocs = await subjectCollection.get();

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
        const subjectRef = db.doc(`/subjects/${id}`).withConverter(subjectConverter)
        const subjectDoc = await subjectRef.get();

        res.status(200).json(subjectDoc.data())
    }
    catch (e) {
        res.status(400).json({error: "Error", message: e.message})
    }
}

const updateSubject = async (req, res) => {
    const id = req.params.id;

    try {
        const subjectDocRef = await db.doc(`/subjects/${id}`).withConverter(subjectConverter);

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

        await subjectDocRef.update(Object.create({}, subject))
            .then((result) => {
                res.status(200).json({message: "Data updated successfully!"})
            })
            .catch((err) => {
                throw {message: err.message}
            })

        // await updateDoc(subjectSnapshot, {
        //     name: subject.getName,
        //     edpCode: subject.getEdpCode,
        //     type: subject.getType,
        //     units: subject.getUnits,
        //     creationDate: subject.getCreationDate,
        //     createdBy: subject.getCreatedBy,
        //     verifiedBy: subject.getVerifiedBy,
        //     status: subject.getStatus,
        // })
    } catch (e) {
        res.status(400).json({name: "Subject", type: "Update", error: e.message})
    }
}

const deleteSubject = async (req, res) => {
    const id = req.params.id;

    try {
        const subjectDocRef = db.doc(`/subjects/${id}`).withConverter(subjectConverter);

        await subjectDocRef.delete()
            .then((result) => {
                res.status(200).json("Data deleted successfully.")
            })
            .catch((err) => {
                throw {message: err.message}
            })
    } catch (e) {
        res.status(400).json({name: "Subject", type: "Delete", error: e.message})
    }
}

module.exports = {addSubject, viewAllSubject, viewSubject, updateSubject, deleteSubject}