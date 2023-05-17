import {initializeAppTC, setAppStatus} from '../../app/app-reducer';
import {authAPI, FieldsErrorsType, LoginParamsType} from '../../api/todolistAPI';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {clearTodolistsAndTasks} from '../../common/common.actions';
import {AxiosError} from 'axios';

export const loginTC = createAsyncThunk<undefined, LoginParamsType, {
    rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldsErrorsType> }
}>('auth/login', async (data, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await authAPI.login(data)
        if (res.resultCode === 0) {
            // thunkAPI.dispatch(setIsLoggedIn({value: true}))
            thunkAPI.dispatch(setAppStatus({status: 'success'}))
            return
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

export const logoutTC = createAsyncThunk('auth/logout', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const data = await authAPI.logout()
        if (data.resultCode === 0) {
            // thunkAPI.dispatch(setIsLoggedIn({value: false}))
            thunkAPI.dispatch(setAppStatus({status: 'success'}))
            thunkAPI.dispatch(clearTodolistsAndTasks())
            return
        } else {
            handleServerAppError(data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({})
        }
    } catch (e) {
        handleServerNetworkError(e, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({})
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
        builder.addCase(loginTC.fulfilled, (state) => {
            state.isLogged = true
        })
        builder.addCase(logoutTC.fulfilled, (state) => {
            state.isLogged = false
        })
        builder.addCase(initializeAppTC.fulfilled, (state) => {
            state.isLogged = true
        })
    }
})

//reducer
export const authReducer = slice.reducer

export const {setIsLoggedIn} = slice.actions