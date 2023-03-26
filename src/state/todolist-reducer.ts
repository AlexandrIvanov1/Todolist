import {v1} from 'uuid';

const initialState: Array<TodolistType> = []

//reducer
export const todolistReducer = (state = initialState, action: TodolistActionsType): Array<TodolistType> => {
    switch (action.type) {
        case 'DELETE-TODOLIST':
            return state.filter(tl => tl.id !== action.todolistId)
        case 'ADD-TODOLIST':
            return [{id: action.id, title: action.title, filter: 'all'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl)
        default:
            return state
    }
}

//actions
export const deleteTodolist = (todolistId: string) => {
    return {type: 'DELETE-TODOLIST', todolistId} as const
}
export const addTodolist = (title: string) => {
    return {type: 'ADD-TODOLIST', id: v1(), title} as const
}
export const changeTodolistTitle = (todolistId: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', todolistId, title} as const
}
export const changeTodolistFilter = (todolistId: string, filter: FilterValueType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', todolistId, filter} as const
}

//types
export type FilterValueType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

type TodolistActionsType =
    | DeleteTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

type DeleteTodolistActionType = ReturnType<typeof deleteTodolist>
type AddTodolistActionType = ReturnType<typeof addTodolist>
type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitle>
type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilter>