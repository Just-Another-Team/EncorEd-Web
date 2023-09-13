class SubjectSchedule {
    constructor(subId, roomId, assignedWeek, startTime, endTime, createdBy, verifiedBy, status) {
        this.setSubId = subId;
        this.setRoomId = roomId;
        this.setAssignedWeek = assignedWeek;
        this.setStartTime = startTime;
        this.setEndTime = endTime;
        this.setCreatedBy = createdBy;
        this.setVerifiedBy = verifiedBy;
        this.setStatus = status;
    }

    set setSubId(_subId) {
        this.subId = _subId;
    }
    get getSubId() {
        return this.subId;
    }

    set setRoomId(_roomId) {
        this.roomId = _roomId;
    }
    get getRoomId() {
        return this.roomId;
    }

    set setAssignedWeek(_assignedWeek) {
        this.assignedWeek = _assignedWeek;
    }
    get getAssignedWeek() {
        return this.assignedWeek;
    }

    set setStartTime(_startTime) {
        this.startTime = _startTime;
    }
    get getStartTime() {
        return this.startTime;
    }

    set setEndTime(_endTime) {
        this.endTime = _endTime;
    }
    get getEndTime() {
        return this.endTime;
    }

    set setCreatedBy(_createdBy) {
        this.createdBy = _createdBy;
    }
    get getCreatedBy() {
        return this.createdBy;
    }

    set setVerifiedBy(_verifiedBy) {
        this.verifiedBy = _verifiedBy;
    }
    get getVerifiedBy() {
        return this.verifiedBy;
    }

    set setStatus(_status) {
        this.status = _status;
    }
    get getStatus() {
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