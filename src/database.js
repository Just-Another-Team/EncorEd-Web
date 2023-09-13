//- Might change this to the controller side. - Gab from last month
//- Hmmm... about that one, Gab. - Gab from Sept 12, 2023

const { app } = require('../config')
const {
    getFirestore,
    collection,
    addDoc,
    doc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    query,
    where,
    Timestamp
} = require("firebase/firestore")

const db = getFirestore(app)
    
module.exports = {db, Timestamp, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc, collection, query, where}