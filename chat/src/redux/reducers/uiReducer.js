import initialState from './initialState'

export default function uiReducer(state = initialState.ui, action) {
    switch(action.type) {
        case "TOGGLE_SIGNIN_FORM": {
            return {
                ...state, isContactFormHidden: !state.isSignInFormHidden
            }
        }
        case "TOGGLE_SIGNUP_FORM": {
            return {
                ...state, isContactFormHidden: !state.isSignUpFormHidden
            }
        }
        default: return state;
    }
}