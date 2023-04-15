import {Dispatch} from "redux";
import {setAppInitialized, setAppStatus} from "../../app/app-reducer";
import {authAPI, LoginParamsType} from "../../api/todolistAPI";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {clearData} from "../TodolistsList/todolist-reducer";

const initialState: InitialStateType = {
    isLogged: false
}

//reducer
export const authReducer = (state = initialState, action: AuthReducerActionsType): InitialStateType => {
    switch (action.type) {
        case "LOGIN/SET-IS-LOGGED-IN":
            return {...state, isLogged: action.value}
        default:
            return state
    }
}

//actions
export const setIsLoggedIn = (value: boolean) => ({type: 'LOGIN/SET-IS-LOGGED-IN', value} as const)

//thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
    authAPI.login(data)
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(setIsLoggedIn(true))
                dispatch(setAppStatus('success'))
            } else {
                handleServerAppError(res, dispatch)
            }
        })
        .catch(e => {
            handleServerNetworkError(e, dispatch)
        })
}
export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
    authAPI.logout()
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(setIsLoggedIn(false))
                dispatch(setAppStatus('success'))
                dispatch(clearData())
            } else {
                handleServerAppError(data, dispatch)
            }
        })
        .catch(e => {
            handleServerNetworkError(e, dispatch)
        })
}
export const initializeAppTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
    authAPI.me().then(data => {
        if (data.resultCode === 0) {
            dispatch(setIsLoggedIn(true))
            dispatch(setAppStatus('success'))
        }
        dispatch(setAppStatus('success'))
        dispatch(setAppInitialized(true))
    })
        .catch(e => {
            handleServerNetworkError(e, dispatch)
        })
}

//types
type InitialStateType = {
    isLogged: boolean
}

type AuthReducerActionsType = SetIsLoggedInType
type SetIsLoggedInType = ReturnType<typeof setIsLoggedIn>