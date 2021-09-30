import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import firebase from "firebase/compat";

export const signIn = createAsyncThunk(
    'user/signIn',
    // async function (_, {rejectWithValue}) {
    //     try {
    //         const result = await fetch('')
    //         if (!result.ok) {
    //             throw new Error("SERVER ERROR")
    //         }
    //
    //         const data = await result.json()
    //
    //         return data
    //     } catch (error) {
    //         return rejectWithValue(error.message)
    //     }
    // }
    async function ({email, password}, {rejectWithValue, dispatch}) {
        const result = await firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                let user = userCredential.user;
                // ...
                return {
                    result: result,
                }
            })
            .catch((error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                throw new Error(errorMessage)
            });
    }
)

export const signUp = createAsyncThunk(
    'user/signUp',
    async function ({email, password}, {rejectWithValue}) {
        console.log('RegisterUserService')
        const result = await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                let user = userCredential.user;
                return {
                    result: result,
                }
                // ...
            })
            .catch((error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                throw new Error(errorMessage)
            });
    }
)

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
    status: null,
    error: null,
    reducers: {
        setCurrentUser: (state, action) => {
            const {email, password} = action.payload

            state.currentUser.email = email
            state.currentUser.password = password
        },
        // signIn: (state, action) => {
        //     const {email, password} = action.payload
        //     console.log(action.payload)
        //     console.log('entries')
        //
        //     state.userLogged = true
        //     state.currentUser.email = email
        //     state.currentUser.password = password
        // },
        signOut: (state) => {
            state.userLogged = false

            state.currentUser.email = ''
            state.currentUser.password = ''
        },
        signInError: (state, payload) => {
            state.userLogged = false
        }
    },
    extraReducers: {
        [signIn.pending]: (state, action) => {
            state.status = 'LOADING'
            state.error = null
        },
        [signIn.fulfilled]: (state, action) => {
            state.status = 'SUCCESS'
        },
        [signIn.rejected]: (state, action) => {
            state.status = 'ERROR'
            state.error = action.payload
        },
        [signUp.pending]: (state, action) => {
            state.status = 'LOADING'
            state.error = null
        },
        [signUp.fulfilled]: (state, action) => {
            state.status = 'SUCCESS'
        },
        [signUp.rejected]: (state, action) => {
            state.status = 'ERROR'
            state.error = action.payload
        },
    }

})

export const {add, signOut, signInError} = userSlice.actions

export default userSlice.reducer