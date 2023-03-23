import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValueType, TaskType} from './App';

export type TodolistType = {
    title: string
    tasks: Array<TaskType>
    deleteTask: (id: string) => void
    changeFilter: (newFilterValue: FilterValueType) => void
    addTask: (title: string) => void
}

export const Todolist: React.FC<TodolistType> = (props) => {

    const [title, setTitle] = useState('')

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const addTask = () => {
        props.addTask(title)
        setTitle('')
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }

    const changeFilterAll = () => props.changeFilter('all')
    const changeFilterActive = () => props.changeFilter('active')
    const changeFilterCompleted = () => props.changeFilter('completed')

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input type="text" value={title} onChange={onChangeTitleHandler} onKeyDown={onKeyPressHandler}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {props.tasks.map(t => {

                    const deleteTask = () => props.deleteTask(t.id)

                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={deleteTask}>x</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={changeFilterAll}>All</button>
                <button onClick={changeFilterActive}>Active</button>
                <button onClick={changeFilterCompleted}>Completed</button>
            </div>
        </div>
    )
}