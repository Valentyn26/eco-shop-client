import React, { useState, useContext, useEffect } from "react";

import MyButton from "../components/UI/button/MyButton";
import MyInput from "../components/UI/input/MyInput";

import { Context } from "../context/context";
import { Link } from 'react-router-dom';
import useInputValidation from "../hooks/useInputValidation";
import { registration, login } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import Switch from "../components/UI/switch/Switch";

const AuthPage = observer((props) => {

    //const navigate = useNavigate();

    const { userStore } = useContext(Context);

    const [email, setEmail, emailIsUsed, emailChangeHandler, emailBlurHandler, emailErrorMessage] = useInputValidation('', 'email');
    const [password, setPassword, passwordIsUsed, passwordChangeHandler, passwordBlurHandler, passwordErrorMessage] = useInputValidation('', 'password');
    const [formIsValid, setFormIsValid] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    async function doAuth(e) {
        e.preventDefault();
        let user
        if (props.isReg) {
            let role = isAdmin ? "ADMIN" : "USER";
            user = await registration(email, password, role);
        } else {
            user = await login(email, password);
        }
        userStore.setUser(user);
        userStore.setIsAuth(true);
    }

    useEffect(() => {
        if (emailErrorMessage || passwordErrorMessage) {
            setFormIsValid(false);
        } else {
            setFormIsValid(true);
        }
    }, [emailErrorMessage, passwordErrorMessage]);

    return (
        <div className="wrapper">
            <div className="auth-box">
                <h1 className="auth-title">{props.isReg ? "Sign up" : "Sign in"}</h1>
                <form className="auth-form" onSubmit={doAuth}>
                    {(emailIsUsed && emailErrorMessage) && <div className="auth-form__error-message">{emailErrorMessage}</div>}
                    <MyInput onChange={emailChangeHandler} value={email} onBlur={emailBlurHandler} type="text" placeholder="Email" name="email" />
                    {(passwordIsUsed && passwordErrorMessage) && <div className="auth-form__error-message">{passwordErrorMessage}</div>}
                    <MyInput onChange={passwordChangeHandler} value={password} onBlur={passwordBlurHandler} type="password" placeholder="Password" name="password" />
                    <div className="auth-form__actions">
                        {props.isReg
                            ?
                            <div className="auth-form__text">
                                Already have an account? <Link className="auth-form__link" to="/login">Sign in</Link>
                            </div>
                            :
                            <div className="auth-form__text">
                                No account yet? <Link className="auth-form__link" to="/registration">Sign up</Link>
                            </div>
                        }
                        <MyButton disabled={!formIsValid} type="submit">Continue</MyButton>
                    </div>
                    {props.isReg && <Switch checked={isAdmin} onClick={() => setIsAdmin(!isAdmin)}>Admin mode</Switch>}
                </form>
            </div>
        </div>
    );
});

export default AuthPage;