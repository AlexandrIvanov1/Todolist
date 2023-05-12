import {todolistAPI, TodolistType} from '../../api/todolistAPI';
import {RequestStatusType, setAppStatus} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {fetchTasks} from './Todolist/Task/task-reducer';
import {AppRootStateType} from '../../app/store';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {clearTodolistsAndTasks} from '../../common/common.actions';

export const fetchTodolists = createAsyncThunk('todolists/fetchTodolists',
    async (arg, {dispatch, getState, rejectWithValue}) => {

        dispatch(setAppStatus({status: 'loading'}))
        try {
            const res = await todolistAPI.getTodolists()
            dispatch(setAppStatus({status: 'success'}))
            const state = getState() as AppRootStateType
            state.todolists.forEach(tl => dispatch(fetchTasks(tl.id)))
            return {todolists: res.data}
        } catch (error) {
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
        }
    })
export const deleteTodolistTC = createAsyncThunk('todolists/deleteTodolist',
    async (arg: { todolistId: string }, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatus({status: 'loading'}))
        dispatch(changeTodolistEntityStatus({todolistId: arg.todolistId, status: 'loading'}))
        try {
            await todolistAPI.deleteTodolist(arg.todolistId)
            dispatch(setAppStatus({status: 'success'}))
            dispatch(changeTodolistEntityStatus({todolistId: arg.todolistId, status: 'success'}))
            return {todolistId: arg.todolistId}
        } catch (error) {
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
        }
    })
export const addTodolistTC = createAsyncThunk('todolists/addTodolist',
    async (arg: { title: string }, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatus({status: 'loading'}))
        try {
            const res = await todolistAPI.createTodolist(arg.title)
            if (res.data.resultCode === 0) {
                dispatch(setAppStatus({status: 'success'}))
                return {todolist: res.data.data.item}
            } else {
                handleServerAppError(res.data, dispatch)
                return rejectWithValue(null)
            }
        } catch (error) {
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
        }
    })
export const changeTodolistTitleTC = createAsyncThunk('todolists/changeTodolistTitle',
    async (arg: { todolistId: string, title: string }, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatus({status: 'loading'}))
        try {
            const res = await todolistAPI.updateTodolist(arg.todolistId, arg.title)

            if (res.data.resultCode === 0) {
                dispatch(setAppStatus({status: 'success'}))
                return {todolistId: arg.todolistId, title: arg.title}
            } else {
                handleServerAppError(res.data, dispatch)
                return rejectWithValue(null)
            }
        } catch (error) {
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
        }
    })

//reducer
const slice = createSlice({
    name: 'todolists',
    initialState: [] as Array<TodolistDomainType>,
    reducers: {
        changeTodolistFilterAC(state, action: PayloadAction<{ todolistId: string, filter: FilterValueType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            state[index].filter = action.payload.filter
        },
        changeTodolistEntityStatus(state, action: PayloadAction<{
            todolistId: string,
            status: RequestStatusType
        }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            state[index].entityStatus = action.payload.status
            debugger
        }
    },
    extraReducers: builder => {
        builder.addCase(clearTodolistsAndTasks, () => {
            return []
        })
        builder.addCase(fetchTodolists.fulfilled, (state, action) => {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        })
        builder.addCase(deleteTodolistTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            state.splice(index, 1)
        })
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        })
        builder.addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            state[index].title = action.payload.title
        })
    }
})

export const todolistReducer = slice.reducer

export const {changeTodolistFilterAC, changeTodolistEntityStatus} = slice.actions


//types
export type FilterValueType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValueType
    entityStatus: RequestStatusType
}