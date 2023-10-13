// I just realized that this must be in the client side...

const { clientApp, adminApp } = require('../config')
const { 
    getAuth: firebaseAdminAuth,
} = require("firebase-admin/auth")
const {
    getAuth: firebaseClientAuth,
    EmailAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} = require("firebase/auth")

const adminAuth = firebaseAdminAuth(adminApp);
const clientAuth = firebaseClientAuth(clientApp)

module.exports = {
    adminAuth,
    clientAuth,
    EmailAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
}