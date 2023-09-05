//Might change this to the controller side

const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc, doc, getDoc, getDocs, updateDoc, deleteDoc } = require("firebase/firestore");
const { firebaseConfig } = require('../config')

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

module.exports = {db, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc, collection}