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
const { userRoleCollection } = require('./userRole.controller');
const { UserRole } = require('../models/userRole.model');

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
        const userDoc = userCollection.doc(email).withConverter(userConverter)
            
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
        const userDoc = userCollection.doc(id);

        const user = await userDoc.get();
        //console.log(red.body)
        const userVal = new User(
            user.data().institution,
            req.body.firstName,
            req.body.lastName,
            req.body.email,
            user.data().userName,
            req.body.password,
            user.data().addedBy,
            user.data().joinDate,
            user.data().isalumni,
            user.data().status
        );

        const uid = await adminAuth.getUserByEmail(user.id)
            .then(userRecord => userRecord.toJSON().uid)
            .catch(error => {throw error})

        //Update Authentication
        await adminAuth.updateUser(uid, {
            email: req.body.email !== id ? userVal.getEmail : undefined,
            password: userVal.getPassword.length > 0 ? userVal.getPassword : undefined,
            displayName: `${userVal.getFirstName} ${userVal.getLastName}`,
        })
            .then(() => {
                console.log("Successfully Updated Authentication - Firebase Auth")
            })
            .catch((error) => {throw {type: "Authentication", error: error}})
            
        //Update Firestore
        await userCollection.doc(userVal.getEmail).set(userVal)

        if (id !== req.body.email)
            await userDoc.delete()

        const assignedRoleDocs = await userRoleCollection.where('userId', '==', id).get();

        if (assignedRoleDocs.empty)
            throw {message: "User Id not found"}

        //Get Roles 
        const assignedRoles = assignedRoleDocs.docs.map((userRole) => {
            return userRole.data()
        })

        //Delete old user role and assign new
        assignedRoles.forEach(async (userRole) => {
            let newUserRole = new UserRole(
                userVal.getEmail,
                userRole._roleId
            )
            
            const newId = `${newUserRole._userId}-${newUserRole._roleId}`
            const oldId = `${id}-${userRole._roleId}`

            await userRoleCollection.doc(newId).set(newUserRole)
            if (newId !== oldId)
                await userRoleCollection.doc(oldId).delete()
        })

        //Assign New

        //Update User Role
        //await userRoleCollection.doc(`${id}-${userRole.roleId}`).update()

        res.status(200).json("Data updated successfully")
    }
    catch(e) {
        res.status(400).json({name: "User", error: "Controller Error", control: "Update", type: e.type, message: e.message, ...e})
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

const viewAllUsersByInstitution = async (req, res) => {
    try {
        const getUserDocs = await userCollection.where('institution', '==', req.params.institution).get(); 

        const docRef = getUserDocs.docs.map(doc => ({id:doc.id, ...doc.data()}))
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

        if (!userRef.exists)
            throw {code: 'firestore/missing-email', message: `User with id: ${id} does not exist.`}
        //console.log(userRef.data())
        //const userDoc = await getDoc(userRef);

        res.status(200).json({id: userRef.id, ...userRef.data()})
    }
    catch (e) {
        res.status(400).json({error: "Error", code: e.code, message: e.message})
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
            addedBy: "admin",
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

        const userRec = await adminAuth.createUser({
            email: userVal.getEmail,
            password: userVal.getPassword,
            displayName: `${userVal.getFirstName} ${userVal.getLastName}`,
        })

        //const userDoc = await db.doc(`/users/${userRec.email}`).withConverter(userConverter).create(userVal)
        await userCollection.doc(userRec.email).set(userVal).then((result) => {console.log(result)})

        const userDoc = await userCollection.doc(userRec.email).get()

        const user = {
            id: userDoc.id,
            displayName: userRec.displayName,
            email: userRec.email,
            ...userDoc.data()
        }

        //What does this do?
        //await adminAuth.setCustomUserClaims(user.uid, { role });
        res.status(200).json({type: "Admin", user, message: "Account created successfully"});
    }
    catch(e) {
        res.status(400).json({name: "User", error: "Controller Error", type: "Sign Up", message: e.message, code: e.code})
    }
}

// Must generate a custom token
const logIn = async (req, res) => {
    try {

    } catch (error) {
        res.status(400).json({name: "User", error: "Controller Error", type: e.type, message: e.message, code: e.code})
    }
}

const assignInstitution = async (req, res) => {
    try {
        const { institution, userId } = req.body;

        const userVal = new User()
        userVal.setInstitution = institution

        await userCollection.doc(`${userId}`).update({institution: userVal.getInstitution})
            // .then(() => {
            //     res.status(200).json({message: "Assign institution success"})
            // })
            // .catch((error) => {
            //     throw {message: error.message}
            // })

        res.status(200).json({message: "Assign institution success"})
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

        //Assign role as superadmin
        
        res.status(200).json({type: "App Admin", message: "Account created successfully"});
    }
    catch(e) {
        res.status(400).json({name: "User", error: "Controller Error", type: e.type, message: e.message, code: e.code})
    }
}


module.exports = {
    userCollection,
    addUser,
    updateUser,
    deleteUser,
    viewUser,
    viewAllUser,
    viewAllUsersByInstitution,
    //Institutional Admin
    signUp,
    assignInstitution,
    //Application Admin
    addAppAdmin,
}