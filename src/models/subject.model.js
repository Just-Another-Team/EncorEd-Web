class Subject {
    constructor(name, edpCode, assignedWeek, startTime, endTime, status, roomId) {
        this.setName(name)
        this.setEdpCode(edpCode)
        this.setAssignedWeek(assignedWeek)
        this.setStartTime(startTime)
        this.setEndTime(endTime)
        this.setStatus(status)
        this.setRoomId(roomId)
    }

    setName(_name) {
        //Validation
        this.name = _name
    }
    getName() {
        return this.name
    }

    setEdpCode(_edpCode) {
        //Validation
        this.edpCode = _edpCode
    }
    getEdpCode() {
        return this.edpCode
    }

    setAssignedWeek(_assignedWeek) {
        //Validation
        this.assignedWeek = _assignedWeek
    }
    getAssignedWeek() {
        return this.assignedWeek
    }

    setStartTime(_startTime) {
        //Validation
        this.startTime = _startTime
    }
    getStartTime() {
        return this.startTime
    }

    setEndTime(_endTime) {
        //Validation
        this.endTime = _endTime
    }
    getEndTime() {
        return this.endTime
    }

    setStatus(_status) {
        //Validation
        this.status = _status
    }
    getStatus() {
        return this.status
    }

    setRoomId(_roomId) {
        //Validation
        this.roomId = _roomId
    }
    getRoomId() {
        return this.roomId
    }
}

const subjectConverter = {
    toFirestore: (subject) => {
        return {
            name: subject.name,
            edpCode: subject.edpCode,
            assignedWeek: subject.assignedWeek,
            startTime: subject.startTime,
            endTime: subject.endTime,
            status: subject.status,
            roomId: subject.roomId
        }
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options)
        return new Subject(
            data.name,
            data.edpCode,
            data.assignedWeek,
            data.startTime,
            data.endTime,
            data.status,
            data.roomId
        )
    }
}

module.exports = {Subject, subjectConverter}