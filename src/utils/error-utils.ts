import {setAppStatus, setAppError} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolistAPI";

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setAppError(data.messages[0]))
    } else {
        dispatch(setAppError('Some error occurred'))
    }
    dispatch(setAppStatus('failed'))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
    dispatch(setAppError(error.message))
    dispatch(setAppStatus('failed'))
}