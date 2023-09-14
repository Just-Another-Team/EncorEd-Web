// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoKPIYalfZbmEQ22-l9yLmloSHRmXf5Z0",
  authDomain: "encored-bd6f8.firebaseapp.com",
  projectId: "encored-bd6f8",
  storageBucket: "encored-bd6f8.appspot.com",
  messagingSenderId: "408443509099",
  appId: "1:408443509099:web:4c1e39503588ce85f0942e",
  measurementId: "G-6KWCCF6EZL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth }