import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {TextField} from '@mui/material';

//types
type EditableSpanType = {
    title: string
    callback: (title: string) => void
}

//component
export const EditableSpan: React.FC<EditableSpanType> = ({title, callback}) => {

    const [localTitle, setLocalTitle] = useState(title)
    const [editMode, setEditMode] = useState(false)

    const activateSettingsMode = () => setEditMode(true)

    const activateViewMod = () => {
        setEditMode(false)
        callback(localTitle)
    }

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => setLocalTitle(e.currentTarget.value)

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
            />
            : <span onDoubleClick={activateSettingsMode}>{localTitle}</span>
    )
}