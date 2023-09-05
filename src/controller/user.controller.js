const {db, addDoc, getDoc, getDocs, doc, collection, updateDoc, deleteDoc} = require('../database');
const {User, userConverter} = require("../models/user.model")

const userCollection = collection(db, "users").withConverter(userConverter)

const addUser = async (req, res) => {
    console.log(req.body);

    try{
        //If document does not exist, the document create itself and autogenerates an id
        //When the first data added, the database identifies its keys and use them as the template for the next add operation
        //Can use setDoc()

        const userVal = new User(
            req.body.firstName,
            req.body.lastName,
            req.body.email,
            req.body.userName,
            req.body.password,
            req.body.admin,
            req.body.alumni,
            req.body.status   
        );

        const docRef = await addDoc(userCollection, userVal)

        res.status(200).json({id: docRef.id, message: "Data added successfully"})
    }
    catch(e) {
        res.status(400).json({error: true, message: e.message})
    }
}

const updateUser = async (req, res) => {
    const id = req.params.id;

    console.log(id);

    try{
        const userSnapshot = await doc(db, `users/${id}`);

        const userVal = new User(
            req.body.firstName,
            req.body.lastName,
            req.body.email,
            req.body.userName,
            req.body.password,
            req.body.admin,
            req.body.alumni,
            req.body.status   
        );

        updateDoc(userSnapshot, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            userName: req.body.userName,
            password: req.body.password,
            isadmin: req.body.admin,
            isalumni: req.body.alumni,
            status: req.body.status,
        })

        res.status(200).json("Data updated successfully")
    }
    catch(e) {
        res.status(400).json(`Error Occured: ${e}`)
    }
}

const deleteUser = async (req, res) => {
    const id = req.params.id;

    try{
        const userDoc = doc(db, "users", id).withConverter(userConverter); //Can be three parameters. See docs

        deleteDoc(userDoc);

        res.status(200).json("Data delete successfully")
    }
    catch(e) {
        res.status(400).json(`Error Occured: ${e}`)
    }
}

const viewAllUser = async (req, res) => {
    const getUserDocs = await getDocs(userCollection);
    
    const users = {}

    try {
        getUserDocs.forEach((doc) => {
            users[doc.id] = {...doc.data()}
            console.log(doc.data())
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

module.exports = {addUser, updateUser, deleteUser, viewUser, viewAllUser}