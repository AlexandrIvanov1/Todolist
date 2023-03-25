import React, {ChangeEvent} from 'react';
import {FilterValueType, TaskType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';

//types
export type TodolistType = {
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
export const Todolist: React.FC<TodolistType> = (props) => {

    const deleteTodolist = () => props.deleteTodolist(props.id)

    const addTask = (title: string) => props.addTask(props.id, title)

    const changeTodolistTitle = (title: string) => props.changeTodolistTitle(props.id, title)

    const changeFilterAll = () => props.changeFilter(props.id, 'all')
    const changeFilterActive = () => props.changeFilter(props.id, 'active')
    const changeFilterCompleted = () => props.changeFilter(props.id, 'completed')

    return (
        <div className={'todolist'}>
            <h3>
                <EditableSpan title={props.title} callback={changeTodolistTitle}/>
                <button onClick={deleteTodolist}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {props.tasks.map(t => {

                    const deleteTask = () => props.deleteTask(props.id, t.id)

                    const toggleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.id, t.id, e.currentTarget.checked)
                    }

                    const changeTaskTitle = (title: string) => props.changeTaskTitle(props.id, t.id, title)

                    return (
                        <li key={t.id} className={t.isDone ? 'isDone' : ''}>
                            <input type="checkbox" checked={t.isDone} onChange={toggleCheckbox}/>
                            <EditableSpan title={t.title} callback={changeTaskTitle}/>
                            <button onClick={deleteTask}>x</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={changeFilterAll} className={props.filter === 'all' ? 'active-filter' : ''}>All</button>
                <button onClick={changeFilterActive}  className={props.filter === 'active' ? 'active-filter' : ''}>Active</button>
                <button onClick={changeFilterCompleted}  className={props.filter === 'completed' ? 'active-filter' : ''}>Completed</button>
            </div>
        </div>
    )
}