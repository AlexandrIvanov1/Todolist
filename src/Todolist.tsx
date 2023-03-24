import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValueType, TaskType} from './App';

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
}

//component
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
            props.addTask(props.id, title.trim())
            setTitle('')
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }

    const changeFilterAll = () => props.changeFilter(props.id, 'all')
    const changeFilterActive = () => props.changeFilter(props.id, 'active')
    const changeFilterCompleted = () => props.changeFilter(props.id, 'completed')

    const deleteTodolist = () => props.deleteTodolist(props.id)

    return (
        <div className={'todolist'}>
            <h3>
                {props.title} <button onClick={deleteTodolist}>x</button>
            </h3>
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

                    const deleteTask = () => props.deleteTask(props.id, t.id)

                    const toggleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.id, t.id, e.currentTarget.checked)
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