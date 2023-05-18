import {useSelector} from 'react-redux';
import {AppRootStateType, useActions} from '../../app/store';
import {TodolistDomainType} from './Todolist/todolist-reducer';
import {AllTaskType} from './Todolist/Task/task-reducer';
import React, {useEffect} from 'react';
import {Grid, Paper} from '@mui/material';
import {AddItemForm} from '../../components/AddItemForm/AddItemForm';
import {Todolist} from './Todolist/Todolist';
import {Navigate} from 'react-router-dom';
import {selectIsLoggedIn} from '../Auth/selectors';
import {todolistsActions} from './Todolist';

type TodolistsListPropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<TodolistsListPropsType> = ({demo = false}) => {

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, AllTaskType>(state => state.tasks)
    const isLoggedIn = useSelector(selectIsLoggedIn)

    const {addTodolist, fetchTodolists} = useActions(todolistsActions)

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        fetchTodolists()
    }, [demo])

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