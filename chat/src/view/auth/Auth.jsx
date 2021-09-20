import React, {useState} from 'react';
import {Grid, Modal} from "@material-ui/core";
import SignIn from "../../component/login/SignIn";
import configureStore from "../../redux/store/createStore";
import {toggleSignINForm, toggleSignUPForm} from "../../redux/actions/uiActions";


const Auth = () => {
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
      setOpen(true)
    }

    const handleClose = () => {
      setOpen(false)
    }

    const store = configureStore()

    const unsubscribe = store.subscribe(() =>
        console.log(store.getState())
    )

    store.dispatch(toggleSignINForm());

    store.dispatch(toggleSignUPForm());



    return (
        <div>
            <button type="button" onClick={handleOpen}>
                Open Modal
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                style={{width:'100%'}}
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    {/*<Registration onAddUser={addUser}/>*/}
                    <SignIn/>
                </Grid>
            </Modal>
        </div>
    );
};

export default Auth;