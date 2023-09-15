class Attendees {
    constructor(eventId, userId, isHost) {
        this.setEventId = eventId
        this.setUserId = userId
        this.setIsHost = isHost
    }

    set setEventId(_eventId) {
        this.eventId = _eventId
    }
    get getEventId() {
        return this.eventId
    }

    set setUserId(_userId) {
        this.userId = _userId
    }
    get getUserId() {
        return this.userId
    }

    set setIsHost(_isHost) {
        this.isHost = _isHost
    }
    get getIsHost() {
        return this.isHost
    }
}

const attendeesConverter = {
    toFirestore: (attendees) => {
        return {
            eventId: attendees.eventId,
            userId: attendees.userId,
            isHost: attendees.isHost
        }
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options)
        return new Attendees(
            data.eventId,
            data.userId,
            data.isHost
        )
    }
}

module.exports = {Attendees, attendeesConverter}