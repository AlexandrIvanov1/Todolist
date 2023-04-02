import {v1} from 'uuid';
import {AddTodolistActionType, DeleteTodolistActionType} from './todolist-reducer';

const initialState: AllTaskType = {}

//reducer
export const taskReducer = (state = initialState, action: TaskActionsType): AllTaskType => {
    switch (action.type) {
        case 'DELETE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            const newTask: TaskType = {id: v1(), title: action.title, status: TaskStatuses.New, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Low, todoListId: action.todolistId}
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        case 'CHANGE-TASK-TITLE':
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, title: action.title} : t)
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, status: action.status} : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.id]: []}
        case 'DELETE-TODOLIST':
            const stateCopy = {...state}
            delete stateCopy[action.todolistId]
            return stateCopy
        default:
            return state
    }
}

//actions
export const deleteTaskAC = (todolistId: string, taskId: string) => {
    return {type: 'DELETE-TASK', todolistId, taskId} as const
}
export const addTaskAC = (todolistId: string, title: string) => {
    return {type: 'ADD-TASK', todolistId, title} as const
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {type: 'CHANGE-TASK-TITLE', todolistId, taskId, title} as const
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, status: TaskStatuses) => {
    return {type: 'CHANGE-TASK-STATUS', todolistId, taskId, status} as const
}

//types
export type TaskActionsType =
    | DeleteTaskActionType
    | AddTaskActionType
    | ChangeTaskTitleActionType
    | ChangeTaskStatusActionType
    | AddTodolistActionType
    | DeleteTodolistActionType

export type DeleteTaskActionType = ReturnType<typeof deleteTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>

export type AllTaskType = {
    [key: string]: Array<TaskType>
}
export type TaskType = {
    id: string
    todoListId: string
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    order: number
    addedDate: string
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    High = 2,
    Urgently = 3,
    Later = 4
}