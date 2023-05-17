import {useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch} from '../../app/store';
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    deleteTodolistTC,
    fetchTodolists,
    FilterValueType,
    TodolistDomainType
} from './todolist-reducer';
import {addTaskTC, AllTaskType, deleteTaskTC, updateTaskTC} from './Todolist/Task/task-reducer';
import React, {useCallback, useEffect} from 'react';
import {Grid, Paper} from '@mui/material';
import {AddItemForm} from '../../components/AddItemForm/AddItemForm';
import {Todolist} from './Todolist/Todolist';
import {Navigate} from 'react-router-dom';
import {TaskStatuses} from '../../api/todolistAPI';
import {selectIsLoggedIn} from '../Auth/selectors';

type TodolistsListPropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<TodolistsListPropsType> = ({demo = false}) => {

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, AllTaskType>(state => state.tasks)
    const isLoggedIn = useSelector(selectIsLoggedIn)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        dispatch(fetchTodolists())
    }, [])

    const deleteTodolist = useCallback((todolistId: string) => {
        dispatch(deleteTodolistTC({todolistId}))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC({title}))
    }, [dispatch])

    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleTC({todolistId, title}))
    }, [dispatch])

    const changeFilter = useCallback((todolistId: string, newFilterValue: FilterValueType) => {
        dispatch(changeTodolistFilterAC({todolistId: todolistId, filter: newFilterValue}))
    }, [dispatch])

    const deleteTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(deleteTaskTC({todolistId, taskId}))
    }, [dispatch])

    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskTC({todolistId, title}))
    }, [dispatch])

    const changeTaskStatus = useCallback((todolistId: string, taskId: string, newValue: TaskStatuses) => {
        dispatch(updateTaskTC({todolistId, taskId, domainModel: {status: newValue}}))
    }, [dispatch])

    const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
        dispatch(updateTaskTC({todolistId, taskId, domainModel: {title: title}}))
    }, [dispatch])

    if (!isLoggedIn) {
        return <Navigate to={'/Auth'}/>
    }

    return (
        <>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={5}>
                {todolists.map(tl => {
                    return (
                        <Grid item key={tl.id}>
                            <Paper style={{padding: '10px'}}>
                                <Todolist
                                    key={tl.id}
                                    todolist={tl}
                                    tasks={tasks[tl.id]}
                                    deleteTask={deleteTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeTaskStatus}
                                    deleteTodolist={deleteTodolist}
                                    changeTodolistTitle={changeTodolistTitle}
                                    changeTaskTitle={changeTaskTitle}
                                    demo={demo}
                                />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </>
    )
}