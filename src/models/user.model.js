const { serverTimestamp } = require("firebase/firestore")

class User {
    constructor (firstName, lastName, email, userName, password, addedBy, joinDate, isadmin, isalumni, status) {
        this.setFirstName = firstName
        this.setLastName = lastName
        //this.setEmail = email
        this.setUsername = userName
        //this.setPassword = password
        this.setAddedBy = addedBy
        this.setJoinDate = joinDate
        this.setAdmin = isadmin
        this.setAlumni = isalumni
        this.setStatus = status
    }

    get getFirstName() {
        return this.firstName
    }
    set setFirstName(_firstName) {
        //Validation
        this.firstName = _firstName;
    }

    get getLastName() {
        return this.lastName
    }
    set setLastName(_lastName) {
        //Validation
        this.lastName = _lastName;
    }

    // get getEmail() {
    //     return this.email
    // }
    // set setEmail(_email) {
    //     //Validation
    //     this.email = _email
    // }

    get getUsername() {
        return this.userName
    }
    set setUsername(_username) {
        //Validation
        this.userName = _username
    }

    // get getPassword() {
    //     return this.password
    // }
    // set setPassword(_password) {
    //     //Validation
    //     this.password = _password
    // }

    get getAddedBy() {
        return this.addedBy
    }
    set setAddedBy(_addedBy) {
        this.addedBy = _addedBy
    }

    get getJoinDate() {
        return this.joinDate
    }
    set setJoinDate(_joinDate) {
        this.joinDate = _joinDate
    }

    get getAdmin() {
        return this.isadmin
    }
    set setAdmin(_admin) {
        this.isadmin = _admin
    }

    get getAlumni() {
        return this.isalumni
    }
    set setAlumni(_alumni) {
        this.isalumni = _alumni
    }

    get getStatus() {
        return this.status
    }
    set setStatus(_status) {
        //Validation
        this.status = _status
    }

    toString() {
        return `${this.firstName}, ${this.lastName}, ${this.email}, ${this.userName}, ${this.status}` 
    }
}

//Converter must not have email and password
const userConverter = {
    toFirestore: (user) => {
        return {
            firstName: user.firstName,
            lastName: user.lastName,
            //email: user.email,
            userName: user.userName,
           // password: user.password,
            addedBy: user.addedBy,
            joinDate: user.joinDate,
            isadmin: user.isadmin,
            isalumni: user.isalumni,
            status: user.status,
            createdAt: serverTimestamp()
        }
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options)

        // Do this when initiate an auth
        // let user = new User();
        // user.setFirstName = data.firstName
        // user.setLastName = data.lastName
        // user.setUsername = data.userName

        // console.log(user);

        return new User(
            data.firstName,
            data.lastName,
            //data.email,
            data.userName,
            //data.password,
            data.addedBy,
            data.joinDate,
            data.isadmin,
            data.isalumni,
            data.status
        )
    }
}

module.exports = {User, userConverter}