import {takeLatest, all, call, put} from "redux-saga/effects";
import {SignInService, SignUpService, userUid} from "../services/authService"
import {createAction} from "@reduxjs/toolkit";
import {addUser, signIn} from "../redux/userSlice";
import {toast} from "react-toastify";


export function* workerRegistrationUser(action) {
    try {
        const {email, password, name, secondName} = action.payload
        const response = yield call(SignUpService, email, password);

        let uid = response.response.user.uid

        yield put(addUser({email, password, name, secondName, uid}))
    } catch (error) {
        const errorMessage = error.message
        yield put({type: "user/signInError", errorMessage})
    }
}

export const loginUserAsync = createAction('user/loginUserAsync');
export const registrationUserAsync = createAction('user/registrationUserAsync');

export function* workerLoginUser(action) {
    try {
        const {email, password} = action.payload

        const response = yield call(SignInService, email, password);

        // let uid = response.response.user.uid

        toast.success(' Вход в систему!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        let uid = response.response.user.uid
        console.log('uid!', uid)

        yield put(signIn({email, password, uid}))

    } catch (error) {
        const errorMessage = error.message
        yield put({type: "user/signInError", errorMessage})
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