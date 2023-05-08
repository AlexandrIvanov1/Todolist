import {
    addTaskAC,
    AllTaskType, deleteTaskTC,
    fetchTasks,
    taskReducer,
    updateTaskAC
} from './task-reducer';
import {addTodolistAC, deleteTodolistAC} from '../../todolist-reducer';
import {v1} from 'uuid';
import {TaskPriorities, TaskStatuses} from '../../../../api/todolistAPI';

let startState: AllTaskType
let todolistId1: string = v1()
let todolistId2: string = v1()

beforeEach(() => {
    startState = {
        [todolistId1]: [
            {
                id: '1',
                title: 'HTML',
                status: TaskStatuses.Completed,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                startDate: '',
                priority: TaskPriorities.Low,
                todoListId: todolistId1
            },
            {
                id: '2',
                title: 'CSS',
                status: TaskStatuses.Completed,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                startDate: '',
                priority: TaskPriorities.Low,
                todoListId: todolistId1
            },
            {
                id: '3',
                title: 'JS',
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                startDate: '',
                priority: TaskPriorities.Low,
                todoListId: todolistId1
            }
        ],
        [todolistId2]: [
            {
                id: '1',
                title: 'Book',
                status: TaskStatuses.Completed,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                startDate: '',
                priority: TaskPriorities.Low,
                todoListId: todolistId2
            },
            {
                id: '2',
                title: 'Potato',
                status: TaskStatuses.Completed,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                startDate: '',
                priority: TaskPriorities.Low,
                todoListId: todolistId2
            },
            {
                id: '3',
                title: 'Pasta',
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                startDate: '',
                priority: TaskPriorities.Low,
                todoListId: todolistId2
            }
        ],
    }
})

test('correct task should be removed', () => {
    const param = {todolistId: todolistId2, taskId: '1'}
    const endState = taskReducer(startState, deleteTaskTC.fulfilled(param, 'requestId', param))

    expect(endState[todolistId2].length).toBe(2)
    expect(endState[todolistId1].length).toBe(3)
    expect(startState[todolistId1].length).toBe(3)
    expect(startState[todolistId2].length).toBe(3)
    expect(endState[todolistId2][0].id).toBe('2')
})

test('correct task should be added', () => {
    const endState = taskReducer(startState, addTaskAC({
        todoListId: todolistId1,
        title: 'Redux',
        id: '1',
        addedDate: '',
        deadline: '',
        order: 1,
        startDate: '',
        description: '',
        priority: TaskPriorities.Low,
        status: TaskStatuses.New
    }))

    expect(endState[todolistId1].length).toBe(4)
    expect(endState[todolistId2].length).toBe(3)
    expect(startState[todolistId1].length).toBe(3)
    expect(startState[todolistId2].length).toBe(3)
    expect(endState[todolistId1][0].title).toBe('Redux')
})

test('title of correct task should be changed', () => {
    const endState = taskReducer(startState, updateTaskAC({
        todolistId: todolistId1,
        taskId: '2',
        model: {title: 'NodeJS'}
    }))

    expect(endState[todolistId1][1].title).toBe('NodeJS')
    expect(startState[todolistId1][1].title).toBe('CSS')
    expect(startState[todolistId2][1].title).toBe('Potato')
    expect(endState[todolistId2][1].title).toBe('Potato')
})

test('status of correct task should be changed', () => {
    const endState = taskReducer(startState, updateTaskAC({
        todolistId: todolistId1,
        taskId: '1',
        model: {status: TaskStatuses.New}
    }))

    expect(endState[todolistId1][0].status).toBe(TaskStatuses.New)
    expect(startState[todolistId1][0].status).toBe(TaskStatuses.Completed)
})

test('new array should be added when new todolist is added', () => {
    const endState = taskReducer(startState, addTodolistAC({
        todolist: {
            title: 'new todolist',
            order: 1,
            id: 'todolistId3',
            addedDate: ''
        }
    }))

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== todolistId1 && k !== todolistId2)
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const endState = taskReducer(startState, deleteTodolistAC({todolistId: todolistId2}))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState[todolistId2]).not.toBeDefined()
})

test('tasks should be added for todolist', () => {

    const state = {
        [todolistId1]: [],
        [todolistId2]: []
    }

    const action = fetchTasks.fulfilled({todolistId: todolistId1, tasks: startState[todolistId1]}, '', todolistId1)

    const endState = taskReducer(state, action)

    expect(endState[todolistId1].length).toBe(3)
    expect(endState[todolistId2].length).toBe(0)
})