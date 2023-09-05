class User {
    constructor (firstName, lastName, email, userName, password, admin, alumni, status) {
        this.setFirstName(firstName)
        this.setLastName(lastName)
        this.setEmail(email)
        this.setUsername(userName)
        this.setPassword(password)
        this.setAdmin(admin)
        this.setAlumni(alumni)
        this.setStatus(status)
    }

    getFirstName() {
        return this.firstName
    }
    setFirstName(_firstName) {
        //Validation
        this.firstName = _firstName;
    }

    getLastName() {
        return this.lastName
    }
    setLastName(_lastName) {
        //Validation
        this.lastName = _lastName;
    }

    getEmail() {
        return this.email
    }
    setEmail(_email) {
        //Validation
        this.email = _email
    }

    getUsername() {
        return this.userName
    }
    setUsername(_username) {
        //Validation
        this.userName = _username
    }

    getPassword() {
        return this.password
    }
    setPassword(_password) {
        //Validation
        this.password = _password
    }

    getAdmin() {
        return this.admin
    }
    setAdmin(_admin) {
        this.admin = _admin
    }

    getAlumni() {
        return this.alumni
    }
    setAlumni(_alumni) {
        this.alumni = _alumni
    }

    getStatus() {
        return this.status
    }
    setStatus(_status) {
        //Validation
        this.status = _status
    }

    toString() {
        return `${this.firstName}, ${this.lastName}, ${this.email}, ${this.userName}, ${this.status}` 
    }
}

const userConverter = {
    toFirestore: (user) => {
        return {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            userName: user.userName,
            password: user.password,
            isadmin: user.admin,
            isalumni: user.alumni,
            status: user.status
        }
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options)
        return new User(
            data.firstName,
            data.lastName,
            data.email,
            data.userName,
            data.password,
            data.isadmin,
            data.isalumni,
            data.status
        )
    }
}

module.exports = {User, userConverter}