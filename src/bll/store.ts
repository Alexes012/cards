import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import ProfileReducer from "../components/01_Profile/bll/ProfileReducer"
import LoginReducer from "../components/02_Login/bll/LoginReducer"
import {RegistrationReducer} from "../components/03_Registration/bll/RegistrationReducer"
import ForgotReducer from "../components/04_ForgotPassword/bll/ForgotReducer"
import DecksReducer from "../components/05_Decks/bll/DecksReducer"


const reducers = combineReducers( {
    profile: ProfileReducer,
    login: LoginReducer,
    registration: RegistrationReducer,
    // forgot: ForgotReducer,
    // decks: DecksReducer
});

export const store = createStore (reducers, applyMiddleware(thunkMiddleware));

export type storeType = ReturnType<typeof reducers>