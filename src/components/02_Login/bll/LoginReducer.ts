import {loginAPI} from '../api/loginAPI';
import {Dispatch} from 'react';
import Cookies from 'js-cookie';
const SET_LOADING = 'SET_LOADING'
const SET_ERROR = 'SET_ERROR'
const SET_SUCCESS = 'SET_SUCCESS'

let initialState = {
    loading: false,
    error: '',
    success: false

};
type LoadingType = {
    type: typeof SET_LOADING
    loading: boolean
}
type SuccessType ={
    type: typeof SET_SUCCESS
    success: boolean
}
type ErrorType ={
    type: typeof SET_ERROR
    error: string
}
type InitialStateType = typeof initialState
type LoginActionTypes = ErrorType | SuccessType | LoadingType

const LoginReducer = (state: InitialStateType = initialState, action: LoginActionTypes): InitialStateType => {
    switch (action.type) {
        case 'SET_LOADING': return {
            ...state,
            loading: action.loading
        }
        case 'SET_ERROR': return {
            ...state,
            error: action.error
        }
        case 'SET_SUCCESS':
            return {
            ...state,
            success: action.success
        }
        default: return state
    }
};

export default LoginReducer;


const setLoadingAC = (loading: boolean):LoadingType => ( {type: SET_LOADING, loading} )
const setErrorAC = (error: string): ErrorType => ( {type: SET_ERROR, error} )
const setSuccessAC = (success: boolean):SuccessType => ( {type: SET_SUCCESS, success} )



export const LoginThunk = (email: string, password: string, rememberMe: boolean) =>
    async (dispatch: Dispatch<LoginActionTypes>) => {
        dispatch(setLoadingAC(true))
        dispatch(setSuccessAC(false))
        try {
           let response =  await loginAPI.loginIn(email, password, rememberMe);
            Cookies.set('token',response.token)
            dispatch(setLoadingAC(false))
            dispatch(setSuccessAC(true))
        } catch (e) {
            debugger
            const err = e.response.data.error;
            dispatch(setLoadingAC(false))
            dispatch(setErrorAC(err))

        }

    }