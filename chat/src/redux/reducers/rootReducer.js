import {combineReducers} from "redux";
import usersReducer from './usersReducer'
import uiReducer from './uiReducer'

const rootReducer = combineReducers({
    users: usersReducer,
    ui:uiReducer,
})

export default rootReducer;