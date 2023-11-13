import * as firebase from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyBoKPIYalfZbmEQ22-l9yLmloSHRmXf5Z0",
    authDomain: "encored-bd6f8.firebaseapp.com",
    projectId: "encored-bd6f8",
    storageBucket: "encored-bd6f8.appspot.com",
    messagingSenderId: "408443509099",
    appId: "1:408443509099:web:4c1e39503588ce85f0942e",
    measurementId: "G-6KWCCF6EZL"
};

const app = firebase.initializeApp(firebaseConfig)

export default app