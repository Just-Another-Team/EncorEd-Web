//- Might change this to the controller side. - Gab from last month
//- Hmmm... about that one, Gab. - Gab from Sept 12, 2023
//- This IS the server side

const { adminApp, admin } = require('../config')
// const {
//     getFirestore,
//     collection,
//     addDoc,
//     setDoc,
//     doc,
//     getDoc,
//     getDocs,
//     updateDoc,
//     deleteDoc,
//     query,
//     where,
//     onSnapshot,
//     serverTimestamp,
//     Timestamp
// } = require("firebase/firestore") - Do not use. Client side only
const {
    getFirestore,
    Timestamp,
    Query,
    Filter,
    FieldPath
} = require("firebase-admin/firestore")

const db = getFirestore(adminApp)

module.exports = {
    db,
    Timestamp,
    Query,
    Filter,
    FieldPath
}
module.exports.serverTimestamp = admin.firestore.FieldValue.serverTimestamp()