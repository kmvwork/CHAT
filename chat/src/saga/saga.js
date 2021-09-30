import {takeLatest, all, call, put} from "redux-saga/effects";
import {RegisterUserService, SignInService} from "../API/firebase";


export function* workerRegistrationUser(action) {
    try {
        const {email, password} = action.payload
        const response = yield call(RegisterUserService, email, password);
        yield put({type: "user/signIn", response})
    } catch (error) {
        const errorMessage = error.message
        yield put({type: "user/signInError", errorMessage})
    }
}

export function* workerLoginUser({action}) {
    try {
        console.log('workerLoginUser')
        const {email, password} = action.payload
        const response = yield call(SignInService, email, password);
        yield put({type: "user/signIn", response})
    } catch (error) {
        const errorMessage = error.message
        yield put({type: "user/signInError", errorMessage})
    }
}

export function* watchLoginUser() {
    yield takeLatest('USER_LOGIN', workerLoginUser)
}

export function* watchRegistrationUser() {
    yield takeLatest('USER_Registration', workerRegistrationUser)
}

export default function* rootSaga() {
    yield all[watchLoginUser(), watchRegistrationUser()]
}