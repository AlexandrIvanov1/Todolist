import {todolistReducer} from './todolist-reducer';
import {taskReducer} from './task-reducer';
import {combineReducers, legacy_createStore as createStore} from 'redux';


const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: taskReducer
})

export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>