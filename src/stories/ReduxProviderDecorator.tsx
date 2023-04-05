import React from 'react'
import {Provider} from 'react-redux'
import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux'
import {taskReducer} from '../features/TodolistsList/task-reducer'
import {todolistReducer} from '../features/TodolistsList/todolist-reducer'
import thunk from "redux-thunk";


const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistReducer
})

// const todolistId1 = v1()
// const todolistId2 = v1()
//
// const initialGlobalState: AppRootStateType = {
//     todolists: [
//         {id: todolistId1, title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
//         {id: todolistId2, title: 'What to buy', filter: 'all', order: 0, addedDate: ''}
//     ],
//     tasks: {
//         [todolistId1]: [
//             {id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Low, todoListId: todolistId1},
//             {id: v1(), title: 'JS', status: TaskStatuses.New, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Low, todoListId: todolistId1}
//         ],
//         [todolistId2]: [
//             {id: v1(), title: 'Milk', status: TaskStatuses.Completed, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Low, todoListId: todolistId2},
//             {id: v1(), title: 'React Book', status: TaskStatuses.New, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Low, todoListId: todolistId2}
//         ]
//     }
// }

export const storyBookStore = createStore(rootReducer, applyMiddleware(thunk))

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}> {storyFn()} </Provider>
}

