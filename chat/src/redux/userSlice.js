import {createSlice} from "@reduxjs/toolkit";
import {userUid} from "../services/authService";

export const usersSlice = createSlice({
    name: 'user',
    initialState: {
        userLogged: false,
        currentUser: {
            uid: '',
            name: '',
            secondName: '',
            email: '',
            password: '',
        },
        userSignInError: {
            error: false,
            message: ''
        },
        remember: false

    },
    reducers: {
        addUser: (state, action) => {
            const {name, secondName, email, password, uid} = action.payload

            state.userLogged = true
            state.currentUser.email = email
            state.currentUser.password = password
            state.currentUser.uid = uid

        },
        passwordChange: (state, action) => {
            state.users.filter(item => {
                return item.email === action.payload.email ? item.password = action.payload.password : null
            })
        },

        signIn: (state, action) => {
            const {email, password, uid, remember} = action.payload

            state.userLogged = true
            state.remember = remember
            state.currentUser.email = email
            state.currentUser.password = password
            state.currentUser.uid = uid
            state.userSignInError.error = false
        },
        signOut: (state) => {
            state.userLogged = false
            state.currentUser.email = ''
            state.currentUser.password = ''
            state.currentUser.uid = ''
        },
        signInError: (state, action) => {
            console.log('action.payload', action.payload.errorMessage)

            state.userLogged = false
            state.userSignInError.error = true
        }
    },
})

export const {signIn, signOut, addUser, passwordChange, signInError} = usersSlice.actions

export default usersSlice.reducer