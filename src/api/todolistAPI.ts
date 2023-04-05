import axios from "axios";
import {TaskType} from "../features/TodolistsList/task-reducer";
import {TodolistType} from "../features/TodolistsList/todolist-reducer";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true
})

export const todolistAPI = {
    getTodolists() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<TodolistResponseType<{item: TodolistType}>>('todo-lists', {title})
    },
    deleteTodolist(todolistId: string){
        return instance.delete<TodolistResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<TodolistResponseType>(`todo-lists/${todolistId}`, {title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTaskResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<TaskResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<TaskResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: TaskModelType) {
        return instance.put<TaskResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}

//types
type TodolistResponseType<T = {}> = {
    data: T,
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
}
type GetTaskResponseType = {
    items: Array<TaskType>
    totalCount: number
    error: string
}
type TaskResponseType<D = {}> = {
    data: D
    messages: Array<string>
    fieldsErrors: Array<string>
    resultCode: number
}
export type TaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}