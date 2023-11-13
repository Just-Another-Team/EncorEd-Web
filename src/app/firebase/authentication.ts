import app from "./config"
import {
    getAuth,
    EmailAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithCustomToken,
    onAuthStateChanged,
    signOut,
    reauthenticateWithCredential
} from "firebase/auth"

const auth = getAuth(app)


export {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithCustomToken,
    signOut,
    onAuthStateChanged,
    reauthenticateWithCredential,
    EmailAuthProvider,
}