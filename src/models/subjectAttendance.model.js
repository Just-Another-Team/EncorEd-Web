class SubjectAttendance {
    constructor(subSchedId, parId, attendanceStatus, submitDateTime, remarks, verifiedBy) {
        this.setSubSchedId = subSchedId
        this.setParId = parId
        this.setAttendanceStatus = attendanceStatus
        this.setSubmitDateTime = submitDateTime
        this.setRemarks = remarks
        this.setVerifiedBy = verifiedBy
    }

    set setSubSchedId(_subSchedId) {
        this.subSchedId = _subSchedId
    }
    get getSubSchedId() {
        return this.subSchedId
    }

    set setParId(_parId) {
        this.parId = _parId
    }
    get getParId() {
        return this.parId
    }

    set setAttendanceStatus(_attendanceStatus) {
        this.attendanceStatus = _attendanceStatus
    }
    get getAttendanceStatus() {
        return this.attendanceStatus
    }

    set setSubmitDateTime(_submitDateTime) {
        this.submitDateTime = _submitDateTime
    }
    get getSubmitDateTime() {
        return this.submitDateTime
    }

    set setRemarks(_remarks) {
        this.remarks = _remarks
    }
    get getRemarks() {
        return this.remarks
    }

    set setVerifiedBy(_verifiedBy) {
        this.verifiedBy = _verifiedBy
    }
    get getVerifiedBy() {
        return this.verifiedBy
    }
}

const subjectAttendanceConverter = {
    toFirestore: (subjectAttendance) => {
        return {
            subSchedId: subjectAttendance.subSchedId,
            parId: subjectAttendance.parId,
            attendanceStatus: subjectAttendance.attendanceStatus,
            submitDateTime: subjectAttendance.submitDateTime,
            remarks: subjectAttendance.remarks,
            verifiedBy: subjectAttendance.verifiedBy
        }
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options)
        return new SubjectAttendance(
            data.subSchedId,
            data.parId,
            data.attendanceStatus,
            data.submitDateTime,
            data.remarks,
            data.verifiedBy,
        )
    }
}

module.exports = {SubjectAttendance, subjectAttendanceConverter}