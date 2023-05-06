import {todolistReducer} from '../features/TodolistsList/todolist-reducer';
import {taskReducer} from '../features/TodolistsList/Todolist/Task/task-reducer';
import {AnyAction, combineReducers} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {useDispatch} from 'react-redux';
import {appReducer} from './app-reducer';
import {authReducer} from '../features/login/auth-reducer';
import {configureStore} from '@reduxjs/toolkit';


const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: taskReducer,
    app: appReducer,
    auth: authReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk)
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
// @ts-ignore
window.store = store