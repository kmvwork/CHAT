import React, {useState} from 'react';
import {Grid, Modal} from "@material-ui/core";
import SignIn from "../../component/login/SignIn";
import Chat from "../chat/Chat";

const Auth = () => {
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
      setOpen(true)
    }

    const handleClose = () => {
      setOpen(false)
    }

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
                    {/*<SignIn/>*/}
                    <Chat/>
                </Grid>
            </Modal>
        </div>
    );
};

export default Auth;