const { app } = require('../config')
const { 
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} = require("firebase/auth")

const auth = getAuth(app);

module.exports = {auth}