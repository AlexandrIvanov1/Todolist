import {AllTaskType, taskReducer} from './task-reducer';
import {addTodolistAC, TodolistDomainType, todolistReducer} from './todolist-reducer';

test('ids should be equals', () => {
    const startTasksState: AllTaskType = {}
    const startTodolistsState: Array<TodolistDomainType> = []

    const action = addTodolistAC({title: 'new todolist', order: 1, id: '1', addedDate: ''})

    const endTasksState = taskReducer(startTasksState, action)
    const endTodolistsState = todolistReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolist.id)
    expect(idFromTodolists).toBe(action.todolist.id)
})