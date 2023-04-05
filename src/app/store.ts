import {todolistReducer} from '../features/TodolistsList/todolist-reducer';
import {taskReducer} from '../features/TodolistsList/task-reducer';
import {AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import thunk, {ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";


const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: taskReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()