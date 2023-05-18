import React, {useCallback} from 'react';
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm';
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan';
import {Button, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {TodolistDomainType} from './todolist-reducer';
import {Task} from './Task/Task';
import {TaskStatuses, TaskType} from '../../../api/todolistAPI';
import {useActions} from '../../../app/store';
import {todolistsActions} from './index';
import {tasksAsyncActions} from './Task';

//types
export type TodolistPropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    demo?: boolean
}

//component
export const Todolist: React.FC<TodolistPropsType> = React.memo(
    ({todolist , tasks, demo = false}) => {

        const {deleteTodolist, changeTodolistFilter, changeTodolistTitle} = useActions(todolistsActions)

        const {addTask, updateTask, deleteTask} = useActions(tasksAsyncActions)


        const changeTaskStatus = useCallback((todolistId: string, taskId: string, newValue: TaskStatuses) => {
            updateTask({todolistId, taskId, domainModel: {status: newValue}})
        }, [])

        const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
            updateTask({todolistId, taskId, domainModel: {title: title}})
        }, [])

        const pureDeleteTodolist = () => deleteTodolist({todolistId: todolist.id})

        const addTaskForTodolist = useCallback((title: string) => {
            addTask({todolistId: todolist.id, title})
        }, [addTask, todolist.id])

        const pureChangeTodolistTitle = useCallback((title: string) => {
            changeTodolistTitle({todolistId: todolist.id, title})
        }, [changeTodolistTitle, todolist.id])

        const changeFilterAll = useCallback(() => changeTodolistFilter({todolistId: todolist.id, filter: 'all'}), [todolist.id])
        const changeFilterActive = useCallback(() => changeTodolistFilter({todolistId: todolist.id, filter: 'active'}), [todolist.id])
        const changeFilterCompleted = useCallback(() => changeTodolistFilter({todolistId: todolist.id, filter: 'completed'}), [todolist.id])

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