import {LOGIN_USER_SUCCESS} from "../actions/types";

const initialState = {
    users: [],
    ui: {
        isSignInFormHidden: false,
        isSignUpFormHidden: false,
    }
}

export default function contactReducer(state = initialState.users, action) {
    const payload = action.payload
    switch (action.type) {
        case LOGIN_USER_SUCCESS: {
            return {
                ...state,
                payload
            }
        }
        default:
            return state;
    }
}