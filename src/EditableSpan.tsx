import React, {ChangeEvent, useState} from 'react';

//types
type EditableSpanType = {
    title: string
    callback: (title: string) => void
}

//component
export const EditableSpan: React.FC<EditableSpanType> = ({title, callback}) => {

    const [localTitle, setLocalTitle] = useState(title)
    const [editMode, setEditMode] = useState(false)

    const activateSettingsMode = () => {
        setEditMode(true)
    }

    const activateViewMod = () => {
        setEditMode(false)
        callback(localTitle)
    }

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <input value={localTitle} onBlur={activateViewMod} onChange={onChangeInputHandler} autoFocus/>
            : <span onDoubleClick={activateSettingsMode}>{localTitle}</span>
    )
}