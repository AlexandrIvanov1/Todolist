import {TaskPriorities, TaskStatuses, TaskType, todolistAPI} from '../../../../api/todolistAPI';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {clearTodolistsAndTasks} from '../../../../common/common.actions';
import {todolistAsyncActions} from '../todolist-reducer';
import {setAppStatus} from '../../../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../../../utils/error-utils';
import {AppRootStateType} from '../../../../app/store';

const initialState: AllTaskType = {}

const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (todolistId: string, {dispatch}) => {
        dispatch(setAppStatus({status: 'loading'}))
        const res = await todolistAPI.getTasks(todolistId)
        const tasks = res.data.items
        dispatch(setAppStatus({status: 'success'}))
        return {todolistId, tasks}
    }
)
const deleteTask = createAsyncThunk('tasks/deleteTaskTC',
    async (arg: { todolistId: string, taskId: string }, {dispatch}) => {
        dispatch(setAppStatus({status: 'loading'}))
        await todolistAPI.deleteTask(arg.todolistId, arg.taskId)
        dispatch(setAppStatus({status: 'success'}))
        return arg
    }
)
const addTask = createAsyncThunk('tasks/addTask',
    async (arg: { todolistId: string, title: string }, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatus({status: 'loading'}))
        try {
            const res = await todolistAPI.createTask(arg.todolistId, arg.title)
            if (res.data.resultCode === 0) {
                dispatch(setAppStatus({status: 'success'}))
                return res.data.data.item
            } else {
                handleServerAppError(res.data, dispatch)
                return rejectWithValue(null)
            }
        } catch (error) {
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
        }
    }
)
const updateTask = createAsyncThunk('tasks/updateTask',
    async (arg: { todolistId: string, taskId: string, domainModel: UpdateTaskModelType}, thunkAPI) => {

        const state = thunkAPI.getState() as AppRootStateType

        const task = state.tasks[arg.todolistId].find(t => t.id === arg.taskId)

        if (!task) {
            return thunkAPI.rejectWithValue('Error')
        }

        const apiModel = {
            title: task.title,
            status: task.status,
            startDate: task.startDate,
            description: task.description,
            priority: task.priority,
            deadline: task.deadline,
            ...arg.domainModel
        }

        thunkAPI.dispatch(setAppStatus({status: 'loading'}))
        const res = await todolistAPI.updateTask(arg.todolistId, arg.taskId, apiModel)
        try {
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(setAppStatus({status: 'success'}))
                return arg
            } else {
                handleServerAppError(res.data, thunkAPI.dispatch)
                return thunkAPI.rejectWithValue(null)
            }
        } catch (error) {
            handleServerNetworkError(error, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(null)
        }
    }
)

export const tasksAsyncActions = {
    fetchTasks,
    deleteTask,
    addTask,
    updateTask
}

const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(todolistAsyncActions.addTodolist.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = []
        })
        builder.addCase(todolistAsyncActions.deleteTodolist.fulfilled, (state, action) => {
            delete state[action.payload.todolistId]
        })
        builder.addCase(todolistAsyncActions.fetchTodolists.fulfilled, (state, action) => {
            action.payload.todolists.forEach((tl: any) => {
                state[tl.id] = []
            })
        })
        builder.addCase(clearTodolistsAndTasks, () => {
            return {}
        })
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
        })
        builder.addCase(deleteTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        })
        builder.addCase(addTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.todoListId]
            tasks.unshift(action.payload)
        })
        builder.addCase(updateTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.domainModel}
            }
        })
    }
})

export const taskReducer = slice.reducer


export type AllTaskType = {
    [key: string]: Array<TaskType>
}
type UpdateTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}