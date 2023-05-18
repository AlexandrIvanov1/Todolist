import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskStatuses, TaskType} from '../../../../api/todolistAPI';

//types
type TaskPropsType = {
    todolistId: string
    task: TaskType
    deleteTask: (arg: {todolistId: string, taskId: string}) => void
    changeTaskStatus: (todolistId: string, id: string, newValue: TaskStatuses) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
}

//component
export const Task: React.FC<TaskPropsType> = React.memo((props) => {
    const {todolistId, task, deleteTask, changeTaskStatus, changeTaskTitle} = props

    const pureDeleteTask = useCallback(() => deleteTask({todolistId: todolistId, taskId: task.id}), [deleteTask, todolistId, task.id])

    const toggleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(todolistId, task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)
    }

    const changeTaskTitleForTodolist = (title: string) => changeTaskTitle(todolistId, task.id, title)

    return (
        <li key={task.id}>
            <Checkbox checked={task.status === TaskStatuses.Completed} onChange={toggleCheckbox}/>
            <EditableSpan title={task.title} callback={changeTaskTitleForTodolist}/>
            <IconButton aria-label="delete" onClick={pureDeleteTask}>
                <DeleteIcon/>
            </IconButton>
        </li>
    )
})