import {
    addTodolist,
    changeTodolistFilter,
    changeTodolistTitle,
    deleteTodolist,
    todolistReducer,
    TodolistType
} from './todolist-reducer';

let startState: Array<TodolistType>

beforeEach(() => {
    startState = [
        {id: '1', title: 'What to learn', filter: 'all'},
        {id: '2', title: 'What to buy', filter: 'all'}
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistReducer(startState, deleteTodolist('1'))

    expect(startState.length).toBe(2)
    expect(endState.length).toBe(1)
    expect(endState[0].title).toBe('What to buy')
})

test('todolist should be added', () => {
    const endState = todolistReducer(startState, addTodolist('Book'))

    expect(endState.length).toBe(3)
    expect(startState.length).toBe(2)
    expect(endState[0].title).toBe('Book')
})

test('correct title of todolist should be changed', () => {
    const endState = todolistReducer(startState, changeTodolistTitle('2', 'What to read'))

    expect(endState[0].title).toBe('What to learn')
    expect(startState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe('What to read')
    expect(startState[1].title).toBe('What to buy')
})

test('correct filter of todolist should be changed', () => {
    const endState = todolistReducer(startState, changeTodolistFilter('1', 'active'))

    expect(endState[0].filter).toBe('active')
    expect(startState[0].filter).toBe('all')
    expect(endState[1].filter).toBe('all')
    expect(startState[1].filter).toBe('all')
})