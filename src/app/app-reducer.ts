import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: AppInitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

//reducer
const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatus(state, action: PayloadAction<{status: RequestStatusType}>) {
            state.status = action.payload.status
        },
        setAppError(state, action: PayloadAction<{error: string | null}>) {
            state.error = action.payload.error
        },
        setAppInitialized(state, action: PayloadAction<{initialized: boolean}>) {
            state.isInitialized = action.payload.initialized
        }
    }
})

export const appReducer = slice.reducer

export const {setAppStatus, setAppError, setAppInitialized} = slice.actions

//types
export type AppInitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}
export type RequestStatusType = 'idle' | 'loading' | 'success' | 'failed'