import {todolistReducer} from '../features/TodolistsList/Todolist/todolist-reducer';
import {taskReducer} from '../features/TodolistsList/Todolist/Task/task-reducer';
import {ActionCreatorsMapObject, AnyAction, bindActionCreators, combineReducers} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {useDispatch} from 'react-redux';
import {appReducer} from './app-reducer';
import {authReducer} from '../features/Auth/auth-reducer';
import {configureStore} from '@reduxjs/toolkit';
import {useMemo} from 'react';


const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: taskReducer,
    app: appReducer,
    auth: authReducer
})

export type RootReducerType = typeof rootReducer

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk)
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()

export function useActions<T extends ActionCreatorsMapObject<any>>(action: T) {
    const dispatch = useAppDispatch()

    const bindActions = useMemo(() => {
        return bindActionCreators(action, dispatch)
    }, [])

    return bindActions
}