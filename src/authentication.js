const { app } = require('../config')
const { 
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    fetchSignInMethodsForEmail
} = require("firebase/auth")

const auth = getAuth(app);

module.exports = {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    fetchSignInMethodsForEmail
}