class EventSchedule {
    constructor(eventId, roomId, venue, startDateTime, endDateTime, createdBy, verifiedBy, status, inCampus) {
        this.setEventId = eventId
        this.setRoomId = roomId
        this.setVenue = venue
        this.setStartDateTime = startDateTime
        this.setEndDateTime = endDateTime
        this.setCreatedBy = createdBy
        this.setVerifiedBy = verifiedBy
        this.setStatus = status
        this.setInCampus = inCampus
    }

    set setEventId(_eventId) {
        this.eventId = _eventId
    }
    get getEventId() {
        return this.eventId
    }

    set setRoomId(_roomId) {
        this.roomId = _roomId
    }
    get getRoomId() {
        return this.roomId
    }

    set setVenue(_venue) {
        this.venue = _venue
    }
    get getVenue() {
        return this.venue
    }

    set setStartDateTime(_startDateTime) {
        this.startDateTime = _startDateTime
    }
    get getStartDateTime() {
        return this.startDateTime
    }

    set setEndDateTime(_endDateTime) {
        this.endDateTime = _endDateTime
    }
    get getEndDateTime() {
        this.endDateTime
    }

    set setCreatedBy(_createdBy) {
        this.createdBy = _createdBy
    }
    get getCreatedBy() {
        return this.createdBy
    }
    
    set setVerifiedBy(_verfiedBy) {
        this.verifiedBy = _verfiedBy
    }
    get getVerifiedBy() {
        return this.verifiedBy
    }
    
    set setStatus(_status) {
        this.status = _status
    }
    get getStatus() {
        return this.status
    }
    
    set setInCampus(_inCampus) {
        this.inCampus = _inCampus
    }
    get getInCampus() {
        return this.inCampus
    }
}

const eventScheduleConverter = {
    toFirestore: (eventSchedule) => {
        return {
            eventId: eventSchedule.eventId,
            roomId: eventSchedule.roomId,
            venue: eventSchedule.venue,
            startDateTime: eventSchedule.startDateTime,
            endDateTime: eventSchedule.endDateTime,
            createdBy: eventSchedule.createdBy,
            verifiedBy: eventSchedule.verifiedBy,
            status: eventSchedule.status,
            inCampus: eventSchedule.inCampus
        }
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options)
        
        return new EventSchedule(
            data.eventId,
            data.roomId,
            data.venue,
            data.startDateTime,
            data.endDateTime,
            data.createdBy,
            data.verifiedBy,
            data.status,
            data.inCampus
        )
    }
}

module.exports = {EventSchedule, eventScheduleConverter}