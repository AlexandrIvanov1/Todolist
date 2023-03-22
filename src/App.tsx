import React from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

function App() {

    const tasks: Array<TaskType> = [
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'JS', isDone: false},
        {id: 4, title: 'React', isDone: false}
    ]

    return (
        <div className="App">
            <Todolist title={'What to learn'} tasks={tasks}/>
        </div>
    );
}

export default App;