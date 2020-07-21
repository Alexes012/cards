import React from 'react';
import styles from './Login.module.css'
import Button from "../../../helpComponents/button/Button";
import Input from "../../../helpComponents/input/Input";


const Login = () => {

    return (
        <div className={styles.wrapper}>
            <Input/>
           <Button description="Login" color='green'/>
        </div>
    );
};


export default Login;