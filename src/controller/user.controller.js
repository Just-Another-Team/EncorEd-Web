const {
    db,
    serverTimestamp,
} = require('../database');
const {
    User,
    userConverter
} = require("../models/user.model");
const {
    adminAuth,
    clientAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut, 
} = require('../authentication');

const userCollection = db.collection("/users/").withConverter(userConverter)

// Add User. Not Institutional Admins
// Okay maybe this goes for institutional admins already
const addUser = async (req, res) => {
    try{
        const { firstName, lastName, email, userName, password, addedBy } = req.body;
    
        const userInput = {
            firstName,
            lastName,
            email,
            userName,
            password,
            joinDate: serverTimestamp,
            addedBy,
            //I got beef with this, but at least it worked
            isAlumni: false,
            status: "Open"
        }

        let user = {};

        /* Middleware shenanigans must be located here */

        const userVal = new User(
            null,
            userInput.firstName,
            userInput.lastName,
            userInput.email,
            userInput.userName,
            userInput.password,
            userInput.addedBy,
            userInput.joinDate,
            userInput.isAlumni,
            userInput.status
        )

        await adminAuth.createUser({
            email: userVal.getEmail,
            password: userVal.getPassword,
            displayName: `${userVal.getFirstName} ${userVal.getLastName}`,
        })
            .then((userRec) => {
                console.log("Successfully Added - Authentication")

                user = userRec
            })
            .catch((error) => {
                console.log(error)
                throw {type: "Authentication", message: error.message, code: error.code}
            })

        // FIRESTORE FUNCTIONS - Possibly separate this one from the inner then... but idk
        const userDoc = db.doc(`/users/${email}`).withConverter(userConverter)
            
        await userDoc.create(userVal)
            .then((result) => {
                console.log("Successfully Added - Firestore")
            })
            .catch((error) => {
                throw {type: "Firestore", message: error.message}
            })

        
        //await adminAuth.setCustomUserClaims(user.uid, { role });
        res.status(200).json({type: "User", message: "Account created successfully"});
    }
    catch(e) {
        res.status(400).json({name: "User", error: "Controller Error", type: e.type, message: e.message, code: e.code})
    }
}

const updateUser = async (req, res) => {
    const id = req.params.id;

    //Update authentication as well

    try{
        const userDoc = db.doc(`/users/${id}`).withConverter(userConverter);

        //Dayum. It should be complete

        const userVal = new User(
            req.body.firstName,
            req.body.lastName,
            req.body.email,
            req.body.userName,
            req.body.password,
            req.body.addedBy,
            req.body.joinDate,
            req.body.isadmin,
            req.body.isalumni,
            req.body.status   
        );

        await userDoc.update(Object.assign({}, userVal))

        res.status(200).json("Data updated successfully")
    }
    catch(e) {
        res.status(400).json({error: e.message})
    }
}

const deleteUser = async (req, res) => {
    const id = req.params.id;

    // Instead of deleting the user completely, why not use the status?

    try{
        const userDoc = db.doc(`/users/${id}`).withConverter(userConverter);
        await userDoc.delete();

        res.status(200).json("Data delete successfully")
    }
    catch(e) {
        res.status(400).json(`Error Occured: ${e}`)
    }
}

const viewAllUser = async (req, res) => {
    try {
        const getUserDocs = await userCollection.get();

        const docRef = getUserDocs.docs.map(doc => ({id:doc.id, ...doc.data()}))
        console.log(docRef)

        res.status(200).json(docRef);    
    }
    catch (e) {
        res.status(400).json({error: true, message: e.message})
    }
}

const viewAllUserByInstitution = async (req, res) => {
    try {
        const getUserDocs = await userCollection.where('institution', '==', req.params.institution).get(); 

        const docRef = getUserDocs.docs.map(doc => doc.data())
        console.log(docRef)

        res.status(200).json(docRef);    
    }
    catch (e) {
        res.status(400).json({error: true, message: e.message})
    }
}

const viewUser = async (req, res) => {
    const id = req.params.id;

    try {
        const userRef = await userCollection.doc(id).get();
        //console.log(userRef.data())
        //const userDoc = await getDoc(userRef);

        res.status(200).json(userRef.data())
    }
    catch (e) {
        res.status(400).json({error: "Error", message: e.message})
    }
}

// Add Institutional admins
const signUp = async (req, res) => {
    try{
        const { firstName, lastName, email, userName, password } = req.body;
    
        const userInput = {
            firstName,
            lastName,
            email,
            userName,
            password,
            joinDate: serverTimestamp,
            addedBy: null,
            isAlumni: false,
            status: "Open"
        }

        let user = {};

        /* Middleware shenanigans must be located here */

        const userVal = new User(
            null,
            userInput.firstName,
            userInput.lastName,
            userInput.email,
            userInput.userName,
            userInput.password,
            userInput.addedBy,
            userInput.joinDate,
            userInput.isAlumni,
            userInput.status
        )

        console.log(userVal)

        await adminAuth.createUser({
            email: userVal.getEmail,
            password: userVal.getPassword,
            displayName: `${userVal.getFirstName} ${userVal.getLastName}`,
        })
            .then(async (userRec) => {
                console.log("Successfully Added - Authentication")
            })
            .catch((error) => {
                console.log(error)
                throw {type: "Authentication", message: error.message, code: error.code}
            })

        // FIRESTORE FUNCTIONS - Possibly separate this one from the inner then... but idk -- It should
        const userDoc = db.doc(`/users/${email}`).withConverter(userConverter)
                    
        await userDoc.create(userVal)
            .then((result) => {
                console.log("Successfully Added - Firestore")
            })
            .catch((error) => {
                throw {type: "Firestore", message: error.message}
            })

        //What does this do?
        //await adminAuth.setCustomUserClaims(user.uid, { role });
        res.status(200).json({type: "Admin", message: "Account created successfully"});
    }
    catch(e) {
        res.status(400).json({name: "User", error: "Controller Error", type: e.type, message: e.message, code: e.code})
    }
}

const assignInstitution = async (req, res) => {
    try {
        const { institution, userId } = req.body;

        const userVal = new User()
        userVal.setInstitution = institution

        const userRef = userCollection.doc(`${userId}`)

        await userRef.update({institution: userVal.getInstitution})
            .then(() => {
                res.status(200).json({message: "Debug success"})
            })
            .catch((error) => {
                throw {message: error.message}
            })
    } catch (error) {
        res.status(400).json({name: "Institution", error: "Controller Error", message: error.message})
    }
}

/* Application Admin */
const addAppAdmin = async (req, res) => {
    try{
        const { firstName, lastName, email, userName, password } = req.body;
    
        const userInput = {
            firstName,
            lastName,
            email,
            userName,
            password,
            joinDate: serverTimestamp,
            addedBy: null,
            isAlumni: false,
            status: "Open"
        }

        /* Middleware shenanigans must be located here */

        const userVal = new User(
            null,
            userInput.firstName,
            userInput.lastName,
            userInput.email,
            userInput.userName,
            userInput.password,
            userInput.addedBy,
            userInput.joinDate,
            userInput.isAlumni,
            userInput.status
        )

        await adminAuth.createUser({
            email: userVal.getEmail,
            password: userVal.getPassword,
            displayName: `${userVal.getFirstName} ${userVal.getLastName}`,
        })
            .then(async (userRec) => {
                console.log("Successfully Added - Authentication")
            })
            .catch((error) => {
                console.log(error)
                throw {type: "Authentication", message: error.message, code: error.code}
            })

        // FIRESTORE FUNCTIONS - Possibly separate this one from the inner then... but idk -- It should
        const userDoc = db.doc(`/users/${email}`).withConverter(userConverter)
                    
        await userDoc.create(userVal)
            .then((result) => {
                console.log("Successfully Added - Firestore")
            })
            .catch((error) => {
                throw {type: "Firestore", message: error.message}
            })

        //What does this do?
        //await adminAuth.setCustomUserClaims(user.uid, { role });
        res.status(200).json({type: "App Admin", message: "Account created successfully"});
    }
    catch(e) {
        res.status(400).json({name: "User", error: "Controller Error", type: e.type, message: e.message, code: e.code})
    }
}


module.exports = {
    addUser,
    updateUser,
    deleteUser,
    viewUser,
    viewAllUser,
    viewAllUserByInstitution,
    //Institutional Admin
    signUp,
    assignInstitution,
    //Application Admin
    addAppAdmin,
}