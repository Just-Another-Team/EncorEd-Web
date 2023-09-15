class Event {
    constructor(name, desc, creationDate, createdBy, verifiedBy, status) {
        this.setName = name
        this.setDesc = desc
        this.creationDate = creationDate
        this.createdBy = createdBy
        this.verifiedBy = verifiedBy
        this.status = status
    }

    set setName(_name) {
        this.name = _name
    }
    get getName() {
        return this.name
    }

    set setDesc(_desc) {
        this.desc = _desc
    }
    get getDesc() {
        return this.desc
    }

    set setCreationDate(_creationDate) {
        this.creationDate = _creationDate
    }
    get getCreationDate() {
        return this.creationDate
    }

    set setCreatedBy(_createdBy) {
        this.createdBy = _createdBy
    }
    get getCreatedBy() {
        return this.createdBy
    }

    set setVerifiedBy (_verfiedBy) {
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
}

const eventConverter = {
    toFirestore: (event) => {
        return {
            name: event.name,
            desc: event.desc,
            creationDate: event.creationDate,
            createdBy: event.createdBy,
            verifiedBy: event.verifiedBy,
            status: event.status
        }
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options)
        
        return new Event(
            data.name,
            data.desc,
            data.creationDate,
            data.createdBy,
            data.verifiedBy,
            data.status
        )
    }
}

module.exports = {Event, eventConverter}