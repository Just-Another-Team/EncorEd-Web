import { initializeApp, getApp } from 'firebase/app';
import { initializeAuth, getAuth, setPersistence, browserSessionPersistence, browserPopupRedirectResolver, browserLocalPersistence, indexedDBLocalPersistence } from 'firebase/auth';
import { getFirestore, onSnapshot, connectFirestoreEmulator } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBoKPIYalfZbmEQ22-l9yLmloSHRmXf5Z0",
    authDomain: "encored-bd6f8.firebaseapp.com",
    projectId: "encored-bd6f8",
    storageBucket: "encored-bd6f8.appspot.com",
    messagingSenderId: "408443509099",
    appId: "1:408443509099:web:4c1e39503588ce85f0942e",
    measurementId: "G-6KWCCF6EZL"
};

const FIREBASE_APP = initializeApp(firebaseConfig)

const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
    persistence: [browserSessionPersistence],
    popupRedirectResolver: browserPopupRedirectResolver
})

const db = getFirestore(FIREBASE_APP)

// connectFirestoreEmulator(db, '127.0.0.1', 8080)

export { FIREBASE_APP, FIREBASE_AUTH, getApp, getAuth, db, onSnapshot }