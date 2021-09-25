import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import logger from "react-logger";

export default configureStore({
    reducer: {
        user: userReducer
    },
    middleware:
        (getDefaultMiddleware) =>  getDefaultMiddleware().concat(logger)
})