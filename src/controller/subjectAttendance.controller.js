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
    SubjectAttendance,
    subjectAttendanceConverter
} = require("../models/subjectAttendance.model")

const subjectAttendanceCollection = db.collection(`/subjectAttendances/`).withConverter(subjectAttendanceConverter)

const addSubAttendance = async (req, res) => {
    try {
        const { subSchedId, parId, attendanceStatus, submitDateTime, remarks, verifiedBy } = req.body;

        let subjectAttendance = new SubjectAttendance(
            subSchedId,
            parId,
            attendanceStatus,
            new Date(submitDateTime),
            remarks,
            verifiedBy
        )

        console.log(subjectAttendance)

        const subjectAttendanceDocRef = await db.doc(`/subjectAttendances/`).withConverter(subjectAttendanceConverter);

        await subjectAttendanceDocRef.create(subjectAttendance)
            .then((result) => {
                res.status(200).json({id: subjectAttendanceDocRef.id, message: "Subject added successfully"})
            })
            .catch((err) => {
                throw {message: err.message}
            })

    } catch (e) {
        res.status(400).json({name: "Subject Attendance", type: "Add", error: e.message})
    }
}

const updateSubAttendance = async (req, res) => {
    const id = req.params.id

    try {
        const subjectAttendanceDocRef =  db.doc(`/subjectAttendances/${id}`).withConverter(subjectAttendanceConverter);

        const { subSchedId, parId, attendanceStatus, submitDateTime, remarks, verifiedBy } = req.body;

        let subjectAttendance = new SubjectAttendance(
            subSchedId,
            parId,
            attendanceStatus,
            submitDateTime,
            remarks,
            verifiedBy
        )

        await subjectAttendanceDocRef.update(Object.assign({}, subjectAttendance))
            .then((result) => {
                res.status(200).json({message: "Data updated successfully!"})
            })
            .catch((err) => {
                throw {message: err.message}
            })
        
    } catch (e) {
        res.status(400).json({name: "Subject Attendance", type: "Update", error: e.message})
    }
}

const deleteSubAttendance = async (req, res) => {
    const id = req.params.id

    try {
        const subjectAttendanceDocRef = db.doc(`/subjectAttendances/${id}`).withConverter(subjectAttendanceConverter);

        await subjectAttendanceDocRef.delete()
            .then((result) => {
                res.status(200).json("Data deleted successfully.")
            })
            .catch((err) => {
                throw {message: err.message}
            })
    } catch (e) {
        res.status(400).json({name: "Subject Attendance", type: "Delete", error: e.message})
    }
}

const viewAllSubAttendance = async (req, res) => {
    const subjectAttendances = []

    try {
        const getSubjectAttendanceDocs = await subjectAttendanceCollection.get();

        if (getSubjectAttendanceDocs.empty)
            throw {message: "Subject Attendance collection is empty"}

        getSubjectAttendanceDocs.forEach((subjectAttendance) => {
            const { subSchedId, parId, attendanceStatus, submitDateTime, remarks, verifiedBy } = subjectAttendance.data();

            subjectAttendances.push({
                id: subjectAttendance.id,
                subSchedId,
                parId,
                attendanceStatus,
                submitDateTime,
                remarks,
                verifiedBy
            })
        })

        res.status(200).json(subjectAttendances)
    } catch (e) {
        res.status(400).json({name: "Subject Attendances", type: "Retrieve All", error: e.message})
    }
}

module.exports = {
    addSubAttendance,
    viewAllSubAttendance,
    updateSubAttendance,
    deleteSubAttendance
}