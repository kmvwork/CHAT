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
        users: [
            {
                uid: '1',
                name: 'Max',
                secondName: 'Ivanov',
                email: 'max@gmail.com',
                password: '123!'
            },
            {
                uid: '2',
                name: 'Lex',
                secondName: 'Smith',
                email: 'lex@gmail.com',
                password: '124!'
            },
        ]
    },
    reducers: {
        // signIn: (state, action) => {
        //     const setCurrentUser = state.users.filter(item => {
        //         return item.email === action.payload.email
        //     })
        //
        //     state.currentUser = setCurrentUser[0]
        //     state.userLogged = true
        // },
        // signOut: (state) => {
        //     state.userLogged = false
        //     state.currentUser.uid = ''
        //     state.currentUser.name = ''
        //     state.currentUser.secondName = ''
        //     state.currentUser.email = ''
        //     state.currentUser.password = ''
        // },
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

        signIn:(state, action) => {
            const {email, password, uid} = action.payload

            state.userLogged = true
            state.currentUser.email = email
            state.currentUser.password = password
            state.currentUser.uid = uid
        },
        signOut:(state) => {
            state.userLogged = false

            state.currentUser.email = ''
            state.currentUser.password = ''
            state.currentUser.uid = ''
        },
        signInError:(state,payload) => {
            console.log('error')
            state.userLogged = false
        }
    },
})

export const {signIn, signOut, addUser, passwordChange} = usersSlice.actions

export default usersSlice.reducer