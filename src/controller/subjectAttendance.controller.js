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

const subjectAttendanceCollection = collection(db, "subjectAttendances").withConverter(subjectAttendanceConverter)

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

        const subjectAttendanceDoc = await addDoc(subjectAttendanceCollection, subjectAttendance);

        res.status(200).json({id: subjectAttendanceDoc.id, message: "Subject added successfully"})
    } catch (e) {
        res.status(400).json({error: e.message})
    }
}

const updateSubAttendance = async (req, res) => {
    const id = req.params.id

    try {
        const subjectAttendanceSnapshot = await doc(db, `/subjectAttendances/${id}`).withConverter(subjectAttendanceConverter);

        const { subSchedId, parId, attendanceStatus, submitDateTime, remarks, verifiedBy } = req.body;

        let subjectAttendance = new SubjectAttendance(
            subSchedId,
            parId,
            attendanceStatus,
            submitDateTime,
            remarks,
            verifiedBy
        )

        updateDoc(subjectAttendanceSnapshot, {
            subSchedId: subjectAttendance.getSubSchedId,
            parId: subjectAttendance.getParId,
            attendanceStatus: subjectAttendance.getAttendanceStatus,
            submitDateTime: subjectAttendance.getSubmitDateTime,
            remarks: subjectAttendance.getRemarks,
            verifiedBy: subjectAttendance.getVerifiedBy
        })

        res.status(200).json({message: "Data updated successfully!"})
    } catch (e) {
        res.status(400).json({error: e.message})
    }
}

const deleteSubAttendance = async (req, res) => {
    const id = req.params.id

    try {
        const subjectAttendanceSnapshot = doc(db, `/subjectAttendances/${id}`).withConverter(subjectAttendanceConverter);

        await deleteDoc(subjectAttendanceSnapshot);

        res.status(200).json("Data deleted successfully.")
    } catch (e) {
        res.status(400).json({error: e.message})
    }
}

const viewAllSubAttendance = async (req, res) => {
    const subjectAttendances = []

    try {
        const getSubjectAttendanceDocs = await getDocs(subjectAttendanceCollection);

        if (getSubjectAttendanceDocs.empty)
            throw new Error("Subject Attendance collection is empty")

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
        res.status(400).json({error: e.message})
    }
}

module.exports = {
    addSubAttendance,
    viewAllSubAttendance,
    updateSubAttendance,
    deleteSubAttendance
}