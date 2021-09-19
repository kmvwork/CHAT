import React, {useState} from 'react';
import {Grid, Modal} from "@material-ui/core";
import Registration from "../../component/registration/Registration";
import Login from "../../component/login/Login";
import {useDispatch, useSelector} from "react-redux";
import SignIn from "../../component/login/SignIn";

const Auth = () => {
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
      setOpen(true)
    }

    const handleClose = () => {
      setOpen(false)
    }

    // const dispatch = useDispatch()
    // const selector = useSelector(state => state.users)
    // console.log(selector)

    // const addUser = ({...user}) => {
    //     dispatch({type:'ADD_USER', payload:{
    //             ...user
    //         }})
    //     console.log('addUSER')
    // }


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
                    {/*<Login/>*/}
                    <SignIn/>
                </Grid>
            </Modal>
        </div>
    );
};

export default Auth;