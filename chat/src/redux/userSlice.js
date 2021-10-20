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
            const {remember, uid} = action.payload
            console.log('action.payload', action.payload)
            // console.log('payload', remember)

            state.userLogged = true
            state.currentUser.uid = uid
            state.remember = !!remember
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
        },
        getUserInfo: (state, action) => {
            console.log('action', action)
            const {email, password, uid, name, secondName} = action.payload
            state.currentUser.email = email
            state.currentUser.password = password
            state.currentUser.uid = uid
            state.currentUser.name = name
            state.currentUser.secondName = secondName
        }
    },
})

export const {signIn, signOut, addUser, passwordChange, signInError, getUserInfo} = usersSlice.actions

export default usersSlice.reducer