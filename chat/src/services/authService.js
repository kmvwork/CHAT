import firebase from "../firebase/index"

export  const SignInService = async (email, password)=> {
    try {
        const result = await firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
        return {
            response: result,
        };
    } catch (e) {
        console.log('error firebase')
        let errorCode = e.code;
        console.log(errorCode)
        let errorMessage = e.message;
        console.log(errorMessage)
        // throw new Error(e.message);
    }
}


export const SignUpService = async (email, password) => {
    try {
        const result = await firebase.auth().createUserWithEmailAndPassword(email, password)
            return {
            response: result
    }
} catch (e) {
        let errorCode = e.code;
        console.log(errorCode)
        let errorMessage = e.message;
        console.log(errorMessage)
    }
}


export const userUid = firebase.auth().onAuthStateChanged((user) => {

    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
         let uid = user.uid;

        // ...
    } else {
        console.log('NOT uid')
        // User is signed out
        // ...
    }
});

