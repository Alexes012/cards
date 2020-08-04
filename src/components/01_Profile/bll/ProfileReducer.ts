import {profileAPI} from '../api/profileAPI';
import Cookies from 'js-cookie';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import {storeType} from '../../../bll/store';

const SET_PROFILE = 'SET_PROFILE'
const PROFILE_LOADING = 'PROFILE_LOADING'
const PROFILE_AUTH = 'PROFILE_AUTH'

let initialState = {
    profile: {
        id:  null,
        name:  null,
        email:  null
    },
    loading: false,
    isAuth: false
};
type ProfileType = {
    profile:{
        id: string | null
        name: string | null
        email: string | null
    }
    loading: boolean
    isAuth: boolean
};
type SetProfileType = {
    type: typeof SET_PROFILE
    data: {
        id: string | null
        name: string | null
        email: string | null
    }

}
type ProfileLoadingType = {
    type: typeof PROFILE_LOADING
    loading: boolean
}
type ProfileisAuthType = {
    type: typeof PROFILE_AUTH
    isAuth: boolean
}
type ProfileActionsType = ProfileisAuthType | ProfileLoadingType | SetProfileType
const ProfileReducer = (state:ProfileType = initialState, action: ProfileActionsType):ProfileType => {
    switch (action.type) {
        case SET_PROFILE:
            return {
                ...state,
                profile: {...action.data}
            }
        case PROFILE_LOADING: return {
            ...state,
            loading: action.loading
        }
        case PROFILE_AUTH: return {
            ...state,
            isAuth: action.isAuth
        }
        default: return state
    }

};
export default ProfileReducer;
type ThunkType = ThunkAction<void, storeType, unknown, ProfileActionsType>

const setProfile = (id: string, name: string, email: string): SetProfileType =>
    ({type: SET_PROFILE, data: { id, name, email} })
const profileLoading = (loading: boolean): ProfileLoadingType =>
    ({type: PROFILE_LOADING, loading})
const profileIsAuth = (isAuth: boolean): ProfileisAuthType => ({type: PROFILE_AUTH, isAuth})

export const profileAuthMe = (token: string): ThunkType =>
    async (dispatch:ThunkDispatch<storeType, unknown, ProfileActionsType>) => {
        dispatch(profileIsAuth(true))
        try {
            const response = await profileAPI.autMe(token)
            const {_id, name, email } = response
            Cookies.set('token', response.token)
            dispatch(setProfile(_id, name, email))
            dispatch(profileLoading(false))
        }
        catch (e) {
            dispatch(profileIsAuth(false))
            dispatch(profileLoading(false))
        }

    }