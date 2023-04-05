import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../app/store";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    deleteTodolistTC,
    fetchTodolists,
    FilterValueType,
    TodolistDomainType
} from "./todolist-reducer";
import {addTaskTC, AllTaskType, deleteTaskTC, TaskStatuses, updateTaskTC} from "./task-reducer";
import React, {useCallback, useEffect} from "react";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";

export const TodolistsList = () => {

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, AllTaskType>(state => state.tasks)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodolists())
    }, [])

    const deleteTodolist = useCallback((todolistId: string) => {
        dispatch(deleteTodolistTC(todolistId))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleTC(todolistId, title))
    }, [dispatch])

    const changeFilter = useCallback((todolistId: string, newFilterValue: FilterValueType) => {
        dispatch(changeTodolistFilterAC(todolistId, newFilterValue))
    }, [dispatch])

    const deleteTask = useCallback((todolistId: string, id: string) => {
        dispatch(deleteTaskTC(todolistId, id))
    }, [dispatch])

    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskTC(todolistId, title))
    }, [dispatch])

    const changeTaskStatus = useCallback((todolistId: string, taskId: string, newValue: TaskStatuses) => {
        dispatch(updateTaskTC(todolistId, taskId, {status: newValue}))
    }, [dispatch])

    const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
        dispatch(updateTaskTC(todolistId, taskId, {title}))
    }, [dispatch])

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
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={tasks[tl.id]}
                                    deleteTask={deleteTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeTaskStatus}
                                    filter={tl.filter}
                                    deleteTodolist={deleteTodolist}
                                    changeTodolistTitle={changeTodolistTitle}
                                    changeTaskTitle={changeTaskTitle}
                                />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </>
    )
}