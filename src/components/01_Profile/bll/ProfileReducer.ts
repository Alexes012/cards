import {profileAPI} from '../api/profileAPI';
import Cookies from 'js-cookie';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import {storeType} from '../../../bll/store';

const SET_PROFILE = 'SET_PROFILE'
const PROFILE_LOADING = 'PROFILE_LOADING'

let initialState = {
    profile: {
        id:  null,
        name:  null,
        email:  null
    },
    loading: false,
};
type ProfileType = {
    profile:{
        id: string | null
        name: string | null
        email: string | null
    }
    loading: boolean
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

type ProfileActionsType =   ProfileLoadingType | SetProfileType
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
        default: return state
    }

};
export default ProfileReducer;
type ThunkType = ThunkAction<void, storeType, unknown, ProfileActionsType>

const setProfile = (id: string, name: string, email: string): SetProfileType =>
    ({type: SET_PROFILE, data: { id, name, email} })
const profileLoading = (loading: boolean): ProfileLoadingType =>
    ({type: PROFILE_LOADING, loading})


export const profileAuthMe = (token: string): ThunkType =>
    async (dispatch:ThunkDispatch<storeType, unknown, ProfileActionsType>) => {
        dispatch(profileLoading(true))
        try {
            const response = await profileAPI.autMe(token)
            const {_id, name, email } = response
            Cookies.set('token', response.token)
            dispatch(setProfile(_id, name, email))
            dispatch(profileLoading(false))
        }
        catch (e) {
            dispatch(profileLoading(false))
        }

    }