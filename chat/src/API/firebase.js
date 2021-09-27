// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";

import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import firebase from "firebase/compat";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCIAmpyi1_iDphdkAszKK9OhyZdjaMXEEc",
    authDomain: "react-chat-e80e2.firebaseapp.com",
    projectId: "react-chat-e80e2",
    storageBucket: "react-chat-e80e2.appspot.com",
    messagingSenderId: "517626893722",
    appId: "1:517626893722:web:8254f53946e54b0c2f9623"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const RegisterUserService = async (email, password) => {
    const result = await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            let user = userCredential.user;
            return {
                result: result,
            }
            // ...
        })
        .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            throw new Error(errorMessage)
        });
}

export const SignInService = async (email, password) => {
    const result = await firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            let user = userCredential.user;
            // ...
            return {
                result: result,
            }
        })
        .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            throw new Error(errorMessage)
        });
}
