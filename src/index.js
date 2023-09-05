const {db, addDoc, getDoc, getDocs, doc, collection, updateDoc, deleteDoc} = require('./database');
const express = require('express')
const cors = require('cors');

const app = express();
const port = 4000;

app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, res.method)
    next()
})

//All of this can be used in user router
const userRouter = require("./routes/user")
app.use("/user", userRouter)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});