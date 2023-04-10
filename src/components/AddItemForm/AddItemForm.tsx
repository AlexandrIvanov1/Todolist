import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@mui/material';
import {AddBox} from '@mui/icons-material';

//types
type AddItemFormType = {
    addItem: (title: string) => void
    disabled?: boolean
}

//component
export const AddItemForm: React.FC<AddItemFormType> = React.memo(({addItem, disabled}) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        if (error) {
            setError(null)
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addItemCallback()
        }
    }

    const addItemCallback = () => {
        if (title.trim() === '') {
            setError('Title is empty')
        } else {
            addItem(title)
            setTitle('')
        }
    }

    return (
        <div>
            <TextField
                type="text"
                value={title}
                label={error ? 'Error' : 'Enter the title'}
                helperText={error ? 'Title is empty' : ''}
                error={!!error}
                onChange={onChangeTitleHandler}
                onKeyDown={onKeyPressHandler}
                disabled={disabled}
            />
            <IconButton onClick={addItemCallback} color={'primary'} disabled={disabled}>
                <AddBox/>
            </IconButton>
        </div>
    )
})