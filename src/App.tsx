import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}
export type FilterValueType = 'all' | 'active' | 'completed'

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'JS', isDone: false},
        {id: 4, title: 'React', isDone: false}
    ])
    const [filter, setFilter] = useState<FilterValueType>('all')

    let filteredTask = tasks

    if (filter === 'active') {
        filteredTask = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        filteredTask = tasks.filter(t => t.isDone)
    }

    const deleteTask = (id: number) => {
        setTasks(tasks.filter(t => t.id !== id))
    }

    const changeFilter = (newFilterValue: FilterValueType) => {
        setFilter(newFilterValue)
    }

    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={filteredTask}
                deleteTask={deleteTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;