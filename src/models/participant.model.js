class Participant {
    constructor(subId, userId, isTeacher) {
        this.setSubId(subId);
        this.setUserId(userId);
        this.setIsTeacher(isTeacher);
    }

    setSubId(_subId) {
        this.subId = _subId;
    }
    getSubId() {
        return this.subId;
    }

    setUserId(_userId) {
        this.userId = _userId
    }
    getUserId() {
        return this.userId;
    }

    setIsTeacher(_isTeacher) {
        this.isTeacher = _isTeacher;
    }
    getIsTeacher() {
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
        return new Subject(
            data.subId,
            data.userId,
            data.isTeacher
        )
    }
}

module.exports = {Participant, participantConverter}
