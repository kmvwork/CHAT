import {createSlice} from "@reduxjs/toolkit";

export const usersSlice = createSlice({
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
        signIn: (state, action) => {
            const {email, password} = action.payload

            state.currentUser.email = email
            state.currentUser.password = password
            state.userLogged = true
        },
        signOut: (state) => {
            state.currentUser.email = ''
            state.currentUser.password = ''
            state.userLogged = false
        },
        addUser: (state, action) => {
            const {name, secondName, email, password} = action.payload
            state.users.push({
                name,
                secondName,
                email,
                password
            })
        }
    },
})

export const {signIn, signOut, addUser} = usersSlice.actions

export default usersSlice.reducer