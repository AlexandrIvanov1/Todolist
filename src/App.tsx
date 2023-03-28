import React from 'react';
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

    const deleteTodolist = (todolistId: string) => {
        dispatch(deleteTodolistAC(todolistId))
    }

    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title))
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title))
    }

    const changeFilter = (todolistId: string, newFilterValue: FilterValueType) => {
        dispatch(changeTodolistFilterAC(todolistId, newFilterValue))
    }

    const deleteTask = (todolistId: string, id: string) => {
        dispatch(deleteTaskAC(todolistId, id))
    }

    const addTask = (todolistId: string, title: string) => {
        dispatch(addTaskAC(todolistId, title))
    }

    const changeTaskStatus = (todolistId: string, taskId: string, newValue: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, newValue))
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, title))
    }

    return (
        <div className="App">

            <AppBarComponent/>

            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={5}>
                    {todolists.map(tl => {

                        let filteredTask = tasks[tl.id]

                        if (tl.filter === 'active') {
                            filteredTask = tasks[tl.id].filter(t => !t.isDone)
                        }
                        if (tl.filter === 'completed') {
                            filteredTask = tasks[tl.id].filter(t => t.isDone)
                        }

                        return (
                            <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={filteredTask}
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