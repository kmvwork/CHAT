import './App.css';
import Auth from "./view/auth";
import {createStore} from "redux";
import {Provider} from "react-redux";

function App() {

    // const defaultState = {
    //     users: [
    //         {
    //             name: 'Max',
    //             secondName: 'Ivanov',
    //             password: '123!',
    //             email: 'max@tut.by'
    //         }
    //     ]
    // }

    // const reducer = (state = defaultState, action) => {
    //     switch (action.type) {
    //         case 'ADD_USER':
    //             return {...state, users: [{...state.users, action}]}
    //         default:
    //             return state
    //     }
    // }

    // const store = createStore(reducer)

    return (
        <>
            {/*<Provider store={store}>*/}
                <h1>START</h1>
                <Auth/>
            {/*</Provider>*/}
        </>
    );
}

export default App;
