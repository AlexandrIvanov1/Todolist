import {AppInitialStateType, appReducer, setAppError, setAppStatus} from "./app-reducer";

let startState: AppInitialStateType

beforeEach(() => {
    startState = {
        status: 'idle',
        error: null,
        isInitialized: false
    }
})

test('status should be changed', () => {
    const endState = appReducer(startState, setAppStatus({status: 'loading'}))

    expect(startState.status).toBe('idle')
    expect(endState.status).toBe('loading')
})

test('error should be added', () => {
    const endState = appReducer(startState, setAppError({error: 'Some error'}))

    expect(startState.error).toBe(null)
    expect(endState.error).toBe('Some error')
})