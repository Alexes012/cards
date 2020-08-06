import { ThunkAction, ThunkDispatch } from "redux-thunk";
import {storeType} from '../../../bll/store';
import {decksAPI, CardPack} from '../api/decksAPI';
import Cookies from 'js-cookie';
import {Dispatch} from 'redux';

const SET_LOADING = 'DECKS-REDUCER/SET_LOADING'
const SET_ERROR = 'DECKS-REDUCER/SET_ERROR'
const SET_CARD_PACKS = 'DECKS-REDUCER/SET_CARD_PACKS'
const SET_TOTAL_COUNT = 'DECKS-REDUCER/SET_TOTAL_COUNT'
const SET_PAGE = 'DECKS-REDUCER/SET_PAGE'

const initialState = {
    loading: false,
    error: '',
    cardPacks: [] as Array<CardPack>,
    cardPacksTotalCount: 1 as number,
    page: 10 as number
};
type DecksReducerType = typeof initialState
type SetActionsType = {
    type: typeof SET_LOADING | typeof SET_ERROR
    payload: {
        loading?:  boolean
        error?: string
    }
}
type SetCardPacks = {
    type: typeof SET_CARD_PACKS,
    decks: Array<CardPack>
}
type SetTotalCountType = {
    type: typeof SET_TOTAL_COUNT
    total: number
}
type SetPageType = {
    type: typeof SET_PAGE
    page: number
}
type ActionDecksType = SetActionsType | SetCardPacks | SetTotalCountType | SetPageType

const DecksReducer = (state:DecksReducerType = initialState, action: ActionDecksType):DecksReducerType => {
    switch (action.type) {
        case SET_LOADING:
        case SET_ERROR:
            return {
                ...state,
                ...action.payload
            }
        case SET_CARD_PACKS:
            return {
                ...state,
                cardPacks: action.decks
            }
        case SET_TOTAL_COUNT:
            return {
                ...state,
                cardPacksTotalCount: action.total
            }
        case SET_PAGE:
            return {
                ...state,
                page: action.page
            }
        default: return state
    }
};
export default DecksReducer;

const setLoadingDecks = (loading: boolean) => ({type: SET_LOADING, payload:{loading}} as const)
const setErrorDecks  = (error: string) => ({type: SET_ERROR, payload:{error}} as const)
const setCardPacks  = (decks:  Array<CardPack>) => ({type: SET_CARD_PACKS, decks} as const)
const setCardPacksTotalCount  = (total: number) => ({type: SET_TOTAL_COUNT, total} as const)
const setPage  = (page: number) => ({type: SET_PAGE, page} as const)


type ThunkType = ThunkAction<void, storeType, unknown, ActionDecksType>
export const getPacksThunk =  (value: string = '', page: number = 1): ThunkType => {
    return  async(dispatch: Dispatch<ActionDecksType>)  => {
        dispatch(setLoadingDecks(true))
        dispatch(setErrorDecks(''))
        try {
            const token = Cookies.get('token')
            if (token) {
                const result = await decksAPI.getPacks(token, value, page)
                debugger
                dispatch(setPage(result.page))
                dispatch(setCardPacksTotalCount(result.cardPacksTotalCount))
                Cookies.set('token', result.token)
                dispatch(setLoadingDecks(false))
                dispatch(setCardPacks(result.cardPacks))
            }
        } catch (e) {
            debugger
            dispatch(setErrorDecks(e.response.data.error))
            dispatch(setLoadingDecks(false))
        }
    }
}
export const thunkAddPack = (): ThunkType => {
    return   async(dispatch: ThunkDispatch<storeType, unknown, ActionDecksType>)  => {
        let token = Cookies.get('token') || ''
        dispatch(setLoadingDecks(true))
        const result = await  decksAPI.addPack(token)
        Cookies.set('token', result.token)
        dispatch(setLoadingDecks(false))
        dispatch(getPacksThunk())
        // dispatch(setCardPacks([result.newCardsPack]))
    }
}
export const thunkDeletePack = (id: string): ThunkType => {
    return   async(dispatch: ThunkDispatch<storeType, unknown, ActionDecksType>)  => {
        let token = Cookies.get('token') || ''
        dispatch(setLoadingDecks(true))
        try {
            const result = await  decksAPI.deletePack(token, id)
            Cookies.set('token', result.token)
            dispatch(setLoadingDecks(false))
            dispatch(getPacksThunk())
        }
        catch (e) {
            const token =  e.response.data.token && Cookies.set('token', e.response.data.token)
            dispatch(setLoadingDecks(false))
            dispatch(setErrorDecks(e.response.data.error))
        }
    }

}
export const thunkUpdatePack = (id: string): ThunkType => {
    return   async(dispatch: ThunkDispatch<storeType, number, ActionDecksType>)  => {
        let token = Cookies.get('token') || ''
        dispatch(setLoadingDecks(true))
        try {
            const result = await  decksAPI.updatePack(token, id)
            Cookies.set('token', result.token)
            dispatch(setLoadingDecks(false))
            dispatch(getPacksThunk())
        }
        catch (e) {
            const token =  e.response.data.token && Cookies.set('token', e.response.data.token)
            dispatch(setLoadingDecks(false))
            dispatch(setErrorDecks(e.response.data.error))
        }
    }
}

export const paginationThunk =  (page: number = 1): ThunkType => {
    return  async(dispatch: ThunkDispatch<storeType, unknown, ActionDecksType>)  => {
        await dispatch(getPacksThunk('', page))
    }
}

