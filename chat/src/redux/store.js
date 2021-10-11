import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import logger from 'redux-logger'

import createSagaMiddleware from 'redux-saga'
import rootSaga from "../sagas/";

const sagaMiddleware = createSagaMiddleware()


export default configureStore({
    reducer: {
        user: userSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk:false}).concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)


