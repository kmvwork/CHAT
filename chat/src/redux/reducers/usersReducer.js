import initialState from "./initialState";

export default function contactReducer(state = initialState.users, action) {
    switch(action.type) {
        case "ADD_USER": {
            return {
                ...state,
                contactList: [...state.contactList, state.users]
            }
        }
        default: return state;
    }
}