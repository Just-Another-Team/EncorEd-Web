const {
    db,
    addDoc,
    getDoc,
    getDocs,
    doc,
    collection,
    updateDoc,
    deleteDoc
} = require('../database');
const {
    User,
    userConverter
} = require("../models/user.model")

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

        res.status(200).json({id: docRef.id, message: "User added successfully"})
    }
    catch(e) {
        res.status(400).json({error: e.message})
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
            req.body.admin,
            req.body.alumni,
            req.body.status   
        );

        updateDoc(userSnapshot, {
            firstName: userVal.getFirstName(),
            lastName: userVal.getLastName(),
            email: userVal.getEmail(),
            userName: userVal.getUsername(),
            password: userVal.getPassword(),
            isadmin: userVal.getAdmin(),
            isalumni: userVal.getAdmin(),
            status: userVal.getStatus(),
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
    
    const users = []

    try {
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

// Sorting Test
// users.sort((first, last) => {
//     let firstLName = first.lastName.toLowerCase()
//     let lastLName = last.lastName.toLowerCase()

//     console.log(`${firstLName} | ${lastLName}`)

//     //Ascending Order
//     if (firstLName < lastLName) return -1
//     if (lastLName < firstLName) return 1

//     //Descencding Order conditions
//     //if (firstLName > lastLName) return -1
//     //if (lastLName > firstLName) return 1

//     return 0
// })

module.exports = {addUser, updateUser, deleteUser, viewUser, viewAllUser}