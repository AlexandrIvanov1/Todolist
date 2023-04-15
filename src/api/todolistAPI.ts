import axios from "axios";
import {TaskType} from "../features/TodolistsList/Todolist/Task/task-reducer";
import {TodolistType} from "../features/TodolistsList/todolist-reducer";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true
})

//todolistAPI
export const todolistAPI = {
    getTodolists() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{item: TodolistType}>>('todo-lists', {title})
    },
    deleteTodolist(todolistId: string){
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTaskResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: TaskModelType) {
        return instance.put<ResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}

//authAPI
export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<ResponseType<{userId: number}>>('auth/login', data)
            .then(res => res.data)
    },
    logout() {
      return instance.delete<ResponseType>('auth/login').then(res => res.data)
    },
    me() {
        return instance.get<ResponseType<AuthResponseType>>('auth/me').then(res => res.data)
    }
}

//types
export type ResponseType<T = {}> = {
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
export type TaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}
export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}
type AuthResponseType = {
    id: number
    email: string
    login: string
}