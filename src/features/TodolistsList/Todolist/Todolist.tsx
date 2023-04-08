import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm';
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan';
import {Button, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {FilterValueType} from '../todolist-reducer';
import {Task} from "./Task/Task";
import {fetchTasks, TaskStatuses, TaskType} from "../task-reducer";
import {useAppDispatch} from "../../../app/store";
import {RequestStatusType} from "../../../app/app-reducer";

//types
export type TodolistPropsType = {
    title: string
    id: string
    filter: FilterValueType
    entityStatus: RequestStatusType
    tasks: Array<TaskType>
    deleteTask: (todolistId: string, id: string) => void
    changeFilter: (todolistId: string, newFilterValue: FilterValueType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, id: string, newValue: TaskStatuses) => void
    deleteTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
}

//component
export const Todolist: React.FC<TodolistPropsType> = React.memo(
    ({
         id, title, filter, entityStatus, changeTodolistTitle, deleteTodolist,
         changeTaskTitle, changeTaskStatus, addTask, tasks, deleteTask, changeFilter
     }) => {

        const dispatch = useAppDispatch()

        useEffect(() => {
            dispatch(fetchTasks(id))
        } ,[])

        const pureDeleteTodolist = () => deleteTodolist(id)

        const addTaskForTodolist = useCallback((title: string) => addTask(id, title), [addTask, id])

        const pureChangeTodolistTitle = useCallback((title: string) => changeTodolistTitle(id, title), [changeTodolistTitle, id])

        const changeFilterAll = useCallback(() => changeFilter(id, 'all'), [changeFilter, id])
        const changeFilterActive = useCallback(() => changeFilter(id, 'active'), [changeFilter, id])
        const changeFilterCompleted = useCallback(() => changeFilter(id, 'completed'), [changeFilter, id])

        let filteredTask = tasks

        if (filter === 'active') {
            filteredTask = tasks.filter(t => t.status === TaskStatuses.New)
        }
        if (filter === 'completed') {
            filteredTask = tasks.filter(t => t.status === TaskStatuses.Completed)
        }

        return (
            <div className={'todolist'}>
                <h3>
                    <EditableSpan title={title} callback={pureChangeTodolistTitle}/>
                    <IconButton aria-label="delete" onClick={pureDeleteTodolist} disabled={entityStatus === 'loading'}>
                        <DeleteIcon/>
                    </IconButton>
                </h3>
                <AddItemForm addItem={addTaskForTodolist} disabled={entityStatus === 'loading'}/>
                <ul>
                    {filteredTask.map(t => {
                        return <Task
                            key={t.id}
                            task={t}
                            todolistId={id}
                            changeTaskTitle={changeTaskTitle}
                            deleteTask={deleteTask}
                            changeTaskStatus={changeTaskStatus}
                        />
                    })}
                </ul>
                <div>
                    <Button
                        onClick={changeFilterAll}
                        color={'inherit'}
                        variant={filter === 'all' ? 'contained' : 'text'}
                    >All</Button>
                    <Button
                        onClick={changeFilterActive}
                        color={'primary'}
                        variant={filter === 'active' ? 'contained' : 'text'}
                    >Active</Button>
                    <Button
                        onClick={changeFilterCompleted}
                        color={'secondary'}
                        variant={filter === 'completed' ? 'contained' : 'text'}
                    >Completed</Button>
                </div>
            </div>
        )
    }
)