import {addTask, AllTaskType, changeTaskStatus, changeTaskTitle, deleteTask, taskReducer} from './task-reducer';
import {addTodolist, deleteTodolist} from './todolist-reducer';

let startState: AllTaskType

beforeEach(() => {
    startState = {
        ['1']: [
            {id: '1', title: 'HTML', isDone: true},
            {id: '2', title: 'CSS', isDone: true},
            {id: '3', title: 'JS', isDone: false},
        ],
        ['2']: [
            {id: '1', title: 'Book', isDone: true},
            {id: '2', title: 'Potato', isDone: true},
            {id: '3', title: 'Pasta', isDone: false},
        ],
    }
})

test('correct task should be removed', () => {
    const endState = taskReducer(startState, deleteTask('2', '1'))

    expect(endState['2'].length).toBe(2)
    expect(endState['1'].length).toBe(3)
    expect(startState['1'].length).toBe(3)
    expect(startState['2'].length).toBe(3)
    expect(endState['2'][0].id).toBe('2')
})

test('correct task should be added', () => {
    const endState = taskReducer(startState, addTask('1', 'Redux'))

    expect(endState['1'].length).toBe(4)
    expect(endState['2'].length).toBe(3)
    expect(startState['1'].length).toBe(3)
    expect(startState['2'].length).toBe(3)
    expect(endState['1'][0].title).toBe('Redux')
})

test('title of correct task should be changed', () => {
    const endState = taskReducer(startState, changeTaskTitle('1', '2', 'NodeJS'))

    expect(endState['1'][1].title).toBe('NodeJS')
    expect(startState['1'][1].title).toBe('CSS')
    expect(startState['2'][1].title).toBe('Potato')
    expect(endState['2'][1].title).toBe('Potato')
})

test('status of correct task should be changed', () => {
    const endState = taskReducer(startState, changeTaskStatus('1', '1', false))

    expect(endState['1'][0].isDone).toBe(false)
    expect(startState['1'][0].isDone).toBe(true)
})

test('new array should be added when new todolist is added', () => {
    const endState = taskReducer(startState, addTodolist('new todolist'))


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== '1' && k !== '2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const endState = taskReducer(startState, deleteTodolist('2'))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['2']).not.toBeDefined()
})