import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
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
    }
})

export const {add} = userSlice.actions

export default userSlice.reducer