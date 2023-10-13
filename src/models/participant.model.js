class Participant {
    constructor(subId, userId, isTeacher) {
        this.setSubId = subId;
        this.setUserId = userId;
        this.setIsTeacher = isTeacher;
    }

    set setSubId(_subId) {
        this.subId = _subId;
    }
    get getSubId() {
        return this.subId;
    }

    set setUserId(_userId) {
        this.userId = _userId
    }
    get getUserId() {
        return this.userId;
    }

    set setIsTeacher(_isTeacher) {
        this.isTeacher = _isTeacher;
    }
    get getIsTeacher() {
        return this.isTeacher
    }
}

const participantConverter = {
    toFirestore: (participant) => {
        return {
            subId: participant.subId,
            userId: participant.userId,
            isTeacher: participant.isTeacher,
        }
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options)
        return new Participant(
            data.subId,
            data.userId,
            data.isTeacher
        )
    }
}

module.exports = {Participant, participantConverter}
