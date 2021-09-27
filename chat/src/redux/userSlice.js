import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userLogged: false,
        currentUser: {
            email: '',
            password: ''
        },
        users: [
            {
                name: 'Max',
                secondName: 'Ivanov',
                email: 'max@gmail.com',
                password: '123!'
            }
        ]
    },
    reducers: {
        add: (state, action) => {
            const {email, password} = action.payload
            console.log('add')

            state.currentUser.email = email
            state.currentUser.password = password
        },
        signIn:(state, action) => {
            const {email, password} = action.payload
            console.log('entries')

            state.userLogged = true
            state.currentUser.email = email
            state.currentUser.password = password
        },
        signOut:(state) => {
            state.userLogged = false

            state.currentUser.email = ''
            state.currentUser.password = ''
        },
        signInError:(state,payload) => {
            state.userLogged = false
        }
    }
})

export const {add} = userSlice.actions

export default userSlice.reducer