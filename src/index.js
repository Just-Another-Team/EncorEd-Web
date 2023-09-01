const {db, firestore} = require('./database');
const express = require('express')
const cors = require('cors');

const app = express();
const port = 4000;

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.json("Hello World!")
})

//Add Document
app.post("/add", (req, res) => {
    console.log(req.body);

    try{
        //If document does not exist, it would autogenerate an id
        //collection([database], [collection name])
        const docRef = firestore.addDoc(firestore.collection(db, "users"), {
            name: req.body.name,
            type: req.body.type
        })

        res.json(docRef)
    }
    catch(e) {
        res.json(`Error Occured: ${e}`)
    }
})

//Select all docs. Not Data (WIP)
app.get("/users", async (req, res) => {
    const querySnapshot = await firestore.getDocs(firestore.collection(db, "users"));

    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    });
})

//Select document by Id. Not Data (WIP)
app.get("/user", async (req, res) => {
    const querySnapshot = await firestore.doc(db, "users/HBxdwkNblmpBcItIRY8X")

    console.log(querySnapshot);
})

//Update by ID
app.put("/user/:id", async (req, res) => {
    const id = req.params.id;

    try{
        const querySnapshot = await firestore.doc(db, `users/${id}`); //Can be three parameters. See docs

        firestore.updateDoc(querySnapshot, {
            name: req.body.name,
            type: req.body.type
        })

        res.json("Data updated successfully")
    }
    catch(e) {
        res.json(`Error Occured: ${e}`)
    }
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});