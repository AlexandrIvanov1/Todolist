import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

//types
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValueType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}
export type AllTaskType = {
    [key: string]: Array<TaskType>
}

//component
function App() {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])

    const [allTasks, setAllTasks] = useState<AllTaskType>({
        [todolistId1] : [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'React', isDone: false},
        ],
        [todolistId2] : [
            {id: v1(), title: 'Book', isDone: true},
            {id: v1(), title: 'Potato', isDone: true},
            {id: v1(), title: 'Pasta', isDone: false},
            {id: v1(), title: 'Fish', isDone: false}
        ],
    })

    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete allTasks[todolistId]
    }

    const deleteTask = (todolistId: string, id: string) => {
        const tasks = allTasks[todolistId].filter(t => t.id !== id)
        allTasks[todolistId] = tasks
        setAllTasks({...allTasks})
    }

    const changeFilter = (todolistId: string, newFilterValue: FilterValueType) => {
        const todolist = todolists.find(t => t.id === todolistId)
        if (todolist) {
            todolist.filter = newFilterValue
            setTodolists([...todolists])
        }
    }

    const addTask = (todolistId: string, title: string) => {
        const newTask: TaskType = {id: v1(), title, isDone: false}
        const tasks = allTasks[todolistId]
        allTasks[todolistId] = [newTask, ...tasks]
        setAllTasks({...allTasks})
    }

    const changeTaskStatus = (todolistId: string, id: string, newValue: boolean) => {
        const tasks = allTasks[todolistId].map(t => t.id === id ? {...t, isDone: newValue} : t)
        allTasks[todolistId] = tasks
        setAllTasks({...allTasks})
    }

    return (
        <div className="App">
            {todolists.map(tl => {

                let filteredTask = allTasks[tl.id]

                if (tl.filter === 'active') {
                    filteredTask = allTasks[tl.id].filter(t => !t.isDone)
                }
                if (tl.filter === 'completed') {
                    filteredTask = allTasks[tl.id].filter(t => t.isDone)
                }

                return (
                    <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={filteredTask}
                        deleteTask={deleteTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={tl.filter}
                        deleteTodolist={deleteTodolist}
                    />
                )
            })}
        </div>
    );
}

export default App;