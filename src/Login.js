import React from 'react'
import "./Login.css"
import {Button} from "@material-ui/core"
import {auth, provider} from "./firebase"
import { actionTypes } from './reducer'
import { useStateValue } from './StateProvider'
function Login() {
    const [{},dispatch]=useStateValue();
    const signIn=()=>{
        auth.signInWithPopup(provider)
        .then((result)=>{
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            })
        }
        ).catch((error)=>alert(error.message))
    };
    return (
        <div className="Login">
            <div className="login__container">
                <img src="https://tse1.mm.bing.net/th?id=OIP.9FHAlyWGXDt0Oa-iJvxCzAHaEK&pid=Api&P=0&w=298&h=168" />
                <div className="login__text">
                    <h1>Sign in to Chathub</h1>
                </div>
                <Button  onClick={signIn}>Google SignIn</Button>
            </div>
        </div>
    )
}

export default Login
