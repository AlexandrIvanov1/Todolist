import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers} from 'redux'
import {taskReducer} from '../features/TodolistsList/Todolist/Task/task-reducer'
import {todolistReducer} from '../features/TodolistsList/todolist-reducer'
import {appReducer} from './app-reducer';
import {AppRootStateType, RootReducerType} from './store';
import {v1} from 'uuid';
import thunk from 'redux-thunk';
import {authReducer} from '../features/login/auth-reducer';
import {configureStore} from '@reduxjs/toolkit';
import {TaskPriorities, TaskStatuses} from '../api/todolistAPI';


const rootReducer: RootReducerType = combineReducers({
    tasks: taskReducer,
    todolists: todolistReducer,
    app: appReducer,
    auth: authReducer
})

const todolistId1 = v1()
const todolistId2 = v1()

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: todolistId1, title: 'What to learn', filter: 'all', order: 0, addedDate: '', entityStatus: 'idle'},
        {id: todolistId2, title: 'What to buy', filter: 'all', order: 0, addedDate: '', entityStatus: 'loading'}
    ],
    tasks: {
        [todolistId1]: [
            {
                id: v1(),
                title: 'React',
                status: TaskStatuses.Completed,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                startDate: '',
                priority: TaskPriorities.Low,
                todoListId: todolistId1
            },
            {
                id: v1(),
                title: 'Redux',
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                startDate: '',
                priority: TaskPriorities.Low,
                todoListId: todolistId1
            }
        ],
        [todolistId2]: [
            {
                id: v1(),
                title: 'Milk',
                status: TaskStatuses.Completed,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                startDate: '',
                priority: TaskPriorities.Low,
                todoListId: todolistId2
            },
            {
                id: v1(),
                title: 'Pasta',
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                startDate: '',
                priority: TaskPriorities.Low,
                todoListId: todolistId2
            }
        ]
    },
    app: {
        status: 'success',
        error: null,
        isInitialized: true
    },
    auth: {
        isLogged: false
    }
}

const storyBookStore = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
    preloadedState: initialGlobalState
})

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}> {storyFn()} </Provider>
}