class Institution {
    //Add created by attribute

    constructor(name, desc, creationDate, status) {
        this.setName = name
        this.setDesc = desc
        this.setCreationDate = creationDate
        this.setStatus = status
    }

    set setName(_name) {
        this.name = _name;
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

    set setStatus(_status) {
        this.status = _status
    }
    get getStatus() {
        return this.status
    }
}

const institutionConverter = {
    toFirestore: (institution) => {
        return {
            name: institution.name,
            desc: institution.desc,
            creationDate: institution.creationDate,
            status: institution.status
        }
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options)
        return new Institution(
            data.name,
            data.desc,
            data.creationDate,
            data.status
        )
    }
}

module.exports = {Institution, institutionConverter}