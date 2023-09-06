//Might change this to the controller side

const { initializeApp } = require("firebase/app")
const { firebaseConfig } = require('../config')
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
    where
} = require("firebase/firestore")


const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

module.exports = {db, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc, collection, query, where}