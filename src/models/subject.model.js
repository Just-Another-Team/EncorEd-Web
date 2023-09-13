class Subject {
    constructor(name, edpCode, type, units, creationDate, createdBy, verifiedBy, status) {
        this.setName(name);
        this.setEdpCode(edpCode);
        this.setType(type);
        this.setUnits(units);
        this.setCreationDate(creationDate);
        this.setCreatedBy(createdBy);
        this.setVerifiedBy(verifiedBy);
        this.setStatus(status);
    }

    setName(_name) {
        this.name = _name;
    }
    getName() {
        return this.name;
    }

    setEdpCode(_edpCode) {
        this.edpCode = _edpCode;
    }
    getEdpCode() {
        return this.edpCode;
    }

    setType(_type) {
        this.type = _type;
    }
    getType() {
        return this.type;
    }

    setUnits(_units) {
        this.units = _units;
    }
    getUnits() {
        return this.units;
    }

    setCreationDate(_creationDate) {
        this.creationDate = _creationDate;
    }
    getCreationDate() {
        return this.creationDate;
    }

    setCreatedBy(_createdBy) {
        this.createdBy = _createdBy;
    }
    getCreatedBy() {
        return this.createdBy;
    }

    setVerifiedBy(_verifiedBy) {
        this.verifiedBy = _verifiedBy
    }
    getVerifiedBy() {
        return this.verifiedBy;
    }

    setStatus(_status) {
        this.status = _status
    }
    getStatus() {
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