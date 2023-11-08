import dotenv from 'dotenv'
dotenv.config() //{ path: './.env' }

import * as admin from 'firebase-admin'
import {initializeApp as adminInitializeApp} from 'firebase-admin/app'
import {initializeApp as clientInitializeApp} from 'firebase/app'

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

export { adminApp, clientApp, admin }


  