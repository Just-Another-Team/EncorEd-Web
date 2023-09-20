const {
    db,
    addDoc,
    setDoc,
    getDoc,
    getDocs,
    doc,
    collection,
    updateDoc,
    deleteDoc,
    query,
    serverTimestamp,
} = require('../database');
const {
    User,
    userConverter
} = require("../models/user.model");
const { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('../authentication');

const userCollection = collection(db, "users").withConverter(userConverter)

const addUser = async (req, res) => {

    try{
        const {firstName, lastName, email, userName, password } = req.body;
    
        const userInput = {
            firstName,
            lastName,
            userName,
            joinDate: serverTimestamp(),
            addedBy: null,
            isAdmin: true,
            isAlumni: false,
            status: "Open"
        }

        /* Middleware shenanigans must be located here */

        const userVal = new User(
            userInput.firstName,
            userInput.lastName,
            userInput.email,
            userInput.userName,
            userInput.password,
            userInput.addedBy,
            userInput.joinDate,
            userInput.isAdmin,
            userInput.isAlumni,
            userInput.status
        )
        
        //const docRef = await addDoc(userCollection, userVal)
        const docRef = doc(db, "users", email).withConverter(userConverter)
    
        await createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                console.log("Successfully Added - Authentication")
            })
            .catch(error => {
                // res.status(400).json({error: "Controller Error", type: "Authentication", message: error.message})
                throw {type: "Authentication", message: error.message}
            })

        await setDoc(docRef, userVal)
            .then(() => {
                console.log("Successfully Added - Firestore")
            })
            .catch(error => {
                // res.status(400).json({error: "Controller Error", type: "Firestore", message: error.message})
                throw {type: "Firestore", message: error.message}
            })
    
        res.status(200).json({id: docRef.id, message: "User added successfully"})
    }
    catch(e) {
        res.status(400).json({error: "Controller Error", type: e.type, message: e.message})
    }

}

const updateUser = async (req, res) => {
    const id = req.params.id;

    console.log(id);

    try{
        const userSnapshot = await doc(db, `users/${id}`).withConverter(userConverter);

        const userVal = new User(
            req.body.firstName,
            req.body.lastName,
            req.body.email,
            req.body.userName,
            req.body.password,
            req.body.isadmin,
            req.body.isalumni,
            req.body.status   
        );

        updateDoc(userSnapshot, {
            firstName: userVal.getFirstName,
            lastName: userVal.getLastName,
            email: userVal.getEmail,
            userName: userVal.getUsername,
            password: userVal.getPassword,
            isadmin: userVal.getAdmin,
            isalumni: userVal.getAlumni,
            status: userVal.getStatus,
        })

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
        const userDoc = doc(db, "users", id).withConverter(userConverter); //Can be three parameters. See docs
        await deleteDoc(userDoc);

        res.status(200).json("Data delete successfully")
    }
    catch(e) {
        res.status(400).json(`Error Occured: ${e}`)
    }
}

const viewAllUser = async (req, res) => {
    
    const users = []

    try {
        const getUserDocs = await getDocs(userCollection);

        //Can be better
        // const q = query(userCollection, where("lastName", "==", "Aguilar"));

        // const getQuery = await getDocs(q)

        // getQuery.forEach((doc, ind) => {
        //     console.log(doc.data())
        // })

        getUserDocs.forEach((doc, ind) => {
            users.push({
                id: doc.id,
                ...doc.data()
            })
        });

        res.status(200).json(users);    
    }
    catch (e) {
        res.status(400).json({error: true, message: e.message})
    }
}

const viewUser = async (req, res) => {
    const id = req.params.id;

    const userRef = doc(db, "users", id).withConverter(userConverter)
    const userDoc = await getDoc(userRef);

    try {
        res.status(200).json(userDoc.data())
    }
    catch (e) {
        res.status(400).json({error: "Error", message: e.message})
    }
}

const signIn = async (req, res) => {
    console.log(req.body)

    //If input is not an email

    await signInWithEmailAndPassword(auth, req.body.emailUserName, req.body.password)
        .then((result) => {
            console.log(result);
            res.status(200).json("It's good")
        })
        .catch((err) => {
            console.log(err)
            res.status(400).json({message: "A Big Bruh happened"})
        })
}

//For Login -- Deprecated
const userFound = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    let user = {}

    console.log(`${username} | ${password}`)

    try {
        //Can be better
        const validateQuery = query(userCollection, where("userName", "==", username)); 
        const getQuery = await getDocs(validateQuery)

        res.status(200).json({
            message: getQuery.empty ? "Username can be added" : "Username cannot be added - Username already exists"
        })
    }
    catch (e) {
        res.status(400).json({error: "Controller Error", message: e.message})
    }
}

//for registration only -- Deprecated
const verifyUser = async (req, res) => {
    const email = req.body.email

    try{
        const docRef = doc(db, "users", email)
        const docSnap = await getDoc(docRef)

        if(docSnap.exists()) {
            console.log(docSnap.data())
            return res.status(400).json({
                message: "Account cannot be added - already exists"
                
            })
        }
        else{
            console.log("No Document")
            res.status(200).json({ message: "Account can be added" })
        }
    }
    catch (e){
        res.status(400).json({error: "Error verifying", message: e.message})
    }
}

module.exports = {
    addUser,
    updateUser,
    deleteUser,
    viewUser,
    viewAllUser,
    signIn,
    userFound,
    verifyUser
}