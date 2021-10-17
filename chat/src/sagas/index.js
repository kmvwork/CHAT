import {takeLatest, all, call, put} from "redux-saga/effects";
import {SignInService, SignUpService, userUid} from "../services/authService"
import {createAction} from "@reduxjs/toolkit";
import {addUser, signIn, signInError} from "../redux/userSlice";
import {toast} from "react-toastify";
import firebase from "../firebase";
import {getData, getDataSnapshot} from "../services/getDatabase";

const rememberMe = (remember) => {
    if (remember) {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                let uid = user.uid;
                localStorage.setItem('uid', uid)
            } else {
                console.log('NOT uid')
            }
        });
    }
}

export const loginUserAsync = createAction('user/loginUserAsync');
export const registrationUserAsync = createAction('user/registrationUserAsync');

export function* workerRegistrationUser(action) {
    try {
        const {email, password, name, secondName} = action.payload
        const response = yield call(SignUpService, email, password);

        let uid = response.response.user.uid

        yield put(addUser({email, password, name, secondName, uid}))
    } catch (error) {
        const errorMessage = error.message
        yield put(signInError(errorMessage))
    }
}

export function* workerLoginUser(action) {
    try {
        const {email, password, remember} = action.payload
        console.log('remember', remember)
        console.log('values', action.payload)

        const response = yield call(SignInService, email, password);
        const uidSave = yield call(rememberMe, remember)

        let uid = response.response.user.uid
        console.log('getData')
        // const data = yield call(getData, uid)
        // const data = yield call(getDataSnapshot, uid)



        yield put(signIn({email, password, uid, remember}))

        toast.success(' Вход в систему!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    } catch (error) {
        toast.error('Не удалсоь войти!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        const errorMessage = error.message
        yield put(signInError(errorMessage))
    }
}

export function* watchLoginUser() {
    yield takeLatest(loginUserAsync, workerLoginUser)
}

export function* watchRegistrationUser() {
    yield takeLatest(registrationUserAsync, workerRegistrationUser)
}

export default function* rootSaga() {
    yield all([watchLoginUser(), watchRegistrationUser()])

}