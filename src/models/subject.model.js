class Subject {
    constructor(name, edpCode, type, units, creationDate, createdBy, verifiedBy, status) {
        this.setName = name;
        this.setEdpCode = edpCode;
        this.setType = type;
        this.setUnits = units;
        this.setCreationDate = creationDate;
        this.setCreatedBy = createdBy;
        this.setVerifiedBy = verifiedBy;
        this.setStatus = status;
    }

    set setName(_name) {
        this.name = _name;
    }
    get getName() {
        return this.name;
    }

    set setEdpCode(_edpCode) {
        this.edpCode = _edpCode;
    }
    get getEdpCode() {
        return this.edpCode;
    }

    set setType(_type) {
        this.type = _type;
    }
    get getType() {
        return this.type;
    }

    set setUnits(_units) {
        this.units = _units;
    }
    get getUnits() {
        return this.units;
    }

    set setCreationDate(_creationDate) {
        this.creationDate = _creationDate;
    }
    get getCreationDate() {
        return this.creationDate;
    }

    set setCreatedBy(_createdBy) {
        this.createdBy = _createdBy;
    }
    get getCreatedBy() {
        return this.createdBy;
    }

    set setVerifiedBy(_verifiedBy) {
        this.verifiedBy = _verifiedBy
    }
    get getVerifiedBy() {
        return this.verifiedBy;
    }

    set setStatus(_status) {
        this.status = _status
    }
    get getStatus() {
        return this.status;
    }
}

const subjectConverter = {
    toFirestore: (subject) => {
        return {
            name: subject.name,
            edpCode: subject.edpCode,
            type: subject.type,
            units: subject.units,
            creationDate: subject.creationDate,
            createdBy: subject.createdBy,
            verifiedBy: subject.verifiedBy,
            status: subject.status
        }
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options)
        return new Subject(
            data.name,
            data.edpCode,
            data.type,
            data.units,
            data.creationDate,
            data.createdBy,
            data.verifiedBy,
            data.status
        )
    }
}

module.exports = {Subject, subjectConverter}