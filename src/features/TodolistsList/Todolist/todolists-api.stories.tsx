import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../../../api/todolistAPI";
import {TaskPriorities, TaskStatuses} from "./Task/task-reducer";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists().then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {

    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState('')

    const createTodolist = () => {
        todolistAPI.createTodolist(title)
            .then(res => setState(res.data.data.item))
        setTitle('')
    }

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder={'Title'}
                    value={title}
                    onChange={(e) => setTitle(e.currentTarget.value)}
                />
                <button onClick={createTodolist}>Create Todolist</button>
            </div>
            {JSON.stringify(state)}
        </div>
    )
}

export const DeleteTodolist = () => {

    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')

    const deleteTodolist = () => {
        todolistAPI.deleteTodolist(todolistId)
            .then(res => setState(res.data))
        setTodolistId('')
    }

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder={'Todolist ID'}
                    value={todolistId}
                    onChange={(e) => setTodolistId(e.currentTarget.value)}
                />
                <button onClick={deleteTodolist}>Delete Todolist</button>
            </div>
            {JSON.stringify(state)}
        </div>
    )
}

export const UpdateTodolist = () => {

    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    const [title, setTitle] = useState('')

    const updateTodolist = () => {
        todolistAPI.updateTodolist(todolistId, title)
            .then(res => setState(res.data))
        setTitle('')
    }

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder={'Todolist ID'}
                    value={todolistId}
                    onChange={(e) => setTodolistId(e.currentTarget.value)}
                />
                <input
                    type="text"
                    placeholder={'Title'}
                    value={title}
                    onChange={(e) => setTitle(e.currentTarget.value)}
                />
                <button onClick={updateTodolist}>Update Todolist</button>
            </div>
            {JSON.stringify(state)}
        </div>
    )
}

export const GetTasksForTodolist = () => {

    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')

    const getTasks = () => {
        todolistAPI.getTasks(todolistId)
            .then(res => setState(res.data))
    }

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder={'Todolist ID'}
                    value={todolistId}
                    onChange={(e) => setTodolistId(e.currentTarget.value)}
                />
                <button onClick={getTasks}>Get Tasks</button>
            </div>
            {JSON.stringify(state)}
        </div>
    )
}

export const CreateTasks = () => {

    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    const [taskTitle, setTaskTitle] = useState('')

    const createTasks = () => {
        todolistAPI.createTask(todolistId, taskTitle)
            .then(res => setState(res.data))
        setTaskTitle('')
    }

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder={'Todolist ID'}
                    value={todolistId}
                    onChange={(e) => setTodolistId(e.currentTarget.value)}
                />
                <input
                    type="text"
                    placeholder={'Task title'}
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.currentTarget.value)}
                />
                <button onClick={createTasks}>Create Tasks</button>
            </div>
            {JSON.stringify(state)}
        </div>
    )
}

export const DeleteTasks = () => {

    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    const [taskId, setTaskId] = useState('')

    const deleteTasks = () => {
        todolistAPI.deleteTask(todolistId, taskId)
            .then(res => setState(res.data))
        setTaskId('')
    }

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder={'Todolist ID'}
                    value={todolistId}
                    onChange={(e) => setTodolistId(e.currentTarget.value)}
                />
                <input
                    type="text"
                    placeholder={'Task ID'}
                    value={taskId}
                    onChange={(e) => setTaskId(e.currentTarget.value)}
                />
                <button onClick={deleteTasks}>Delete Tasks</button>
            </div>
            {JSON.stringify(state)}
        </div>
    )
}

export const UpdateTasks = () => {

    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    const [taskId, setTaskId] = useState('')
    const [title, setTitle] = useState('')

    const updateTasks = () => {
        todolistAPI.updateTask(todolistId, taskId, {
            title: title,
            status: TaskStatuses.New,
            // addedDate: '',
            // order: 1,
            // id: taskId,
            startDate: '',
            priority: TaskPriorities.Low,
            // todoListId: todolistId,
            description: '',
            deadline: ''
        })
            .then(res => setState(res.data))
        setTitle('')
    }

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder={'Todolist ID'}
                    value={todolistId}
                    onChange={(e) => setTodolistId(e.currentTarget.value)}
                />
                <input
                    type="text"
                    placeholder={'Task ID'}
                    value={taskId}
                    onChange={(e) => setTaskId(e.currentTarget.value)}
                />
                <input
                    type="text"
                    placeholder={'Task title'}
                    value={title}
                    onChange={(e) => setTitle(e.currentTarget.value)}
                />
                <button onClick={updateTasks}>Update Tasks</button>
            </div>
            {JSON.stringify(state)}
        </div>
    )
}