import firebase from 'firebase'

export const firebaseConfig = {
    apiKey: "AIzaSyCIAmpyi1_iDphdkAszKK9OhyZdjaMXEEc",
    authDomain: "react-chat-e80e2.firebaseapp.com",
    projectId: "react-chat-e80e2",
    storageBucket: "react-chat-e80e2.appspot.com",
    messagingSenderId: "517626893722",
    appId: "1:517626893722:web:8254f53946e54b0c2f9623"
};

firebase.initializeApp(firebaseConfig)

export default firebase
