class EventAttendance {
    constructor(eventSchedId, attendeeId, status, submittedDate, remarks) {
        this.setEventSchedId = eventSchedId
        this.setAttendeeId = attendeeId
        this.setStatus = status
        this.setSubmittedDate = submittedDate
        this.setRemarks = remarks
    }

    set setEventSchedId(_eventSchedId) {
        this.eventSchedId = _eventSchedId
    }
    get getEventSchedId() {
        return this.eventSchedId
    }

    set setAttendeeId(_attendeeId) {
        this.attendeeId = _attendeeId
    }
    get getAttendeeId() {
        return this.attendeeId
    }
    
    set setStatus(_status) {
        this.status = _status
    }
    get getStatus() {
        return this.status
    }
    
    set setSubmittedDate(_submittedDate) {
        this.submittedDate = _submittedDate
    }
    get getSubmittedDate() {
        return this.submittedDate
    }
    
    set setRemarks(_remarks) {
        this.remarks = _remarks
    }
    get getRemarks() {
        return this.remarks
    }
}

const eventAttendanceConverter = {
    toFirestore: (eventAttendance) => {
        return {
            eventSchedId: eventAttendance.eventSchedId,
            attendeeId: eventAttendance.attendeeId,
            status: eventAttendance.status,
            submittedDate: eventAttendance.submittedDate,
            remarks: eventAttendance.remarks
        }
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options)
        return new EventAttendance(
            data.eventSchedId,
            data.attendeeId,
            data.status,
            data.submittedDate,
            data.remarks
        )
    }
}

module.exports = {EventAttendance, eventAttendanceConverter}