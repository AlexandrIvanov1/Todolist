const initialState: AppInitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

//reducer
export const appReducer = (state = initialState, action: AppReducerActionTypes): AppInitialStateType => {
    switch (action.type) {
        case "APP/SET-STATUS":
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        case "APP/SET-INITIALIZED":
            return {...state, isInitialized: action.initialized}
        default:
            return state
    }
}

//actions
export const setAppStatus = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppError = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppInitialized = (initialized: boolean) => ({type: 'APP/SET-INITIALIZED', initialized} as const)

//types
export type AppInitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}
export type RequestStatusType = 'idle' | 'loading' | 'success' | 'failed'
export type AppReducerActionTypes = SetStatusActionType | SetErrorActionType | SetInitializedActionType
type SetStatusActionType = ReturnType<typeof setAppStatus>
type SetErrorActionType = ReturnType<typeof setAppError>
type SetInitializedActionType = ReturnType<typeof setAppInitialized>