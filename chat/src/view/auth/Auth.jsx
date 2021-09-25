import React, {useState} from 'react';
import {Grid, Modal} from "@material-ui/core";
import Registration from "../../component/registration/Registration";

const Auth = () => {
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
      setOpen(true)
    }

    const handleClose = () => {
      setOpen(false)
    }


    return (
        <>
            <button type="button" onClick={handleOpen}>
                Open Modal
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Registration/>
                </Grid>
            </Modal>
        </>
    );
};

export default Auth;