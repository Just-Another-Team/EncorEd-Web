const { app } = require('./database.js')
const { 
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} = require("firebase/auth")

const auth = getAuth(app);

module.exports = {auth, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut}