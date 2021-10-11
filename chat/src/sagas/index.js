import {takeLatest, all, call, put} from "redux-saga/effects";
// import {
// RegisterUserService,
// SignInService} from "../firebase/";
import {SignInService} from "../services/authService"
import {createAction} from "@reduxjs/toolkit";
import {signIn} from "../redux/userSlice";


// export function* workerRegistrationUser(action) {
//     try {
//         const [email, password] = action
//         const response = yield call(RegisterUserService, {email, password});
//         yield put({type: "user/signIn", response})
//     } catch (error) {
//         const errorMessage = error.message
//         yield put({type: "user/signInError", errorMessage})
//     }
// }

export const loginUserAsync = createAction('user/signIn');

export function* workerLoginUser(action) {
    try {
        console.log('rrr')
        const {email, password} = action
        const response = yield call(SignInService, email, password);
        // yield put({type: "user/signIn", response})
        yield put(signIn(response))

    } catch (error) {
        const errorMessage = error.message
        yield put({type: "user/signInError", errorMessage})
    }
}

export function* watchLoginUser() {
    yield takeLatest(loginUserAsync, workerLoginUser)
}

// export function* watchRegistrationUser() {
//     yield takeLatest('USER_Registration', workerRegistrationUser)
// }

export default function* rootSaga() {
    console.log('rootsaga')
    yield all[watchLoginUser()
        // , watchRegistrationUser()

        ]
}