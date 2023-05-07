import {addTodolistAC, deleteTodolistAC, setTodolistsAC} from '../../todolist-reducer';
import {Dispatch} from 'redux';
import {todolistAPI} from '../../../../api/todolistAPI';
import {AppRootStateType} from '../../../../app/store';
import {setAppStatus} from '../../../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../../../utils/error-utils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {clearTodolistsAndTasks} from '../../../../common/common.actions';

const initialState: AllTaskType = {}

const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        deleteTaskAC(state, action: PayloadAction<{ todolistId: string, taskId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
        addTaskAC(state, action: PayloadAction<TaskType>) {
            const tasks = state[action.payload.todoListId]
            tasks.unshift(action.payload)
        },
        updateTaskAC(state, action: PayloadAction<{ todolistId: string, taskId: string, model: UpdateTaskModelType }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
        setTasksAC(state, action: PayloadAction<{ todolistId: string, tasks: Array<TaskType> }>) {
            state[action.payload.todolistId] = action.payload.tasks
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = []
        })
        builder.addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.todolistId]
        })
        builder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolists.forEach((tl: any) => {
                state[tl.id] = []
            })
        })
        builder.addCase(clearTodolistsAndTasks, () => {
            debugger
            return {}
        })
    }
})

export const taskReducer = slice.reducer

export const {deleteTaskAC, addTaskAC, updateTaskAC, setTasksAC} = slice.actions

//thunks
export const fetchTasks = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    todolistAPI.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC({todolistId: todolistId, tasks: res.data.items}))
            dispatch(setAppStatus({status: 'success'}))
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    todolistAPI.deleteTask(todolistId, taskId)
        .then(() => {
            dispatch(deleteTaskAC({todolistId: todolistId, taskId: taskId}))
            dispatch(setAppStatus({status: 'success'}))
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    todolistAPI.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setAppStatus({status: 'success'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateTaskModelType) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {

        const task = getState().tasks[todolistId].find(t => t.id === taskId)
        if (!task) return

        const apiModel = {
            title: task.title,
            status: task.status,
            startDate: task.startDate,
            description: task.description,
            priority: task.priority,
            deadline: task.deadline,
            ...domainModel
        }

        dispatch(setAppStatus({status: 'loading'}))
        todolistAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC({todolistId: todolistId, taskId: taskId, model: apiModel}))
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
type UpdateTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
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