import firebase from "firebase"

export  const SignInService = async (email, password)=> {
    try {
        const result = await firebase
            .auth()
            .signInWithEmailAndPassword(email, password);
        return {
            response: result,
        };
    } catch (e) {
        throw new Error(e.message);
    }
}