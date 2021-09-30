import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import logger from 'redux-logger'

import createSagaMiddleware from 'redux-saga'
import rootSaga from "../saga/saga";

const sagaMiddleware = createSagaMiddleware()

export default configureStore({
    reducer: {
        user: userSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware, logger),
})


sagaMiddleware.run(rootSaga)
