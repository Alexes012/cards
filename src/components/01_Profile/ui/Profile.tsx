import React, {FC, useEffect} from 'react'
import styles from './Profile.module.css'
import Cookies from 'js-cookie'
import {useDispatch, useSelector} from 'react-redux';
import {profileAuthMe} from '../bll/ProfileReducer';
import { Redirect } from 'react-router-dom';
import { storeType } from '../../../bll/store';
import Button from '../../../helpComponents/button/Button';
import { setSuccessAC } from '../../02_Login/bll/LoginReducer';



const Profile: React.FC = () => {
    const dispatch = useDispatch()
    const {profile, loading} = useSelector((state:storeType) => state.profile)
    const success = useSelector((state:storeType) => state.login)

    useEffect( () => {
        const token = Cookies.get('token')
        if (token) {
            dispatch(profileAuthMe(token))
        }
    }, [dispatch])
    const logout = () => {
        Cookies.remove('token')
        dispatch(setSuccessAC(false))
    }

    if (!success) {
        return <Redirect to={'/login'} />
    }

    return (
        <div className={styles.profile}>
            <div> <h1>PROFILE</h1></div>
            {loading  ? <div>loading</div> :
                <>
                    <div><b> Login :</b>{profile.name}</div>
                    <div><b> ID :</b>{profile.id}</div>
                    {/*<div><Button description="logout" color='blue' onClick={logout} disabled={loading}/></div>*/}
                </>
            }
        </div>

    )
}

export default Profile;