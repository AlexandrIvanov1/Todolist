import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValueType = 'all' | 'active' | 'completed'

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'React', isDone: false}
    ])
    const [filter, setFilter] = useState<FilterValueType>('all')

    let filteredTask = tasks

    if (filter === 'active') {
        filteredTask = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        filteredTask = tasks.filter(t => t.isDone)
    }

    const deleteTask = (id: string) => {
        setTasks(tasks.filter(t => t.id !== id))
    }

    const changeFilter = (newFilterValue: FilterValueType) => {
        setFilter(newFilterValue)
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {id: v1(), title, isDone: false}
        setTasks([newTask, ...tasks])
    }

    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={filteredTask}
                deleteTask={deleteTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}

export default App;