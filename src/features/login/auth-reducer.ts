import {Dispatch} from 'redux';
import {setAppInitialized, setAppStatus} from '../../app/app-reducer';
import {authAPI, LoginParamsType} from '../../api/todolistAPI';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {clearTodolistsAndTasks} from '../../common/common.actions';

const initialState = {
    isLogged: false
}

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
            state.isLogged = action.payload.value
        }
    }
})

//reducer
export const authReducer = slice.reducer

export const {setIsLoggedIn} = slice.actions

//thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    authAPI.login(data)
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(setIsLoggedIn({value: true}))
                dispatch(setAppStatus({status: 'success'}))
            } else {
                handleServerAppError(res, dispatch)
            }
        })
        .catch(e => {
            handleServerNetworkError(e, dispatch)
        })
}
export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    authAPI.logout()
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(setIsLoggedIn({value: false}))
                dispatch(setAppStatus({status: 'success'}))
                dispatch(clearTodolistsAndTasks())
            } else {
                handleServerAppError(data, dispatch)
            }
        })
        .catch(e => {
            handleServerNetworkError(e, dispatch)
        })
}
export const initializeAppTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    authAPI.me().then(data => {
        if (data.resultCode === 0) {
            dispatch(setIsLoggedIn({value: true}))
            dispatch(setAppStatus({status: 'success'}))
        }
        dispatch(setAppStatus({status: 'success'}))
        dispatch(setAppInitialized({initialized: true}))
    })
        .catch(e => {
            handleServerNetworkError(e, dispatch)
        })
}