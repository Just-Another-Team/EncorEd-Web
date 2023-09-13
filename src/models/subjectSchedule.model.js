class SubjectSchedule {
    constructor(subId, roomId, assignedWeek, startTime, endTime, createdBy, verifiedBy, status) {
        this.setSubId(subId);
        this.setRoomId(roomId);
        this.setAssignedWeek(assignedWeek);
        this.setStartTime(startTime);
        this.setEndTime(endTime);
        this.setCreatedBy(createdBy);
        this.setVerifiedBy(verifiedBy);
        this.setStatus(status);
    }

    setSubId(_subId) {
        this.subId = _subId;
    }
    getSubId() {
        return this.subId;
    }

    setRoomId(_roomId) {
        this.roomId = _roomId;
    }
    getRoomId() {
        return this.roomId;
    }

    setAssignedWeek(_assignedWeek) {
        this.assignedWeek = _assignedWeek;
    }
    getAssignedWeek() {
        return this.assignedWeek;
    }

    setStartTime(_startTime) {
        this.startTime = _startTime;
    }
    getStartTime() {
        return this.startTime;
    }

    setEndTime(_endTime) {
        this.endTime = _endTime;
    }
    getEndTime() {
        return this.endTime;
    }

    setCreatedBy(_createdBy) {
        this.createdBy = _createdBy;
    }
    getCreatedBy() {
        return this.createdBy;
    }

    setVerifiedBy(_verifiedBy) {
        this.verifiedBy = _verifiedBy;
    }
    getVerifiedBy() {
        return this.verifiedBy;
    }

    setStatus(_status) {
        this.status = _status;
    }
    getStatus() {
        return this.status
    }
}

const subScheduleConverter = {
    toFirestore: (subjectSchedule) => {
        return {
            subId: subjectSchedule.subId,
            roomId: subjectSchedule.roomId,
            assignedWeek: subjectSchedule.assignedWeek,
            startTime: subjectSchedule.startTime,
            endTime: subjectSchedule.endTime,
            createdBy: subjectSchedule.createdBy,
            verifiedBy: subjectSchedule.verifiedBy,
            status: subjectSchedule.status
        }
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options)
        return new SubjectSchedule(
            data.subId,
            data.roomId,
            data.assignedWeek,
            data.startTime,
            data.endTime,
            data.createdBy,
            data.verifiedBy,
            data.status
        )
    }
}

module.exports = {SubjectSchedule, subScheduleConverter}