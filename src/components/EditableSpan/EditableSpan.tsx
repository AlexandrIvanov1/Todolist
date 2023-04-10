import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {TextField} from '@mui/material';

//types
type EditableSpanType = {
    title: string
    callback: (title: string) => void
}

//component
export const EditableSpan: React.FC<EditableSpanType> = React.memo(({title, callback}) => {

    const [localTitle, setLocalTitle] = useState(title)
    const [editMode, setEditMode] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const activateSettingsMode = () => setEditMode(true)

    const activateViewMod = () => {
        if (localTitle === '') {
            setError('Title is empty')
            return
        }
        if (localTitle.length > 100) {
            setError('Title is too long')
            return
        }
        setEditMode(false)
        callback(localTitle)
    }

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) {
            setError(null)
        }
        setLocalTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            activateViewMod()
        }
    }

    return (
        editMode
            ? <TextField
                value={localTitle}
                onBlur={activateViewMod}
                onChange={onChangeInputHandler}
                autoFocus
                onKeyDown={onKeyPressHandler}
                error={!!error}
                helperText={error}
                label={error && 'Error'}
            />
            : <span onDoubleClick={activateSettingsMode}>{localTitle}</span>
    )
})