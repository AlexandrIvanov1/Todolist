import {Dispatch} from "redux";
import {todolistAPI, TodolistType} from '../../api/todolistAPI';
import {RequestStatusType, setAppStatus} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {fetchTasks} from "./Todolist/Task/task-reducer";
import {AppThunkDispatch} from "../../app/store";
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {clearTodolistsAndTasks} from '../../common/common.actions';

const initialState: Array<TodolistDomainType> = []

//reducer
const slice = createSlice({
    name: 'todolist',
    initialState: initialState,
    reducers: {
        deleteTodolistAC(state, action: PayloadAction<{todolistId: string}>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
                state.splice(index, 1)
        },
        addTodolistAC(state, action: PayloadAction<{todolist: TodolistType}>) {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        },
        changeTodolistTitleAC(state, action: PayloadAction<{todolistId: string, title: string}>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            state[index].title = action.payload.title
        },
        changeTodolistFilterAC(state, action: PayloadAction<{todolistId: string, filter: FilterValueType}>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            state[index].filter = action.payload.filter
        },
        setTodolistsAC(state, action: PayloadAction<{todolists: Array<TodolistType>}>) {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        },
        changeTodolistEntityStatus(state, action: PayloadAction<{todolistId: string, status: RequestStatusType}>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            state[index].entityStatus = action.payload.status
            debugger
        }
    },
    extraReducers: builder => {
        builder.addCase(clearTodolistsAndTasks, () => {
            return []
        })
    }
})

export const todolistReducer = slice.reducer

export const {deleteTodolistAC, addTodolistAC, changeTodolistTitleAC, changeTodolistFilterAC,
    setTodolistsAC, changeTodolistEntityStatus} = slice.actions

//thunks
export const fetchTodolists = () => (dispatch: AppThunkDispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    todolistAPI.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC({todolists: res.data}))
            dispatch(setAppStatus({status: 'success'}))
            return res.data
        })
        .then(todolists => {
            todolists.forEach(tl => dispatch(fetchTasks(tl.id)))
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    todolistAPI.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC({todolist: res.data.data.item}))
                dispatch(setAppStatus({status: 'success'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    dispatch(changeTodolistEntityStatus({todolistId: todolistId, status: 'loading'}))
    todolistAPI.deleteTodolist(todolistId)
        .then(() => {
            dispatch(deleteTodolistAC({todolistId: todolistId}))
            dispatch(setAppStatus({status: 'success'}))
            dispatch(changeTodolistEntityStatus({todolistId: todolistId, status: 'success'}))
            debugger
        })
        .catch(error => {
            debugger
            handleServerNetworkError(error, dispatch)
        })
}
export const changeTodolistTitleTC = (todolistId: string, newTitle: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    todolistAPI.updateTodolist(todolistId, newTitle)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodolistTitleAC({todolistId: todolistId, title: newTitle}))
                dispatch(setAppStatus({status: 'success'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

//types
export type FilterValueType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValueType
    entityStatus: RequestStatusType
}