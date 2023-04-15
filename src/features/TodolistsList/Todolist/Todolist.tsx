import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm';
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan';
import {Button, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {FilterValueType, TodolistDomainType} from '../todolist-reducer';
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "./Task/task-reducer";

//types
export type TodolistPropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    deleteTask: (todolistId: string, id: string) => void
    changeFilter: (todolistId: string, newFilterValue: FilterValueType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, id: string, newValue: TaskStatuses) => void
    deleteTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    demo?: boolean
}

//component
export const Todolist: React.FC<TodolistPropsType> = React.memo(
    ({
         todolist, changeTodolistTitle, deleteTodolist,
         changeTaskTitle, changeTaskStatus, addTask, tasks, deleteTask, changeFilter, demo = false
     }) => {

        // const dispatch = useAppDispatch()

        useEffect(() => {
            if (demo) {
                return
            }
            // dispatch(fetchTasks(todolist.id))
        } ,[])

        const pureDeleteTodolist = () => deleteTodolist(todolist.id)

        const addTaskForTodolist = useCallback((title: string) => addTask(todolist.id, title), [addTask, todolist.id])

        const pureChangeTodolistTitle = useCallback((title: string) => changeTodolistTitle(todolist.id, title), [changeTodolistTitle, todolist.id])

        const changeFilterAll = useCallback(() => changeFilter(todolist.id, 'all'), [changeFilter, todolist.id])
        const changeFilterActive = useCallback(() => changeFilter(todolist.id, 'active'), [changeFilter, todolist.id])
        const changeFilterCompleted = useCallback(() => changeFilter(todolist.id, 'completed'), [changeFilter, todolist.id])

        let filteredTask = tasks

        if (todolist.filter === 'active') {
            filteredTask = tasks.filter(t => t.status === TaskStatuses.New)
        }
        if (todolist.filter === 'completed') {
            filteredTask = tasks.filter(t => t.status === TaskStatuses.Completed)
        }

        return (
            <div className={'todolist'}>
                <h3>
                    <EditableSpan title={todolist.title} callback={pureChangeTodolistTitle}/>
                    <IconButton aria-label="delete" onClick={pureDeleteTodolist} disabled={todolist.entityStatus === 'loading'}>
                        <DeleteIcon/>
                    </IconButton>
                </h3>
                <AddItemForm addItem={addTaskForTodolist} disabled={todolist.entityStatus === 'loading'}/>
                <ul>
                    {filteredTask.map(t => {
                        return <Task
                            key={t.id}
                            task={t}
                            todolistId={todolist.id}
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
                        variant={todolist.filter === 'all' ? 'contained' : 'text'}
                    >All</Button>
                    <Button
                        onClick={changeFilterActive}
                        color={'primary'}
                        variant={todolist.filter === 'active' ? 'contained' : 'text'}
                    >Active</Button>
                    <Button
                        onClick={changeFilterCompleted}
                        color={'secondary'}
                        variant={todolist.filter === 'completed' ? 'contained' : 'text'}
                    >Completed</Button>
                </div>
            </div>
        )
    }
)