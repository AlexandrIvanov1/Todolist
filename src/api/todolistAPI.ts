import axios from "axios";

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
    updateTask(todolistId: string, taskId: string, title: string) {
        return instance.put<TaskResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks/${taskId}`, {title})
    }
}

//types
type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
type TodolistResponseType<T = {}> = {
    data: T,
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
}

type TaskType = {
    id: string
    todoListId: string
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
    order: number
    addedDate: string
}
type GetTaskResponseType = {
    items: TaskType
    totalCount: number
    error: string
}
type TaskResponseType<D = {}> = {
    data: D
    messages: Array<string>
    fieldsErrors: Array<string>
    resultCode: number
}