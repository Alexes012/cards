import React, {ChangeEvent, useCallback, useState} from 'react'
import styles from './Registration.module.css'
import Input from "../../../helpComponents/input/Input";
import Button from "../../../helpComponents/button/Button";
import {storeType} from "../../../bll/store";
import {useDispatch, useSelector} from "react-redux";
import {registerThunk} from "../bll/RegistrationReducer";

function Registration() {

    let [email, setEmail] = useState<string>('');
    let [password, setPassword] = useState<string>('');
    let [confirmPassword, setConfirmPassword] = useState<string>('');
    let validateMessage = '';
    let [invalidField] = useState<boolean>(false);

      const setEmailCallback = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
        [setEmail]
    );

    const setPasswordCallback = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
        [setPassword]
    );

    const setConfirmPasswordCallback = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value),
        [setConfirmPassword]
    );


    const dispatch = useDispatch();
    const registerCallback = useCallback(() => {
            if (validateMessage === '') {
                dispatch(registerThunk(email, password, confirmPassword))
            }
        },
        [email, password, confirmPassword, validateMessage, dispatch]
    );

    const {error, loading} = useSelector((store: storeType) => store.registration)


    return (
        <div className={styles.registration}>
            <Input type='email' placeholder={'Email'} value={email} onChange={setEmailCallback}/>
            <Input type='password' placeholder={'password'} value={password} onChange={setPasswordCallback}/>
            <Input type='password' placeholder={'confirm password'} value={confirmPassword}
                   onChange={setConfirmPasswordCallback}/>
            <Button description={'Register'} onClick={registerCallback}/>
            {invalidField && <div className={styles.message}>{validateMessage}</div>}
            {error && <div className={styles.message}>{error}</div>}
            {loading && <div>Loading</div>}
        </div>
    )
}

export default Registration;