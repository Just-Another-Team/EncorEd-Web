// I just realized that this must be in the client side...

import {adminApp, clientApp} from '../config'
import {getAuth as firebaseAdminAuth} from 'firebase-admin/auth'
import {
    getAuth as firebaseClientAuth,
    EmailAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "firebase/auth"

const adminAuth = firebaseAdminAuth(adminApp);
const clientAuth = firebaseClientAuth(clientApp)

export {
    adminAuth,
    clientAuth,
    EmailAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
}