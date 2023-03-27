import {AllTaskType, taskReducer} from './task-reducer';
import {addTodolist, todolistReducer, TodolistType} from './todolist-reducer';

test('ids should be equals', () => {
    const startTasksState: AllTaskType = {}
    const startTodolistsState: Array<TodolistType> = []

    const action = addTodolist('new todolist')

    const endTasksState = taskReducer(startTasksState, action)
    const endTodolistsState = todolistReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.id)
    expect(idFromTodolists).toBe(action.id)
})