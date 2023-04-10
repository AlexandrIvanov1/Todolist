const initialState: AppInitialStateType = {
    status: 'loading',
    error: null
}

//reducer
export const appReducer = (state = initialState, action: AppReducerActionTypes): AppInitialStateType => {
    switch (action.type) {
        case "APP/SET-STATUS":
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        default:
            return state
    }
}

//actions
export const setAppStatus = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppError = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)


//types
export type AppInitialStateType = {
    status: RequestStatusType
    error: string | null
}
export type RequestStatusType = 'idle' | 'loading' | 'success' | 'failed'
export type AppReducerActionTypes = SetStatusActionType | SetErrorActionType
type SetStatusActionType = ReturnType<typeof setAppStatus>
type SetErrorActionType = ReturnType<typeof setAppError>