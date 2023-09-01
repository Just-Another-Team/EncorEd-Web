const firebase = require("firebase/app");
const firestore = require("firebase/firestore");
const {serviceAccount, firebaseConfig } = require('../config')

const app = firebase.initializeApp(firebaseConfig)
const db = firestore.getFirestore(app)

module.exports = {db, firestore}