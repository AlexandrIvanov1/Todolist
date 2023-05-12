import {AllTaskType, taskReducer} from './Todolist/Task/task-reducer';
import {addTodolistTC, TodolistDomainType, todolistReducer} from './todolist-reducer';

test('ids should be equals', () => {
    const startTasksState: AllTaskType = {}
    const startTodolistsState: Array<TodolistDomainType> = []

    const arg = {todolist: {title: 'new todolist', order: 1, id: '1', addedDate: ''}}

    const action = addTodolistTC.fulfilled(arg, 'requestId', {title: 'new todolist'})

    const endTasksState = taskReducer(startTasksState, action)
    const endTodolistsState = todolistReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.todolist.id)
    expect(idFromTodolists).toBe(action.payload.todolist.id)
})