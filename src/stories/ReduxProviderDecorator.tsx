import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers, legacy_createStore as createStore} from 'redux'
import {v1} from 'uuid'
import {AppRootStateType} from '../state/store'
import {taskReducer} from '../state/task-reducer'
import {todolistReducer} from '../state/todolist-reducer'


const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistReducer
})

const todolistId1 = v1()
const todolistId2 = v1()

const initialGlobalState = {
    todolists: [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ],
    tasks: {
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'React Book', isDone: false}
        ]
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType)

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}> {storyFn()} </Provider>
}

