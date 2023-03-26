import React, {ChangeEvent} from 'react';
import {TaskType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {FilterValueType} from './state/todolist-reducer';

//types
export type TodolistPropsType = {
    title: string
    id: string
    tasks: Array<TaskType>
    deleteTask: (todolistId: string, id: string) => void
    changeFilter: (todolistId: string, newFilterValue: FilterValueType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, id: string, newValue: boolean) => void
    filter: FilterValueType
    deleteTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
}

//component
export const Todolist: React.FC<TodolistPropsType> =
    ({id, title, filter, changeTodolistTitle, deleteTodolist,
         changeTaskTitle, changeTaskStatus, addTask, tasks, deleteTask, changeFilter}) => {

    const pureDeleteTodolist = () => deleteTodolist(id)

    const addTaskForTodolist = (title: string) => addTask(id, title)

    const pureChangeTodolistTitle = (title: string) => changeTodolistTitle(id, title)

    const changeFilterAll = () => changeFilter(id, 'all')
    const changeFilterActive = () => changeFilter(id, 'active')
    const changeFilterCompleted = () => changeFilter(id, 'completed')

    return (
        <div className={'todolist'}>
            <h3>
                <EditableSpan title={title} callback={pureChangeTodolistTitle}/>
                <IconButton aria-label="delete" onClick={pureDeleteTodolist}>
                    <DeleteIcon />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskForTodolist}/>
            <ul>
                {tasks.map(t => {

                    const pureDeleteTask = () => deleteTask(id, t.id)

                    const toggleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
                        changeTaskStatus(id, t.id, e.currentTarget.checked)
                    }

                    const changeTaskTitleForTodolist = (title: string) => changeTaskTitle(id, t.id, title)

                    return (
                        <li key={t.id} className={t.isDone ? 'isDone' : ''}>
                            <Checkbox checked={t.isDone} onChange={toggleCheckbox}/>
                            <EditableSpan title={t.title} callback={changeTaskTitleForTodolist}/>
                            <IconButton aria-label="delete" onClick={pureDeleteTask}>
                                <DeleteIcon />
                            </IconButton>
                        </li>
                    )
                })}
            </ul>
            <div>
                <Button
                    onClick={changeFilterAll}
                    color={'inherit'}
                    variant={filter === 'all' ? 'contained' : 'text'}
                >All</Button>
                <Button
                    onClick={changeFilterActive}
                    color={'primary'}
                    variant={filter === 'active' ? 'contained' : 'text'}
                >Active</Button>
                <Button
                    onClick={changeFilterCompleted}
                    color={'secondary'}
                    variant={filter === 'completed' ? 'contained' : 'text'}
                >Completed</Button>
            </div>
        </div>
    )
}