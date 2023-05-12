import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {authAPI} from '../api/todolistAPI';
import {handleServerNetworkError} from '../utils/error-utils';
import {setIsLoggedIn} from '../features/login/auth-reducer';


export const initializeAppTC = createAsyncThunk('app/initializeApp', async (arg, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const data = await authAPI.me()
        if (data.resultCode === 0) {
            thunkAPI.dispatch(setIsLoggedIn({value: true}))
            thunkAPI.dispatch(setAppStatus({status: 'success'}))
        } else {
            // thunkAPI.dispatch(setAppStatus({status: 'failed'}))
            // return thunkAPI.rejectWithValue({})
        }
        thunkAPI.dispatch(setAppStatus({status: 'success'}))
    } catch (e) {
        handleServerNetworkError(e, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({})
    }
})

const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle',
        error: null,
        isInitialized: false
    } as AppInitialStateType,
    reducers: {
        setAppStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppError(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        // setAppInitialized(state, action: PayloadAction<{ initialized: boolean }>) {
        //     state.isInitialized = action.payload.initialized
        // }
    },
    extraReducers: builder => {
        builder.addCase(initializeAppTC.fulfilled, (state) => {
            state.isInitialized = true
        })
    }
})

export const appReducer = slice.reducer

export const {setAppStatus, setAppError} = slice.actions

//types
export type AppInitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}
export type RequestStatusType = 'idle' | 'loading' | 'success' | 'failed'