import React, {useCallback} from 'react';
import {Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import {AppBarComponent} from './AppBarComponent';
import {Container, Grid, Paper} from '@mui/material';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    deleteTodolistAC,
    FilterValueType,
    TodolistType
} from './state/todolist-reducer';
import {addTaskAC, AllTaskType, changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC} from './state/task-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';


//component
function App() {

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, AllTaskType>(state => state.tasks)

    const dispatch = useDispatch()

    const deleteTodolist = useCallback((todolistId: string) => {
        dispatch(deleteTodolistAC(todolistId))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [dispatch])

    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title))
    }, [dispatch])

    const changeFilter = useCallback((todolistId: string, newFilterValue: FilterValueType) => {
        dispatch(changeTodolistFilterAC(todolistId, newFilterValue))
    }, [dispatch])

    const deleteTask = useCallback((todolistId: string, id: string) => {
        dispatch(deleteTaskAC(todolistId, id))
    }, [dispatch])

    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskAC(todolistId, title))
    }, [dispatch])

    const changeTaskStatus = useCallback((todolistId: string, taskId: string, newValue: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, newValue))
    }, [dispatch])

    const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, title))
    }, [dispatch])

    return (
        <div className="App">

            <AppBarComponent/>

            <Container fixed>
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
            </Container>
        </div>
    )
}

export default App;