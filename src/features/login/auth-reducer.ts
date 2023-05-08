import {Dispatch} from 'redux';
import {setAppInitialized, setAppStatus} from '../../app/app-reducer';
import {authAPI, FieldsErrorsType, LoginParamsType} from '../../api/todolistAPI';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {clearTodolistsAndTasks} from '../../common/common.actions';
import {AxiosError} from 'axios';

export const loginTC = createAsyncThunk<{isLogged: boolean}, LoginParamsType, {rejectValue: {errors: Array<string>, fieldsErrors?: Array<FieldsErrorsType>}}>('auth/login', async (data, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await authAPI.login(data)
        if (res.resultCode === 0) {
            thunkAPI.dispatch(setIsLoggedIn({value: true}))
            thunkAPI.dispatch(setAppStatus({status: 'success'}))
            return {isLogged: true}
        } else {
            handleServerAppError(res, thunkAPI.dispatch)
            debugger
            return thunkAPI.rejectWithValue({errors: res.messages, fieldsErrors: res.fieldsErrors})
        }
    } catch (e) {
        const error: AxiosError = e
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({errors: [error.message]})
    }
})

const slice = createSlice({
    name: 'auth',
    initialState: {
        isLogged: false
    },
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
            state.isLogged = action.payload.value
        }
    },
    extraReducers: builder => {
        builder.addCase(loginTC.fulfilled, (state, action) => {
            state.isLogged = action.payload.isLogged
        })
    }
})

//reducer
export const authReducer = slice.reducer

export const {setIsLoggedIn} = slice.actions

//thunks
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