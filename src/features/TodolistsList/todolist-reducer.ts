import {Dispatch} from "redux";
import {todolistAPI} from "../../api/todolistAPI";

const initialState: Array<TodolistDomainType> = []

//reducer
export const todolistReducer = (state = initialState, action: TodolistActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'DELETE-TODOLIST':
            return state.filter(tl => tl.id !== action.todolistId)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl)
        case "SET-TODOLISTS":
            return action.todolists.map(tl => ({...tl, filter: 'all'}))
        default:
            return state
    }
}

//actions
export const deleteTodolistAC = (todolistId: string) => {
    return {type: 'DELETE-TODOLIST', todolistId} as const
}
export const addTodolistAC = (todolist: TodolistType) => {
    return {type: 'ADD-TODOLIST', todolist} as const
}
export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', todolistId, title} as const
}
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValueType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', todolistId, filter} as const
}
export const setTodolistsAC = (todolists: Array<TodolistType>) => {
    return {type: 'SET-TODOLISTS', todolists} as const
}

//thunks
export const fetchTodolists = () => (dispatch: Dispatch<TodolistActionsType>) => {
    todolistAPI.getTodolists()
        .then(res => dispatch(setTodolistsAC(res.data)))
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch<TodolistActionsType>) => {
    todolistAPI.createTodolist(title)
        .then(res => dispatch(addTodolistAC(res.data.data.item)))
}
export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch<TodolistActionsType>) => {
    todolistAPI.deleteTodolist(todolistId)
        .then(() => dispatch(deleteTodolistAC(todolistId)))
}
export const changeTodolistTitleTC = (todolistId: string, newTitle: string) => (dispatch: Dispatch<TodolistActionsType>) => {
    todolistAPI.updateTodolist(todolistId, newTitle)
        .then(() => dispatch(changeTodolistTitleAC(todolistId, newTitle)))
}

//types
export type FilterValueType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type TodolistDomainType = TodolistType & {
    filter: FilterValueType
}

export type TodolistActionsType =
    | DeleteTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType

export type DeleteTodolistActionType = ReturnType<typeof deleteTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>