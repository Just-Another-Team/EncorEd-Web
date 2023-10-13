require('dotenv').config();

const admin = require("firebase-admin")
const { initializeApp: adminInitializeApp } = require("firebase-admin/app")
const { initializeApp: clientInitializeApp} = require("firebase/app")

// Will be used later... probably
// Definitely will be using it
// admin.initializeApp({
//     credential: admin.credential.cert("./serviceAccountKey/encored-bd6f8-firebase-adminsdk-oua3q-e9c83466f0.json")
// })

//  Must be in the frontend
const firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.SENDERIND,
    appId: process.env.APPID,
    measurementId: process.env.MEASUREMENTID
};

const adminApp = adminInitializeApp({
    credential: admin.credential.cert("./serviceAccountKey/encored-bd6f8-firebase-adminsdk-oua3q-e9c83466f0.json"),
    serviceAccountId: "firebase-adminsdk-oua3q@encored-bd6f8.iam.gserviceaccount.com",
});

const clientApp = clientInitializeApp(firebaseConfig)

module.exports = { adminApp, clientApp, admin }


  