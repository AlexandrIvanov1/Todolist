import React from 'react';
import {FilterValueType, TaskType} from './App';

export type TodolistType = {
    title: string
    tasks: Array<TaskType>
    deleteTask: (id: number) => void
    changeFilter: (newFilterValue: FilterValueType) => void
}

export const Todolist: React.FC<TodolistType> = (props) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input type="text"/>
                <button>+</button>
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
                <button onClick={() => props.changeFilter('all')}>All</button>
                <button onClick={() => props.changeFilter('active')}>Active</button>
                <button onClick={() => props.changeFilter('completed')}>Completed</button>
            </div>
        </div>
    )
}