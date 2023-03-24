import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValueType, TaskType} from './App';

export type TodolistType = {
    title: string
    tasks: Array<TaskType>
    deleteTask: (id: string) => void
    changeFilter: (newFilterValue: FilterValueType) => void
    addTask: (title: string) => void
    changeTaskStatus: (id: string, newValue: boolean) => void
    filter: FilterValueType
}

export const Todolist: React.FC<TodolistType> = (props) => {

    const [title, setTitle] = useState('')

    const [error, setError] = useState<string | null>(null)

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        if (error) {
            setError(null)
        }
    }

    const addTask = () => {
        if (title.trim() === '') {
            setError('Title is empty')
        } else {
            props.addTask(title.trim())
            setTitle('')
        }
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
                <input
                    type="text"
                    value={title}
                    onChange={onChangeTitleHandler}
                    onKeyDown={onKeyPressHandler}
                    className={error ? 'error' : ''}
                />
                <button onClick={addTask}>+</button>
            </div>
            {error && <div className={'error-message'}>{error}</div>}
            <ul>
                {props.tasks.map(t => {

                    const deleteTask = () => props.deleteTask(t.id)

                    const toggleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked)
                    }

                    return (
                        <li key={t.id} className={t.isDone ? 'isDone' : ''}>
                            <input type="checkbox" checked={t.isDone} onChange={toggleCheckbox}/>
                            <span>{t.title}</span>
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