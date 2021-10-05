import {configureStore} from "@reduxjs/toolkit";
import usersSlice from "./userSlice";

export default configureStore({
    reducer: {
        user: usersSlice
    },
})



