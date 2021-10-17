import './App.css';
import Auth from "./view/auth";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import SignIn from "./component/login/SignIn";
import Chat from "./view/chat/Chat";
import Registration from "./component/registration/Registration";
import PasswordChange from "./component/passwordChange/PasswordChange";
import { StyledEngineProvider } from '@mui/material/styles';



function App() {
    return (
        <>
            {/*<h1>START</h1>*/}
            {/*<Auth/>*/}
            <Router>
                <Switch>
                    <Route exact path='/'>
                        <SignIn />
                    </Route>
                    <Route exact path='/signup'>
                        <Registration/>
                    </Route>
                    <Route exact path='/chat'>
                        <Chat/>
                    </Route>
                    <Route path='/passwordChange'>
                        <PasswordChange/>
                    </Route>
                    <Route path='*'>
                        <h1>NOT MATCH</h1>
                    </Route>
                </Switch>
            </Router>
        </>
    );
}

export default App;
