import {todolistAsyncActions} from './todolist-reducer'
import {slice} from './todolist-reducer'

const todolistsActions =  {
    ...todolistAsyncActions,
    ...slice.actions
}

export {
    todolistsActions
}