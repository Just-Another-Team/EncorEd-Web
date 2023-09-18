require('dotenv').config();

const { initializeApp } = require("firebase/app")

const firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.SENDERIND,
    appId: process.env.APPID,
    measurementId: process.env.MEASUREMENTID
};

const app = initializeApp(firebaseConfig);

module.exports = {app}


  