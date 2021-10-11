import {createSlice} from "@reduxjs/toolkit";

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
        signIn: (state, action) => {
            const setCurrentUser = state.users.filter(item => {
                return item.email === action.payload.email
            })

            state.currentUser = setCurrentUser[0]
            state.userLogged = true
        },
        signOut: (state) => {
            state.userLogged = false
            state.currentUser.uid = ''
            state.currentUser.name = ''
            state.currentUser.secondName = ''
            state.currentUser.email = ''
            state.currentUser.password = ''
        },
        addUser: (state, action) => {
            const {name, secondName, email, password, uid} = action.payload
            state.users.push({
                uid,
                name,
                secondName,
                email,
                password
            })
        },
        passwordChange: (state, action) => {
            state.users.filter(item => {
                return item.email === action.payload.email ? item.password = action.payload.password : null
            })
        }
    },
})

export const {signIn, signOut, addUser, passwordChange} = usersSlice.actions

export default usersSlice.reducer