import React, {ChangeEvent, useEffect, useState} from 'react';
import styles from './Login.module.css'
import Button from "../../../helpComponents/button/Button";
import Input from "../../../helpComponents/input/Input";
import {instance} from '../../../api/api';
import {useDispatch, useSelector} from 'react-redux';
import { LoginThunk } from '../bll/LoginReducer';
import { Redirect } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState<string>('test@email.nya')
    const [pass, setPass] = useState<string>('test@email.nya123')
    const [rememberMe, setRememberMe] = useState<boolean>(true);
    const dispatch = useDispatch()
    const {loading, error, success} = useSelector((state:any) => state.login);

    const onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }
    const onCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.currentTarget.checked)
        setRememberMe(event.currentTarget.checked)
    }
    const onPassChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPass(event.target.value)
    }
    const onSumbitHandler = () => {
        dispatch(LoginThunk(email, pass, rememberMe))
    }
    const textError = error.length > 0 ? error: ''
    if(success){
       return <Redirect to={'/profile'}/>
    }
    return (
        <div className={styles.wrapper}>
            {loading && '...Loading'}
            {textError}
            <Input placeholder="Email" value={email} onChange={onEmailChange}/>
            <Input placeholder="Password" type="password" value={pass} onChange={onPassChange}/>
            <Input type={'checkbox'} checked={rememberMe} onChange={onCheckboxChange} /> remember me
           <Button description="Login" color='blue' onClick={onSumbitHandler} disabled={loading}/>
        </div>
    );
};


export default Login;