import {addTaskAC, AllTaskType, changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, taskReducer} from './task-reducer';
import {addTodolistAC, deleteTodolistAC} from './todolist-reducer';
import {v1} from 'uuid';

let startState: AllTaskType
let todolistId1: string = v1()
let todolistId2: string = v1()

beforeEach(() => {
    startState = {
        [todolistId1]: [
            {id: '1', title: 'HTML', isDone: true},
            {id: '2', title: 'CSS', isDone: true},
            {id: '3', title: 'JS', isDone: false},
        ],
        [todolistId2]: [
            {id: '1', title: 'Book', isDone: true},
            {id: '2', title: 'Potato', isDone: true},
            {id: '3', title: 'Pasta', isDone: false},
        ],
    }
})

test('correct task should be removed', () => {
    const endState = taskReducer(startState, deleteTaskAC(todolistId2, '1'))

    expect(endState[todolistId2].length).toBe(2)
    expect(endState[todolistId1].length).toBe(3)
    expect(startState[todolistId1].length).toBe(3)
    expect(startState[todolistId2].length).toBe(3)
    expect(endState[todolistId2][0].id).toBe('2')
})

test('correct task should be added', () => {
    const endState = taskReducer(startState, addTaskAC(todolistId1, 'Redux'))

    expect(endState[todolistId1].length).toBe(4)
    expect(endState[todolistId2].length).toBe(3)
    expect(startState[todolistId1].length).toBe(3)
    expect(startState[todolistId2].length).toBe(3)
    expect(endState[todolistId1][0].title).toBe('Redux')
})

test('title of correct task should be changed', () => {
    const endState = taskReducer(startState, changeTaskTitleAC(todolistId1, '2', 'NodeJS'))

    expect(endState[todolistId1][1].title).toBe('NodeJS')
    expect(startState[todolistId1][1].title).toBe('CSS')
    expect(startState[todolistId2][1].title).toBe('Potato')
    expect(endState[todolistId2][1].title).toBe('Potato')
})

test('status of correct task should be changed', () => {
    const endState = taskReducer(startState, changeTaskStatusAC(todolistId1, '1', false))

    expect(endState[todolistId1][0].isDone).toBe(false)
    expect(startState[todolistId1][0].isDone).toBe(true)
})

test('new array should be added when new todolist is added', () => {
    const endState = taskReducer(startState, addTodolistAC('new todolist'))


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== todolistId1 && k !== todolistId2)
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const endState = taskReducer(startState, deleteTodolistAC(todolistId2))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState[todolistId2]).not.toBeDefined()
})