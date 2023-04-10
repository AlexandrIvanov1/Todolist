import {
    addTodolistAC, changeTodolistEntityStatus,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    deleteTodolistAC, setTodolistsAC, TodolistDomainType,
    todolistReducer,
} from './todolist-reducer';

let startState: Array<TodolistDomainType>

beforeEach(() => {
    startState = [
        {id: '1', title: 'What to learn', filter: 'all', order: 0, addedDate: '', entityStatus: 'idle'},
        {id: '2', title: 'What to buy', filter: 'all', order: 0, addedDate: '', entityStatus: 'idle'}
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistReducer(startState, deleteTodolistAC('1'))

    expect(startState.length).toBe(2)
    expect(endState.length).toBe(1)
    expect(endState[0].title).toBe('What to buy')
})

test('todolist should be added', () => {
    const endState = todolistReducer(startState, addTodolistAC({title: 'Book', order: 1, addedDate: '', id: '1'}))

    expect(endState.length).toBe(3)
    expect(startState.length).toBe(2)
    expect(endState[0].title).toBe('Book')
})

test('correct title of todolist should be changed', () => {
    const endState = todolistReducer(startState, changeTodolistTitleAC('2', 'What to read'))

    expect(endState[0].title).toBe('What to learn')
    expect(startState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe('What to read')
    expect(startState[1].title).toBe('What to buy')
})

test('correct filter of todolist should be changed', () => {
    const endState = todolistReducer(startState, changeTodolistFilterAC('1', 'active'))

    expect(endState[0].filter).toBe('active')
    expect(startState[0].filter).toBe('all')
    expect(endState[1].filter).toBe('all')
    expect(startState[1].filter).toBe('all')
})

test('correct status of todolist should be changed', () => {
    const endState = todolistReducer(startState, changeTodolistEntityStatus('1', 'loading'))

    expect(endState[0].entityStatus).toBe('loading')
    expect(startState[0].entityStatus).toBe('idle')
    expect(endState[1].entityStatus).toBe('idle')
    expect(startState[1].entityStatus).toBe('idle')
})

test('correct todolists should be added', () => {
    const todolistsArray = [
        {id: '3', title: 'What to fix', filter: 'all', order: 0, addedDate: '', entityStatus: 'idle'},
        {id: '4', title: 'What to repeat', filter: 'all', order: 0, addedDate: '', entityStatus: 'idle'}
    ]
    const endState = todolistReducer(startState, setTodolistsAC(todolistsArray))

    expect(endState[0].title).toBe('What to fix')
    expect(startState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe('What to repeat')
    expect(startState[1].title).toBe('What to buy')
})