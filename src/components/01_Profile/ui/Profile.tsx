import React, {FC, useEffect} from 'react'
import styles from './Profile.module.css'
import Cookies from 'js-cookie'
import {useDispatch, useSelector} from 'react-redux';
import {profileAuthMe} from '../bll/ProfileReducer';
import { Redirect } from 'react-router-dom';
import { storeType } from '../../../bll/store';



const Profile: React.FC = () => {
    const dispatch = useDispatch()
    const {profile, loading, isAuth} = useSelector((state:storeType) => state.profile)

    useEffect( () => {
        const token = Cookies.get('token')
        if (token) {
            dispatch(profileAuthMe(token))
        }
    }, [dispatch])
    if (!isAuth) {
        return <Redirect to={'/login'} />
    }

    return (
        <div className={styles.profile}>
            <div> <h1>PROFILE</h1></div>
            {loading  ? <div>loading</div> :
                <>
                    <div><b> Login :</b>{profile.name}</div>
                    <div><b> ID :</b>{profile.id}</div>
                </>
            }
        </div>


    )
}

export default Profile;