import React from 'react'
import {Provider} from 'react-redux'
import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux'
import {TaskPriorities, taskReducer, TaskStatuses} from '../features/TodolistsList/Todolist/Task/task-reducer'
import {todolistReducer} from '../features/TodolistsList/todolist-reducer'
import {appReducer} from "./app-reducer";
import {AppRootStateType} from "./store";
import {v1} from "uuid";
import thunk from "redux-thunk";


const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistReducer,
    app: appReducer
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
            {id: v1(), title: 'React', status: TaskStatuses.Completed, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Low, todoListId: todolistId1},
            {id: v1(), title: 'Redux', status: TaskStatuses.New, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Low, todoListId: todolistId1}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Milk', status: TaskStatuses.Completed, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Low, todoListId: todolistId2},
            {id: v1(), title: 'Pasta', status: TaskStatuses.New, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Low, todoListId: todolistId2}
        ]
    },
    app: {
        status: 'idle',
        error: null,
        isInitialized: true
    },
    auth: {
        isLogged: true
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState, applyMiddleware(thunk))

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}> {storyFn()} </Provider>
}

